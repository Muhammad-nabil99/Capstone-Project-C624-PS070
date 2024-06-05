function shortenText(text, maxLength = 100) {
  if (text.length <= maxLength) {
    return text;
  }
  const shortText = text.slice(0, maxLength) + '... <span class="see-more" style="color: blue; cursor: pointer;">See more</span>';
  return shortText;
}

function applyTextShortener(containerSelector, textSelector, maxLength) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    const textElement = container.querySelector(textSelector);
    if (textElement) {
      const originalText = textElement.textContent;
      textElement.innerHTML = shortenText(originalText, maxLength);

      const seeMore = textElement.querySelector('.see-more');
      if (seeMore) {
        seeMore.addEventListener('click', function handleSeeMoreClick() {
          textElement.innerHTML = originalText;
        });
      }
    }
  });
}

module.exports = {
  shortenText,
  applyTextShortener,
};
