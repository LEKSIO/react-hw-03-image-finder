import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { axiosGet } from 'services/api';
import { LARGE_IMAGE_URL, PER_PAGE, STATUSES } from 'utilities/constants';

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

  changeStateQuery = query => {
    this.setState({ query, page: 1 });
  };

  changeStatePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOnClickImage = e => {
    if (e.target.hasAttribute(LARGE_IMAGE_URL))
      this.setState({
        isModalOpen: true,
        modalData: e.target.getAttribute(LARGE_IMAGE_URL),
      });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

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

  render() {
    const isPending = this.state.status === STATUSES.pending;
    const isShow = !isPending && this.state.totalPages > this.state.page;
    return (
      <div>
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
        {this.state.isModalOpen && (
          <Modal
            modalData={this.state.modalData}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
