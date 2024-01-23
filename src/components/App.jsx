import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

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

  changeStateQuery = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    return <Searchbar changeStateQuery={this.changeStateQuery} />;
  }
}
