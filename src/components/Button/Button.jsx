import PropTypes from 'prop-types';
import { ButtonType } from './Button.styled';

export function Button({ onClick }) {
  return (
    <ButtonType type="button" onClick={onClick}>
      Load More
    </ButtonType>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
