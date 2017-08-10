const productModule = (function() {

    function renderBullets(groupClass) {
        const sliderBullets = document.querySelector(`.products-${groupClass} .slider-bullets`);
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        sliderBullets.appendChild(bullet);
    }

    function renderProducts(data, groupClass) {
        const productsGroup = document.querySelector(`.products.products-${groupClass} .slider`);

        const toComma = (price) => price.toFixed(2).replace('.', ',');

        const highTop = (isHigh) => isHigh ? 'Cano Alto' : 'Cano Baixo';

        productsGroup.innerHTML = '';

        data.forEach((product) => {
            const markup = `
                <div class="col-xs-12 col-sm-6 col-md-3">
                    <div class="product" data-high-top="${product['high-top']}">
                        <a href="#" class="product-link">
                            <img class="product-image" src="${product.image}" alt="Imagem de demonstração da chuteira">
                        </a>
                        <div class="product-title">${product.title}</div>
                        <div class="product-top">${highTop(product['high-top'])}</div>
                        <div class="product-price">
                            <span class="price-normal">R$ ${toComma(product.price)}</span>
                            <span class="price-quota">ou 10X ${toComma(product.price / 10 - 0.09)} sem juros</span>
                        </div>
                        <a href="#" class="btn">Comprar</a>
                    </div>
                </div>
            `;
            productsGroup.insertAdjacentHTML('beforeend', markup);
            // renderBullets(groupClass);
        });
    }

    function renderBestSellers(data) {
        renderProducts(data, 'best-sellers');
    }

    function renderReleases(data) {
        renderProducts(data, 'releases');
    }


    function filter(filters) {

        // Return all filtered arrays
        const campo = productsArray
            .filter(obj => obj.category === 'campo')
            .map(obj => obj)

        const society = productsArray
            .filter(obj => obj.category === 'society')
            .map(obj => obj)

        const highTop = productsArray
            .filter(obj => obj['high-top'] === true)
            .map(obj => obj)

        const lowTop = productsArray
            .filter(obj => obj['high-top'] === false)
            .map(obj => obj)

        // Clean the temporary array
        let tempArray = [];

        // Add the filtered items into temporary array
        const addItem = (array) => {
            array.forEach(item => {
                tempArray.includes(item) ? '' : tempArray.push(item);
            });
        };

        filters.forEach(filter => {
            const propertie = filter === 'cano-alto' ? highTop :
                              filter === 'cano-baixo' ? lowTop :
                              filter === 'campo' ? campo :
                              filter === 'society' ? society : filter

            addItem(propertie);
        });

        // renderProducts(tempArray, 'best-sellers');
        // console.log(tempArray);
        return tempArray;
    }

    return {
        renderBestSellers,
        renderReleases,
        filter,
        renderProducts
    };

})();
