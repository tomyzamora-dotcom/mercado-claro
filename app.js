const fields = {
  name: document.querySelector('#product-name'),
  description: document.querySelector('#product-description'),
  price: document.querySelector('#product-price'),
  currency: document.querySelector('#product-currency'),
  image: document.querySelector('#product-image'),
  camera: document.querySelector('#camera-input'),
  phone: document.querySelector('#whatsapp-number'),
  message: document.querySelector('#whatsapp-message')
};

const preview = {
  name: document.querySelector('#preview-name'),
  description: document.querySelector('#preview-description'),
  price: document.querySelector('#preview-price'),
  image: document.querySelector('#preview-image'),
  placeholder: document.querySelector('#image-placeholder'),
  link: document.querySelector('#whatsapp-link'),
  page: document.querySelector('#sales-page')
};

let imageUrl = '';

function formatPrice() {
  const value = Number(fields.price.value || 0);
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: fields.currency.value }).format(value);
}

function refreshPreview() {
  preview.name.textContent = fields.name.value || 'Tu producto';
  preview.description.textContent = fields.description.value || 'Describe aquí lo que hace especial a tu producto.';
  preview.price.textContent = formatPrice();

  if (imageUrl) {
    preview.image.src = imageUrl;
    preview.image.hidden = false;
    preview.placeholder.hidden = true;
  } else {
    preview.image.hidden = true;
    preview.placeholder.hidden = false;
  }

  const message = fields.message.value || `Hola, quiero información sobre ${fields.name.value}.`;
  preview.link.href = `https://wa.me/${fields.phone.value.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

Object.values(fields).forEach((field) => field.addEventListener('input', refreshPreview));
function handleImageSelection(event) {
  const [file] = event.target.files;

  if (!file) return;

  if (imageUrl) URL.revokeObjectURL(imageUrl);
  imageUrl = URL.createObjectURL(file);
  refreshPreview();
}

fields.image.addEventListener('change', handleImageSelection);
fields.camera.addEventListener('change', handleImageSelection);
document.querySelector('#take-photo').addEventListener('click', () => fields.camera.click());
document.querySelector('#upload-image').addEventListener('click', () => fields.image.click());

document.querySelectorAll('input[name="accent"]').forEach((choice) => {
  choice.addEventListener('change', () => {
    preview.page.className = `sales-page ${choice.value}-theme`;
  });
});

document.querySelector('#product-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#save-status').textContent = 'Configuración actualizada';
  refreshPreview();
});

refreshPreview();