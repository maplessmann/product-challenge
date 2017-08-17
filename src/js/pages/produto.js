/**
 * Inclui múltiplas Promises como uma maior garantia de acessibilidade dos dados.
 * A primeira Promise a ser resolvida, irá retornar os dados e ignorar o resto.
 */
const productsLocal = fetch('http://localhost:8000/src/js/data/data.json');
const productsRemote = fetch('http://www.raphaelfabeni.com.br/rv/data.json');

Promise
    .race([productsLocal, productsRemote])
    .then(data => data.json())
    .then(data => {
        init(data);
        initCart();
    })


// Captura os parâmetros passados pela URL para renderizar o produto
function init(data) {

    const productId = getURLParameter('product');
    const productSeg = getURLParameter('catalog');

    const productsArray = [];
    productsArray.push(...data['best-sellers'], ...data.releases);

    if(productSeg === 'all')
        renderProduct(productId, productsArray);
    else
        renderProduct(productId, data[productSeg]);

}


// Retorna o parâmetro da URL via Regex
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}


// Faz um map para retornar o produto
function renderProduct(id, array) {
    const productContainer = document.querySelector('.single-product');

    const product = array
        .filter(product => array.indexOf(product) == id)
        .map(product => product)

    productContainer.innerHTML = makeMarkup(...product);
}


// Cria o markup do produto
function makeMarkup(product) {
    document.title = product.title;

    const toBRL = (price) => price.toFixed(2).replace('.', ',');

    const highTop = (isHigh) => isHigh ? 'Cano Alto' : 'Cano Baixo';

    const markup = `
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-7 has-animation">
                <div class="product-image" style="background-image: url(${product.image});"></div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-5 has-animation">
                <h1 class="product-title">${product.title}</h1>
                <div class="product-top">${highTop(product['high-top'])}</div>
                <div class="product-price">
                    <span class="price-normal">R$ ${toBRL(product.price)}</span>
                    <span class="price-quota">ou ${product.installments.number}X ${toBRL(product.installments.value)} sem juros</span>
                </div>
                <div class="product-actions">
                    <a href="#" class="btn add-to-cart">Adicionar no carrinho</a>
                    <a href="#personalize" class="btn btn-dark">Personalize</a>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.personalize-widget .image').src = product.image;

    return markup;
}


function initCart() {
    const cartTrigger = document.querySelector('.btn.add-to-cart');
    cartTrigger.addEventListener('click', function(event) {
        event.preventDefault();

        updateCart();
    });

    function updateCart() {
        let cartButton = document.querySelector('.cart-button');
            cartTotal = cartButton.getAttribute('data-count');

        cartButton.classList.add('has-product');
        cartButton.setAttribute('data-count', Number(cartTotal) + 1);
    }
}



// Faz a personalização do texto e cor do produto
(function() {
    const colorPicker = document.querySelector('#color-picker'),
          inputName = document.querySelector('#input-name'),
          name = document.querySelector('.personalize-widget .name');

    colorPicker.addEventListener('change', function() {
        document.body.style = '--personalize-color: ' + colorPicker.value;
    });

    inputName.addEventListener('keyup', function() {
        const text = this.value;
        name.innerHTML = text;
    });
})();
