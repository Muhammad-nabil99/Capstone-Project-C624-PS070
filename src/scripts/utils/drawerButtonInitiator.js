const DrawerButtonInitiator = {
    init({nav, drawer, content}){
        drawer.addEventListener('click', () =>{
            
            this._open(nav);
        })
        content.addEventListener('click', () =>{
            this._close(nav)
        })
        
        },
    _open(nav){
        nav.classList.toggle('show');
        this._afterClicked(nav);

    },
    _close(nav){
        nav.classList.remove('show')

    },
    _afterClicked(navbar){
        [...navbar.children[0].children].forEach(element => {
            element.addEventListener('click', (e)=>{
                if(!e.target.parentElement.parentElement.parentElement.classList.contains('show')) return;
                e.target.parentElement.parentElement.parentElement.classList.remove('show')
            })
            
        });
    }
}
export default DrawerButtonInitiator;