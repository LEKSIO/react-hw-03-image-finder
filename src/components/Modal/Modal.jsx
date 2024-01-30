import css from './Modal.module.css';
import React from 'react';

export class Modal extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handlePressEsc);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handlePressEsc);
  }

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handlePressEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={this.props.modalData} alt="" />
        </div>
      </div>
    );
  }
}
