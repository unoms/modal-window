/**
 * @function - increase the number of ordered items
 * @returns {Integer} - number of current ordered items
 *  */
function increaseOrderedItems(){
    let numberOfOrderedItems = localStorage.getItem('number') || 0
    numberOfOrderedItems++
    localStorage.setItem('number', numberOfOrderedItems)
    return numberOfOrderedItems
}

