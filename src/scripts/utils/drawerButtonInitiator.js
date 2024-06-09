const DrawerButtonInitiator = {
    init({nav, drawer, content}){
        drawer.addEventListener('click', () =>{
            
            this._open(nav);
        })
        content.addEventListener('click', () =>{
            this._close(nav)
        })
<<<<<<< HEAD
        
        },
    _open(nav){
        nav.classList.toggle('show');
        this._afterClicked(nav);
=======
    },
    _open(nav){
        nav.classList.toggle('show');
>>>>>>> 0b01e66fa1597369cb142e8d2c9c6979f8fc3b61

    },
    _close(nav){
        nav.classList.remove('show')

<<<<<<< HEAD
    },
    _afterClicked(navbar){
        [...navbar.children[0].children].forEach(element => {
            element.addEventListener('click', (e)=>{
                if(!e.target.parentElement.parentElement.parentElement.classList.contains('show')) return;
                e.target.parentElement.parentElement.parentElement.classList.remove('show')
            })
            
        });
=======
>>>>>>> 0b01e66fa1597369cb142e8d2c9c6979f8fc3b61
    }
}
export default DrawerButtonInitiator;