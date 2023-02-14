import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import React, { Component } from 'react';
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
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const {
          total,
          totalHits,
          hits: photos,
        } = await fetchPhotosByQuery(query, page);

        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          showLoadMore: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  onSubmit = query => {
    this.setState({
      query,
      photos: [],
      isloading: false,
      error: '',
      page: 1,
      showLoadMore: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, showLoadMore, isLoading } = this.state;
    return (
      <AppBlock>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          <ImageGalleryItem photos={photos} />
        </ImageGallery>
        {showLoadMore && <Button onClick={this.handleLoadMore} />}
      </AppBlock>
    );
  }
}
