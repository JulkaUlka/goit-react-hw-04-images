import { GalleryItem, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ photos }) {
  return (
    <>
      {photos.map(({ id, tags, webformatURL }) => (
        <GalleryItem key={id}>
          <Image src={webformatURL} alt={tags} />
        </GalleryItem>
      ))}
    </>
  );
}
