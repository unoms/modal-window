const motorOils = [
    {id: 68503, description: 'ARDINA SAE 5W30 ST Fully Synthetic', price: 10, img:'68503-5W30-ST.jpg'},
    {id: 68506, description: 'ARDINA SAE 5W30 XT Longlife', price: 12, img:'68506-5W30-XT.jpg'},
    {id: 68509, description: 'ARDINA SAE 5W40 ST Fully Synthetic', price: 11, img:'68509-5W40-ST.jpg'},
    {id: 68515, description: 'ARDINA SAE 10W40 ECO Semi Synthetic', price: 5, img:'68515-10W40.jpg'},
    {id: 68518, description: 'ARDINA SAE 15W40 ECO Multigrade', price: 7, img:'68518-15W40.jpg'},

]

const PATHTOIMGFOLDER = '/img/'

//This modal window is always on the page
const mainModal = modal.createModal({})

//Event listeners for the page
document.getElementById('lubricants').addEventListener('click', ()=>{
    if(document.querySelector('.row') === null){
        const containerOfproducts = renderProducts(motorOils, mainModal, createTempModal)
        document.querySelector('.main-container').appendChild(containerOfproducts)
    }else{
        mainModal.setContent('<p>All products already displayed') 
        mainModal.setTitle('Information')
        mainModal.open()
    }
})

document.getElementById('carcare').addEventListener('click', ()=>{
    mainModal.setContent('<p>These items are temporary unavailable') 
    mainModal.setTitle('Information')
    mainModal.open()  
})

document.addEventListener('click', (e)=>{
    if(e.target.dataset.info){
        const id = parseInt(e.target.parentNode.getAttribute('data-id'))
        const product = motorOils.find( product => product.id === id )
        if(product){
            const html = `<img src=${PATHTOIMGFOLDER + product.img}>
            <p>Price: Euro ${product.price}</p>
            `
            mainModal.setContent(html)
            mainModal.setTitle(product.id)
            mainModal.open()
        }
    }else if(e.target.dataset.tocart){
        //Here we will create a temporary modals
        createTempModal().then(()=>{
            document.getElementById('cart').textContent = increaseOrderedItems()
            console.log('Product has been added to a cart')
        })
        .catch(()=> console.log('Order cancelled'))
    }
})

//Load a current number of ordered items
document.getElementById('cart').textContent = localStorage.getItem('number')

