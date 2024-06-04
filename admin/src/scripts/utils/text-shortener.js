// text-shortener.js

const generateDetailHTML = (text, maxLength = 100) => {
  if (text.length <= maxLength) {
    return text;
  }

  const shortText = text.substring(0, maxLength) + '... ';
  return `
    <span class="short-text">${shortText}</span>
    <span class="full-text" style="display: none;">${text}</span>
    <a href="#" class="see-more">see more</a>
  `;
};

const initializeTextShortener = () => {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('see-more')) {
      event.preventDefault();
      const parent = event.target.parentElement;
      const shortText = parent.querySelector('.short-text');
      const fullText = parent.querySelector('.full-text');
      const seeMoreLink = event.target;

      if (fullText.style.display === 'none') {
        fullText.style.display = 'inline';
        shortText.style.display = 'none';
        seeMoreLink.textContent = 'see less';
      } else {
        fullText.style.display = 'none';
        shortText.style.display = 'inline';
        seeMoreLink.textContent = 'see more';
      }
    }
  });
};

module.exports = {
  generateDetailHTML,
  initializeTextShortener,
};
