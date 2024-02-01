import React, { Component } from 'react';
import css from './Button.module.css';

export class Button extends Component {
  handleOnClick = () => {
    this.props.changeStatePage();
  };

  render() {
    return (
      <button className={css.button} onClick={this.handleOnClick}>
        Load more
      </button>
    );
  }
}
