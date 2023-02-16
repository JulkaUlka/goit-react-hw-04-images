import React, { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhotosByQuery } from 'helpers/api';
import { AppBlock } from './App.styled';

export function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {
      setIsLoading(true);
      try {
        const { totalHits, hits: photos } = await fetchPhotosByQuery(
          query,
          page
        );

        setPhotos(prevState => [...prevState, ...photos]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
  }, [query, page]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setIsLoading(false);
    setError('');
    setShowLoadMore(false);
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageClick = selectedImage => {
    setSelectedImage(selectedImage);
    toggleModal();
  };

  return (
    <AppBlock>
      {isLoading && <Loader />}
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery>
        <ImageGalleryItem photos={photos} onSelect={handleImageClick} />
      </ImageGallery>
      {showLoadMore && <Button onClick={handleLoadMore} />}
      {isModalOpen && (
        <Modal onClose={toggleModal} selectedImage={selectedImage} />
      )}
      {error && <p>Error{error}</p>}
    </AppBlock>
  );
}
