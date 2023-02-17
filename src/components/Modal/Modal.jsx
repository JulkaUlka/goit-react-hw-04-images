import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalBlock, Overlay } from './Modal.styled';

export function Modal({ onClose, selectedImage }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackDrop}>
      <ModalBlock>
        <img src={selectedImage} alt="Large" />
      </ModalBlock>
    </Overlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedImage: PropTypes.string.isRequired,
};
