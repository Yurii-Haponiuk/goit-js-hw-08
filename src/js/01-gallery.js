// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryItemsMarkup(items) {
    return items.map(({ description, original, preview }) => {
        return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`;
    }).join("");
}

function onGalleryContainerClick(evt) {
    console.log(evt)
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    const currentImgUrl = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `
		<img src="${currentImgUrl}" width="1280" height="auto"/>
        `,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', onEscapePress);
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscapePress);
      },
    }
  );
    instance.show();
    
    function onEscapePress(evt) {
  if (evt.code !== 'Escape') return;
  instance.close();
}

}



const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});