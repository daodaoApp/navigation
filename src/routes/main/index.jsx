import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../../components/header';
import NavList from '../../components/navList';
import navListDataSource from '../../../config';

export default class MainPage extends React.Component {
static propTypes = {}

static initDataSource() {
  const initDataSource = navListDataSource.map((dataSourceItem) => {
    dataSourceItem.priority = 0;
    return dataSourceItem;
  });
  return initDataSource;
}

constructor(props) {
  super(props);
  this.state = {
    searchValue: '',
    dataSource: navListDataSource,
    target: { link: 'https://www.baidu.com' },
  };
  this.onSearchValueChange = this.onSearchValueChange.bind(this);
  this.onSearch = this.onSearch.bind(this);
  this.handleEnterJump = this.handleEnterJump.bind(this);
  this.filterDataSource = this.filterDataSource.bind(this);
}


componentDidMount() {
  window.addEventListener('keydown', this.handleEnterJump);
}


onSearch() {
  return true;
}

onSearchValueChange(value) {
  this.setState({ searchValue: value }, () => this.filterDataSource());
}

filterDataSource() {
  const { searchValue, dataSource } = this.state;
  const weightDataSource = dataSource.map((dataSourceItem) => {
    const match = dataSourceItem.title.match(searchValue);
    if (match) { dataSourceItem.weight = 1; } else { dataSourceItem.weight = -1; }
    return dataSourceItem;
  });
  this.setState({ dataSource: weightDataSource });
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
      <NavList dataSource={dataSource} searchValue={searchValue} />
    </React.Fragment>
  );
}
}
