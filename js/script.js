import galleryImages from './app.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
};

let activeIndex = null;

const createGalleryMarkup = galleryImages.map(
  ({ preview, original, description }) => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
    data-source="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
  }
);

refs.galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup.join(''));
refs.galleryList.addEventListener('click', handleOpenModal);
refs.modal.addEventListener('click', handleCloseModal);
window.addEventListener('keydown', openImageByEnter);

function handleOpenModal(e) {
  e.preventDefault();

  if (
    !e.target.classList.contains('gallery__image') &&
    !e.target.classList.contains('gallery__link')
  ) {
    return;
  }

  galleryImages.forEach((el, index) => {
    if (el.original === e.target.dataset.source) {
      activeIndex = index;
    }
  });

  refs.modal.classList.add('is-open');
  refs.modalImg.src = e.target.dataset.source;
  refs.modalImg.alt = e.target.alt;

  window.addEventListener('keydown', keyBoardManipulation);
}

function handleCloseModal(e) {
  if (e?.target.classList.contains('lightbox__image')) {
    return;
  }

  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
}

function keyBoardManipulation(e) {
  switch (e.key) {
    case 'Escape':
      handleCloseModal();
      break;
    case activeIndex < galleryImages.length - 1 && 'ArrowRight':
      activeIndex += 1;
      refs.modalImg.src = galleryImages[activeIndex].original;
      break;
    case activeIndex > 0 && 'ArrowLeft':
      activeIndex -= 1;
      refs.modalImg.src = galleryImages[activeIndex].original;
      break;
    case activeIndex === galleryImages.length - 1 && 'ArrowRight':
      activeIndex = 0;
      refs.modalImg.src = galleryImages[activeIndex].original;
      break;
    case activeIndex === 0 && 'ArrowLeft':
      activeIndex = galleryImages.length - 1;
      refs.modalImg.src = galleryImages[activeIndex].original;
      break;
    default:
      break;
  }
}

function openImageByEnter(e) {
  if (!e.target.classList.contains('gallery__link') || e.key !== 'Enter') {
    return;
  }

  handleOpenModal(e);
}
