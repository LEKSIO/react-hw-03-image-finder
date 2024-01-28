import css from './Button.module.css';
import React, { Component } from 'react';

class Button extends Component {
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

export { Button };
