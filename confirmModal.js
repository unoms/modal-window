function createTempModal(){
    return new Promise((res, rej)=>{
        //Here we will create a temporary modals
        const confirmWindow = modal.createModal({title: 'Confirm Order', 
        onClose: function(){
            confirmWindow.destroy()
            console.log('confirm modal was destroyed')
        },
        buttons: [
            {
                text: 'Confirm',
                handler(){
                    confirmWindow.close()
                    res()
                }
            },
            {
                text: 'Cancel',
                handler(){
                    confirmWindow.close()
                    rej()
                }
            }
        ]})
        confirmWindow.open()
    })
}