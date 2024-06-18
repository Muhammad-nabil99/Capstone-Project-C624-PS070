function numberIncreament(elements){
    if(window.location.hash === '' || window.location.hash === '#/beranda');
    function isElementInViewport(el) {
      if(el){
          let rect = el.getBoundingClientRect();
          return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
          );

      }
    }
  
    function increment(elem, finalVal) {
      let element = document.getElementById(elem);
      let currVal = parseInt(element.innerHTML, 10);
      if (currVal < finalVal) {
        currVal++;
        element.innerHTML = currVal + "+";
  
        setTimeout(function () {
          increment(elem, finalVal);
        }, 300);
      }
    }
  
    function checkElements() {
      elements.forEach(function (item) {
        let element = document.getElementById(item.id);
        if (isElementInViewport(element)) {
          increment(item.id, item.value);
        }
      });
    }
  
    window.addEventListener('scroll', checkElements);
    window.addEventListener('resize', checkElements);
  
}
export default numberIncreament;