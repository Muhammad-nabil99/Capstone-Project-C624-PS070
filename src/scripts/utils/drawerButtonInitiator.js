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

    },
    _close(nav){
        nav.classList.remove('show')

    }
}
export default DrawerButtonInitiator;