import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ photos, onSelect }) {
  return (
    <>
      {photos.map(({ id, tags, webformatURL, largeImageURL }) => (
        <GalleryItem key={id} onClick={() => onSelect(largeImageURL)}>
          <Image src={webformatURL} alt={tags} />
        </GalleryItem>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
