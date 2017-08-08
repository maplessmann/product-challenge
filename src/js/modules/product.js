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
            renderBullets(groupClass);
        });
    }

    function renderBestSellers(data) {
        renderProducts(data, 'best-sellers');
    }

    function renderReleases(data) {
        renderProducts(data, 'releases');
    }

    function filter(value) {  }

    return {
        renderBestSellers,
        renderReleases,
        filter
    };

})();
