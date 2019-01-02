import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../../components/header';
import NavList from '../../components/navList';
import navListDataSource from '../../../_config';

export default class MainPage extends React.Component {
static propTypes = {}


constructor(props) {
  super(props);
  this.state = {
    searchValue: '',
    dataSource: navListDataSource,
    target: { link: 'https://www.baidu.com' },
  };
  this.onSearchValueChange = this.onSearchValueChange.bind(this);
  // this.onSearch = this.onSearch.bind(this);
  this.handleEnterJump = this.handleEnterJump.bind(this);
  this.filterDataSource = this.filterDataSource.bind(this);
  this.filerNavItem = this.filerNavItem.bind(this);
  this.calNavItemWeight = this.calNavItemWeight.bind(this);
  this.storeMatchest = this.storeMatchest.bind(this);
  this.initMatchest = this.initMatchest.bind(this);

  this.matchestNav = {};
  this.initMatchest();
}


componentDidMount() {
  window.addEventListener('keydown', this.handleEnterJump);
}


// onSearch() {
//   return true;
// }

onSearchValueChange(value) {
  this.setState({ searchValue: value }, () => this.filterDataSource());
}

filterDataSource() {
  const { searchValue, dataSource } = this.state;
  const weightDataSource = dataSource.map((dataSourceItem) => {
    const match = dataSourceItem.title.toLowerCase().match(searchValue.toLowerCase());
    if (match) { dataSourceItem.weight = 1; } else { dataSourceItem.weight = -1; }
    dataSourceItem.payload = this.filerNavItem(dataSourceItem);
    return dataSourceItem;
  });
  this.setState({ dataSource: weightDataSource });
}

filerNavItem(navListItem) {
  const { weight: titleWeight, payload } = navListItem;
  const filterPayload = payload.map((navItem) => {
    const weight = this.calNavItemWeight(navItem, titleWeight);
    navItem.priority = weight;
    this.storeMatchest(navItem);
    return navItem;
  });
  return filterPayload;
}

calNavItemWeight(navItem, titleWeight) {
  const { searchValue } = this.state;
  const itemTitle = navItem.text.toLowerCase();
  const matchValue = searchValue.toLowerCase();
  let navItemWeight = 0;
  if (titleWeight < 0 && (!itemTitle.match(matchValue))) { navItemWeight = -2; }
  if (titleWeight < 0 && (itemTitle.match(matchValue))) { navItemWeight = 2; }
  if (titleWeight > 0 && (!itemTitle.match(matchValue))) { navItemWeight = 0; }
  if (titleWeight > 0 && (itemTitle.match(matchValue))) { navItemWeight = 3; }
  if (!searchValue) { navItemWeight = 0; }
  return navItemWeight;
}

storeMatchest(navItem) {
  const { priority: navItemWeight } = navItem;
  const { priority: matchestWeight } = this.matchestNav;
  const { searchValue } = this.state;
  if (navItemWeight > matchestWeight) {
    this.matchestNav = navItem;
    this.storeJumplink();
  }
  if (!searchValue) {
    this.initMatchest();
    this.storeJumplink();
  }
}

storeJumplink() {
  const { url } = this.matchestNav;
  this.setState({ target: { link: url } });
}

initMatchest() {
  const [init] = navListDataSource;
  const { payload } = init;
  const _initMatchest = payload[0];
  this.matchestNav = _initMatchest;
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
  console.log(this.matchestNav);
  return (
    <React.Fragment>
      <Header slogan="DFG-内网导航" value={searchValue} onChange={this.onSearchValueChange} autoFoucs />
      <NavList dataSource={dataSource} searchValue={searchValue} />
    </React.Fragment>
  );
}
}
