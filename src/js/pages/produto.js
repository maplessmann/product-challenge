/*
 * Incluindo múltiplas Promises como uma maior garantia de acessibilidade dos dados.
 * A primeira Promise a ser resolvida, irá retornar os dados e ignorar o resto.
 */
const productsLocal = fetch('http://localhost:8000/src/js/data/data.json');
const productsRemote = fetch('http://www.raphaelfabeni.com.br/rv/data.json');

Promise
    .race([productsLocal, productsRemote])
    .then(data => data.json())
    .then(data => {
        init(data);
    })


// Captura todos os catalogos da página e lista os produtos em cada um
// Se o data-products === all, lista todos os produtos com um array único
// Se não, ele lista com o data.releases e o data['best-sellers'], conforme for o atributo da classe
function init(data) {

    const productId = getURLParameter('product');
    const productSeg = getURLParameter('segmentation');

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
    // loadAnimation();
}


// Cria o markup do produto
function makeMarkup(product) {

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
                    <a href="#" class="btn">Comprar</a>
                    <a href="#" class="btn btn-dark">Personalize</a>
                </div>
            </div>
        </div>
    `;

    return markup;
}
