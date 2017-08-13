const productModule = (function() {
    'use strict';


    // Lista os produtos na página
    function renderData(data, catalog) {

        const list = catalog.querySelector('.row'),
              attr = catalog.getAttribute('data-products');

        // limpa o markup dos produtos
        list.innerHTML = '';

        data.forEach(product => {
            list.insertAdjacentHTML('beforeend', createMarkup(data, product, attr))
        });

        renderBullets(catalog);
    }


    // Cria o markup de cada produto
    function createMarkup(data, product, array) {

        const toBRL = (price) => price.toFixed(2).replace('.', ',');

        const highTop = (isHigh) => isHigh ? 'Cano Alto' : 'Cano Baixo';

        const link = () => `produto.html?product=${data.indexOf(product)}&catalog=${array}`;

        const markup = `
            <div class="slider-item col-xs-12 col-sm-6 col-md-3 has-animation">
                <div class="product" data-id="${data.indexOf(product)}">
                    <a href="${link()}" class="product-link">
                        <img class="product-image" src="${product.image}" alt="Imagem de demonstração da chuteira">
                    </a>
                    <div class="product-personalize"> <img class="icon" src="images/personalize.jpg">Personalize </div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-top">${highTop(product['high-top'])}</div>
                    <div class="product-price">
                        <span class="price-normal">R$ ${toBRL(product.price)}</span>
                        <span class="price-quota">ou ${product.installments.number}X ${toBRL(product.installments.value)} sem juros</span>
                    </div>
                    <a href="${link()}" class="btn">Comprar</a>
                </div>
            </div>
        `;

        return markup;
    }


    // Adiciona uma navegação (bullets) abaixo do slider
    function renderBullets(catalog) {

        const bullets = catalog.querySelector('.slider-bullets'),
              products = catalog.querySelectorAll('.product'),
              bulletsAmount = products.length <= 4 ? 1 : products.length - 3;

        if(bullets) {
            /**
             * Faz um loop para adicionar a quantidade de bullets de acordo com a quantidade de produtos no slider
             * Com a quantidade de bullets, cria um array, para que seja possível fazer o loop de maneira funcional
             */
            const total = Array(bulletsAmount).fill().map((_, i) => i + 1);
            bullets.innerHTML = '';
            total.forEach(i => {
                bullets.insertAdjacentHTML('beforeend', '<div class="bullet"></div>');
            });

            // Adiciona a classe 'active' na primeira bullet
            bullets.querySelector('.bullet:first-child').classList.add('active');
        }
    }


    // Faz o filtro dos produtos
    function filter(data, catalog, filter) {

        const filterCategory = data
            .filter(obj => obj.category === filter)
            .map(obj => obj);

        const filterHighTop = (value) => {
            return data
                .filter(obj => obj['high-top'] == value)
                .map(obj => obj);
        }

        const filtered = filter === 'cano-alto' ? filterHighTop(true) : filter === 'cano-baixo' ? filterHighTop(false) : filterCategory

        const tempArray = [];

        tempArray.push(...filtered)

        productModule.renderData(tempArray, catalog);
        loadAnimation();
        renderBullets(catalog);
    }



    return {
        renderData,
        filter
    }

})();
