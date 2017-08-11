const productModule = (function() {
    'use strict';


    // Lista os produtos
    function renderData(data, elem) {

        const list = elem.querySelector('.row'),
              attr = elem.getAttribute('data-products');
        data.forEach(product => {
            list.insertAdjacentHTML('beforeend', makeMarkup(data, product, attr))
        });

        renderBullets(elem);
    }


    // Cria o markup de cada produto
    function makeMarkup(data, product, array) {

        const toBRL = (price) => price.toFixed(2).replace('.', ',');

        const highTop = (isHigh) => isHigh ? 'Cano Alto' : 'Cano Baixo';

        const link = () => `produto.html?product=${data.indexOf(product)}&segmentation=${array}`;

        const markup = `
            <div class="col-xs-12 col-sm-6 col-md-3 has-animation">
                <div class="product" data-id="${data.indexOf(product)}">
                    <a href="${link()}" class="product-link">
                        <img class="product-image" src="${product.image}" alt="Imagem de demonstração da chuteira">
                    </a>
                    <div class="product-personalize"> <img class="icon" src="images/personalize.jpg">Personalize </div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-top">${highTop(product['high-top'])}</div>
                    <div class="product-price">
                        <span class="price-normal">R$ ${toBRL(product.price)}</span>
                        <span class="price-quota">ou 10X ${toBRL(product.price / 10 - 0.09)} sem juros</span>
                    </div>
                    <a href="${link()}" class="btn">Comprar</a>
                </div>
            </div>
        `;

        return markup;
    }

    function renderBullets(elem) {
        const bullets = elem.querySelector('.slider-bullets');
        const productsAmount = elem.querySelectorAll('.product');

        productsAmount.forEach(item => {
            bullets.insertAdjacentHTML('beforeend', '<div class="bullet"></div>');
        });
    }

    return {
        renderData
    }

})();
