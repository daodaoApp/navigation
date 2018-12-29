import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../../components/header';

export default class MainPage extends React.Component {
static propTypes = {}

constructor(props) {
  super(props);
  this.state = {
    searchValue: '',
  };
  this.onSearchValueChange = this.onSearchValueChange.bind(this);
  this.onSearch = this.onSearch.bind(this);
}

onSearchValueChange(value) {
  this.setState({ searchValue: value });
}

onSearch() {}

render() {
  const { searchValue } = this.state;
  return (
    <React.Fragment>
      <Header slogan="DFG-内网导航" value={searchValue} onChange={this.onSearchValueChange} autoFoucs />
    </React.Fragment>
  );
}
}
MainPage.defaultProps = {};
