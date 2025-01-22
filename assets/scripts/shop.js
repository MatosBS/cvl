document.addEventListener('DOMContentLoaded', function() {
  const buyButtons = document.querySelectorAll('.buy-button');
  const sizeSelects = document.querySelectorAll('.size-select');

  // Deshabilitar botones de compra para productos con talle hasta que se seleccione uno
  sizeSelects.forEach(select => {
    const buyButton = select.nextElementSibling;
    buyButton.disabled = true;

    select.addEventListener('change', () => {
      buyButton.disabled = !select.value;
    });
  });

  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const sizeSelect = productCard.querySelector('.size-select');
      const size = sizeSelect ? sizeSelect.value : null;

      // Construir mensaje de confirmación
      let message = `¿Deseas comprar ${productName}`;
      if (size) {
        message += ` (Talle: ${size})`;
      }
      message += '?';

      if (confirm(message)) {
        alert('¡Gracias por tu compra! Te contactaremos para coordinar el pago y la entrega.');
      }
    });
  });
});