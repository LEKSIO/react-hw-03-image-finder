import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { LARGE_IMAGE_URL } from 'utilities/constants';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    status: 'idle', // "idle" | "pending" | "success" | "error"
    error: null,
    totalPages: null,
    isModalOpen: false,
    modalData: null,
  };

  handleOnClickImage = e => {
    if (e.target.hasAttribute(LARGE_IMAGE_URL))
      this.setState({
        isModalOpen: true,
        modalData: e.target.getAttribute(LARGE_IMAGE_URL),
      });
  };

  changeStateQuery = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    return (
      <>
        <Searchbar changeStateQuery={this.changeStateQuery} />
        <ImageGallery
          hits={this.state.hits}
          handleOnClickImage={this.handleOnClickImage}
        />
      </>
    );
  }
}
