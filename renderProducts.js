/**
 * @function renderProducts - create html template of products
 * @param {array} productArray - is an array of objects where each object represents a product
 * @param {object} modal - a modal window. That undelines that this function depends on modal module
 * @param {object} createTempModal - a temporary version of modal window
 * @return {object} - div element with content
 */
function renderProducts(productArray, modal, createTempModal){
    const PATHTOIMGFOLDER = '/img/'
    /**
     * Function to create html card to display a product with description
     * @function  _prepareHtml
     * @param {object} an product
     * product.description {string} - a description of the product
     * product.img {string} - an image name
     * @return a div with content
     */
    function _prepareHtml(product){
        const $div = document.createElement('div')
        $div.classList.add('product')
        $div.setAttribute('data-id', product.id)
        const innerContent = `
        <img src="${PATHTOIMGFOLDER + product.img}" alt="${(product.img).slice(0, (product.img).indexOf('.'))}">
        <div class="product-description">
            ${product.description}
        </div>
        <button class="more-info" data-info="true">More Info</button>
        <button class="add-to-cart" data-tocart="true">Add to cart</button>
        `
        $div.innerHTML = innerContent
        return $div
    }

    const container = document.createElement('div')
    container.classList.add('row')

    //Create a card for each product
    productArray.forEach(product => {
        
        const productDiv = _prepareHtml(product)
        container.appendChild(productDiv)
    })

    return container
}

