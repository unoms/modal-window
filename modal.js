/***
 * Function for creating modal window
 * @param {oject} -options
 * options.title {string} - Title of the modal window
 * options.content {string} - Main content of the modal window
 * options.width {string} - The width of the modal window
 * options.onClose {function} - the function we may call after closing modal window
 * options.buttons {array} - array of buttons. text field is a textContent, hanler() is a method to hadle a click
 * @return {object {open(), close(), destroy()}}
 */
const modal = (function(){
    function createModal(options){
        const DEFAULT_WIDTH = "20rem"
        //Private function
        function _createHtml(){
            //Main hml
            const html = `
            <div class="modal-window" width=${options.width || DEFAULT_WIDTH}>
            <div class="modal-header">
                <h3>${options.title || ''}</h3><span class="modal-close" data-close="true">&times;</span>
            </div>
            <div class="modal-content">
                ${options.content || ''}
            </div>
            <div class="modal-footer"></div>
            `
            //Container
            const $div = document.createElement('div')
            $div.classList.add('modal-overlay')
            $div.setAttribute('data-close', 'close')
            $div.innerHTML = html
    
            //Append to document
            document.body.appendChild($div)
            return $div
        }
    
        function _createFooter(rootElement){
            //Check if we pass options for buttons
            if(options.buttons && options.buttons.length > 0){
                options.buttons.forEach(button =>{
                    const $btn = document.createElement('button')
                    $btn.textContent = button.text
                    $btn.onclick = button.handler
                    rootElement.appendChild($btn)
                })
            }else{
                //If no buttons have been passed, we do nothing
                return
            }
        }
    
        const $div = _createHtml()
        _createFooter($div.querySelector('.modal-footer'))
    
        let isDestroyed = false
        let closing = false; //Flag to prevent uncontrol behavior in case of open() while it's being closed
    
    
        const modal = {
            open(){
                if(isDestroyed) return
                if(!closing){
                    $div.classList.add('open') 
                    $div.querySelector('.modal-window').classList.add('open')
                }
            },
            close(){
                closing = true
                $div.classList.remove('open')
                $div.querySelector('.modal-window').classList.remove('open')
                setTimeout(()=>{ 
                    closing = false 
                    if(typeof options.onClose === 'function'){
                        options.onClose()
                    }
                    }, 300)//This time matches the time of transition in modal.css
                },
            setContent(content){
                $div.querySelector('.modal-content').innerHTML = content
            },
            setTitle(title){
                $div.querySelector('.modal-header h3').textContent = title
            },
            destroy(){
                //Remove from DOM and clear event listener
                $div.removeEventListener('click', closeModal)
                $div.parentNode.removeChild($div)
                isDestroyed = true
            }
        }
    
        const closeModal = (e) =>{
            if(e.target.dataset.close){
                modal.close()
            }
        }
    
        $div.addEventListener('click', closeModal)
    
        //return a modal object with open methods
        return modal
    }

    return { createModal }
}())