import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => (
  <li className={css['gallery-item']}>
    <img src={webformatURL} alt={tags} largeimageurl={largeImageURL} />
  </li>
);
