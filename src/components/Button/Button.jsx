import { ButtonType } from './Button.styled';

export function Button({ onClick }) {
  return <ButtonType type="button" onClick={onClick}>Load More</ButtonType>;
}
