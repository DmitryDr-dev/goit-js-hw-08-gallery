// - Создание и рендер разметки по массиву данных `galleryItems` из `app.js` и
//   предоставленному шаблону.
// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
//   изображения.
// - Открытие модального окна по клику на элементе галереи.
// - Подмена значения атрибута `src` элемента `img.lightbox__image`.
// - Закрытие модального окна по клику на кнопку
//   `button[data-action="close-lightbox"]`.
// - Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо
//   для того, чтобы при следующем открытии модального окна, пока грузится
//   изображение, мы не видели предыдущее.

import images from './app.js';

const createGalleryMarkup = array => {
  const galleryItemsList = [];

  array.map(
    ({
      preview: smallImage,
      original: bigImage,
      description: imageDescription,
    }) => {
      const galleryItemEl = document.createElement('li');
      galleryItemEl.classList.add('gallery__item');

      const galleryLinkEl = document.createElement('a');
      galleryLinkEl.classList.add('gallery__link');
      galleryLinkEl.href = bigImage;

      const galleryImageEl = document.createElement('img');
      galleryImageEl.classList.add('gallery__image');
      galleryImageEl.src = smallImage;
      galleryImageEl.dataset.source = bigImage;
      galleryImageEl.alt = imageDescription;

      galleryItemEl.append(galleryLinkEl, galleryImageEl);

      galleryItemsList.push(galleryItemEl);
    }
  );

  return galleryItemsList;
};

/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */
