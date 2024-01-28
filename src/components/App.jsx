import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';

import { LARGE_IMAGE_URL, PER_PAGE, STATUSES } from 'utilities/constants';
import { axiosGet } from 'services/api';
import { Button } from './Button/Button';

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
    const isPending = this.state.status === STATUSES.pending;
    const isShow = !isPending && this.state.totalPages > this.state.page;

    return (
      <>
        <Searchbar changeStateQuery={this.changeStateQuery} />
        <ImageGallery
          hits={this.state.hits}
          handleOnClickImage={this.handleOnClickImage}
        />
        {isPending && (
          <ThreeDots
            height="100"
            width="100"
            color="#303f9f"
            wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
        {isShow && <Button changeStatePage={this.changeStatePage} />}
      </>
    );
  }
}
