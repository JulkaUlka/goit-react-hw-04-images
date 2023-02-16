import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchbarHeader,
  Form,
  Input,
  Button,
  ButtonLabel,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const hendleInput = ({ target }) => {
    setQuery(target.value);
  };

  const hendleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={hendleSubmit}>
        <Button type="submit">
          &#128269;
          <ButtonLabel>Search</ButtonLabel>
        </Button>
        <Input
          type="text"
          name="query"
          value={query}
          onChange={hendleInput}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
