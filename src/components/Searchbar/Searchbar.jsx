import React, { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  handleOnSubmit = e => {
    e.preventDefault();
    const query = e.currentTarget.elements.searchInput.value.trim();
    this.props.changeStateQuery(query);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleOnSubmit}>
          <button type="submit" className={css.button}>
            <span className={css['button-label']}>Search</span>
          </button>

          <input
            className={css.input}
            name="searchInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
