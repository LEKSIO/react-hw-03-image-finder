import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { LARGE_IMAGE_URL, PER_PAGE, STATUSES } from 'utilities/constants';
import { axiosGet } from 'services/api';

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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    )
      this.getImages();
  }

  getImages = async () => {
    try {
      this.setState({ status: STATUSES.pending });
      const { hits, totalHits } = await axiosGet(this.state);
      this.setState(prevState => ({
        hits: prevState.page === 1 ? hits : [...prevState.hits, ...hits],
        status: STATUSES.success,
        totalPages: Math.ceil(totalHits / PER_PAGE),
      }));
    } catch (error) {
      this.setState({ status: STATUSES.error, error: error.message });
    }
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
