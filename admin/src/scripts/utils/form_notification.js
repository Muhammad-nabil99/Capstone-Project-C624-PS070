export function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#f44336' : '#4caf50'; 
    notification.classList.add('show');
  
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000); 
  }
  