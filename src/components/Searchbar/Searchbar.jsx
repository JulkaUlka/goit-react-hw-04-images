import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchbarHeader,
  Form,
  Input,
  Button,
  ButtonLabel,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  hendleInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  hendleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <SearchbarHeader>
        <Form onSubmit={this.hendleSubmit}>
          <Button type="submit">
            &#128269;
            <ButtonLabel>Search</ButtonLabel>
          </Button>
          <Input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.hendleInput}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarHeader>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
