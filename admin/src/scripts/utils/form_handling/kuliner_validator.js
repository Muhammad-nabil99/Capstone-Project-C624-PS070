const kuliner_validator = {
    setupImageInput(imageInput, imagePreview, imageLabel) {
      imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            imageLabel.textContent = 'Switch image';
          };
          reader.readAsDataURL(file);
        }
      });
  
      imageLabel.addEventListener('click', (e) => {
        e.preventDefault();
        imageInput.click();
      });
  
      imageInput.addEventListener('click', () => {
        imageInput.value = '';
      });
    },
  
    validateSingleField(input) {
      const value = input.value.trim();
      let isValid = true;
      let errorMessage = '';
  
      switch (input.id) {
        case 'name':
          if (!value) {
            errorMessage = 'Nama Tempat Kuliner wajib diisi.';
            isValid = false;
          }
          break;
        case 'location':
          if (!value) {
            errorMessage = 'Lokasi wajib diisi.';
            isValid = false;
          }
          break;
        case 'openTime':
          if (!value) {
            errorMessage = 'Jam Buka wajib diisi.';
            isValid = false;
          }
          break;
        case 'detail':
          if (!value) {
            errorMessage = 'Informasi Detail wajib diisi.';
            isValid = false;
          }
          break;
        case 'mapLocation':
          if (!value || value === '0,0') {
            errorMessage = 'Silakan masukkan nama tempat.';
            isValid = false;
          }
          break;
        case 'image':
          { const imageElement = document.getElementById('imagePreview');
          const imgSrc = imageElement.getAttribute('src');
          if (!imgSrc || imgSrc === '') {
            errorMessage = 'Gambar wajib diisi.';
            isValid = false;
          }
          break; }
      }
  
      this.showValidationNotification(errorMessage, !isValid, `${input.id}Validation`);
      return isValid;
    },
  
    validateForm(formData) {
      let isValid = true;
      let firstInvalidField = null;
  
      for (const [key] of formData.entries()) {
        const input = document.getElementById(key);
        if (input && !this.validateSingleField(input)) {
          isValid = false;
          if (!firstInvalidField) {
            firstInvalidField = input;
          }
        }
      }
  
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth' });
      }
  
      return isValid;
    },
  
  
    showValidationNotification(message, isError, elementId) {
      const validationElement = document.getElementById(elementId);
      if (validationElement) {
        validationElement.textContent = message;
        validationElement.style.color = isError ? '#f44336' : '#4caf50';
      }
    }
  };
  
  export default kuliner_validator;
  