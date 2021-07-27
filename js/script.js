// done 1 Создание и рендер разметки по массиву данных `galleryItems` из `app.js` и предоставленному шаблону.
// done 2 Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого изображения.
// done 3 Открытие модального окна по клику на элементе галереи.
// done 4 Подмена значения атрибута `src` элемента `img.lightbox__image`.
// done 5 Закрытие модального окна по клику на кнопку `button[data-action="close-lightbox"]`.
// done 6 Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import images from './app.js';

function createGalleryMarkup(node, array) {
  const galleryMarkup = array.map(
    ({
      preview: smallImageSrc,
      original: bigImageSrc,
      description: imageDescription,
    }) => {
      const listItemEl = document.createElement('li');
      listItemEl.classList.add('gallery__item');

      const linkEl = document.createElement('a');
      linkEl.classList.add('gallery__link');
      linkEl.href = bigImageSrc;

      const imageEl = document.createElement('img');
      imageEl.classList.add('gallery__image');
      imageEl.src = smallImageSrc;
      imageEl.dataset.source = bigImageSrc;
      imageEl.alt = imageDescription;

      linkEl.appendChild(imageEl);
      listItemEl.appendChild(linkEl);

      return listItemEl;
    }
  );

  node.append(...galleryMarkup);
}

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxCloseBtnEl = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const lightboxBigImageEl = document.querySelector('.lightbox__image');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

createGalleryMarkup(galleryEl, images);

galleryEl.addEventListener('click', onImageClick);
lightboxCloseBtnEl.addEventListener('click', onCloseModal);
lightboxOverlayEl.addEventListener('click', onOverlayClose);

function onImageClick(e) {
  const isSmallImage = e.target.classList.contains('gallery__image');

  if (!isSmallImage) {
    return;
  }

  const bigImageSrc = e.target.dataset.source;
  const bigImageAlt = e.target.alt;

  lightboxBigImageEl.setAttribute('src', bigImageSrc);
  lightboxBigImageEl.setAttribute('alt', bigImageAlt);

  onOpenModal(e);
}

function onOpenModal(e) {
  e.preventDefault();
  lightboxEl.classList.add('is-open');

  window.addEventListener('keydown', onEscapeKeypress);
  window.addEventListener('keydown', onArrowRightPress);
  window.addEventListener('keydown', onArrowLeftPress);
}

function onCloseModal() {
  lightboxEl.classList.remove('is-open');

  lightboxBigImageEl.removeAttribute('src');
  lightboxBigImageEl.removeAttribute('alt');
}

function onEscapeKeypress(e) {
  const ESC_KEY_CODE = 'Escape';

  if (e.code !== ESC_KEY_CODE) {
    return;
  }

  onCloseModal();
}

function onOverlayClose(e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  onCloseModal();
}

function getImageIndex(targetedImage) {
  const curentImage = targetedImage;
  const curentImageSrc = curentImage.getAttribute('href');
  let currentIndex = 0;

  images.forEach((image, index) => {
    if (image.original === curentImageSrc) {
      currentIndex = index;
    }
  });

  return currentIndex;
}

function onArrowRightPress(e) {
  const ARROW_RIGHT = 'ArrowRight';

  if (e.code !== ARROW_RIGHT) {
    return;
  }

  let currentImageIndex = getImageIndex(e.target);
  let nextImageIndex = currentImageIndex + 1;
  let nextImageSrc = images[nextImageIndex].original;

  lightboxBigImageEl.setAttribute('src', nextImageSrc);
}

function onArrowLeftPress(e) {
  const ARROW_LEFT = 'ArrowLeft';

  if (e.code !== ARROW_LEFT) {
    return;
  }

  let currentImageIndex = getImageIndex(e.target);
  let nextImageIndex = currentImageIndex - 1;
  let nextImageSrc = images[nextImageIndex].original;

  lightboxBigImageEl.setAttribute('src', nextImageSrc);
}
