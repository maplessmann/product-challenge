function listData() {

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
            initFilter(data);
        });

    /**
     * Captura todos os catálogos da página e lista os produtos em cada um
     * Se o catalogo for 'all', lista todos os produtos com um array único
     * Se não, lista o array específico de cada catalogo
     */
    const init = (data) => {

        const catalogs = document.querySelectorAll('.products');
        catalogs.forEach(catalog => {
            const attr = catalog.getAttribute('data-products');
            const productsArray = [];
            productsArray.push(...data['best-sellers'], ...data.releases);

            if(attr === 'all')
                productModule.renderData(productsArray, catalog);
            else
                productModule.renderData(data[attr], catalog)
        });

    };
}


// Filtra os produtos
function initFilter(data) {

    const categories = document.querySelectorAll('.filter .categories .checkbox');
    categories.forEach(category => {
        category.addEventListener('change', findCatalogs)
    });

    function findCatalogs() {

        const currentFilter = this.getAttribute('data-filter');

        const catalogs = document.querySelectorAll('.products');
        catalogs.forEach(catalog => {
            const attr = catalog.getAttribute('data-products');
            const productsArray = [];
            productsArray.push(...data['best-sellers'], ...data.releases);

            if(attr === 'all')
                productModule.filter(productsArray, catalog, currentFilter);
            else
                productModule.filter(data[attr], catalog, currentFilter);
        });

        // Ativa somente um checkbox por vez
        const checkboxes = this.closest('.categories').querySelectorAll('.checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            this.checked = true;
        });
    }
}


// Faz o toggle da classe 'active' quando o usuário ativar o menu mobile
const hamburger = document.querySelector('.hamburger'),
      mobileMenu = document.querySelector('.menu-mobile');

function menuToggle() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

hamburger.addEventListener('click', menuToggle);


// Carregada as animações em sequência
(function() {
    const body = document.querySelector('body');

    window.addEventListener('load', function() {
        setTimeout(() => {
            loadAnimation();
        }, 500);
    });
})();

function loadAnimation() {
    const items = document.querySelectorAll('.has-animation');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('is-visible');
        }, 120 * index);
    });
}


// Slider
const slider = document.querySelectorAll('.slider-bullets');
slider.forEach(item => {

    // Utilizando Event Delegation para 'escutar' elementos adicionados dinamicamente na página
    document.querySelector('body').addEventListener('click', function() {

        const bullets = item.querySelectorAll('.bullet');
        bullets.forEach((bullet, index) => {

            if(event.target === bullet) {

                // Faz a navegação no slider
                const slider = event.target.closest('.products').querySelectorAll('.slider .slider-item');
                slider.forEach(item => {
                    item.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
                });

                // Adiciona a classe 'active' na bullet selecionada e remove das demais
                const all = event.target.parentNode.querySelectorAll('.bullet');
                all.forEach(bullet => bullet.classList.remove('active'));
                event.target.classList.add('active');

            }
        });
    });
});
