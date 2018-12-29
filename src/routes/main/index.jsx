import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../../components/header';
import NavList from '../../components/navList';

export default class MainPage extends React.Component {
static propTypes = {}

static filterDataSource(dataSource) {
  return dataSource;
}

constructor(props) {
  super(props);
  this.state = {
    searchValue: '',
    dataSource: [],
    target: {
      link: 'https://www.baidu.com',
    },
  };
  this.onSearchValueChange = this.onSearchValueChange.bind(this);
  this.onSearch = this.onSearch.bind(this);
  this.handleEnterJump = this.handleEnterJump.bind(this);
}


componentDidMount() {
  this.enterJump = window.addEventListener('keydown', this.handleEnterJump);
}

componentWillUnmount() {

}


onSearch() {
  const { searchValue } = this.state;
  console.log(searchValue);
}

onSearchValueChange(value) {
  this.setState({ searchValue: value });
}


handleEnterJump(e) {
  const { key } = e;
  if (key === 'Enter') {
    const { target: { link } } = this.state;
    window.open(link);
  }
  return false;
}


render() {
  const { searchValue, dataSource } = this.state;
  return (
    <React.Fragment>
      <Header slogan="DFG-内网导航" value={searchValue} onChange={this.onSearchValueChange} autoFoucs />
      <NavList dataSource={dataSource} />
    </React.Fragment>
  );
}
}
MainPage.defaultProps = {};
