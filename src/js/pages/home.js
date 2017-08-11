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

}
