import React, { Component } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhotosByQuery } from 'helpers/api';
import { AppBlock } from './App.styled';

export class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: '',
    page: 1,
    showLoadMore: false,
    query: '',
    isModalOpen: false,
    selectedImage: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchPhotosByQuery(query, page)
        .then(({ totalHits, hits: photos }) => {
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showLoadMore: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      photos: [],
      isLoading: false,
      error: '',
      page: 1,
      showLoadMore: false,
      selectedImage: null,
      isModalOpen: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  handleImageClick = selectedImage => {
    this.setState({ selectedImage, isModalOpen: true });
  };

  render() {
    const { photos, showLoadMore, isLoading, isModalOpen, selectedImage } =
      this.state;

    return (
      <AppBlock>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          <ImageGalleryItem photos={photos} onSelect={this.handleImageClick} />
        </ImageGallery>
        {showLoadMore && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal onClose={this.toggleModal} selectedImage={selectedImage} />
        )}
      </AppBlock>
    );
  }
}
