import React from 'react';
import PropTypes from 'prop-types';
import NavListItem from './NavListItem';
import './NavList.css';

export default class NavList extends React.Component {
static propTypes = {
  dataSource: PropTypes.array,
  noContentDesc: PropTypes.string,
}

constructor(props) {
  super(props);
  this.state = {};
  this.renderNavList = this.renderNavList.bind(this);
  this.renderNoContent = this.renderNoContent.bind(this);
}


renderNavList() {
  const { dataSource } = this.props;
  if (dataSource.length < 1) { return this.renderNoContent(); }
  const filterDataSource = dataSource.map(item => item).filter(dataSourceItem => dataSourceItem.payload.length > 0);
  // const filterDataSourceByNavItem = filterDataSource.map((dataSourceItem) => {
  //   const { payload } = dataSourceItem;
  //   dataSourceItem.payload = payload.map(item => item).filter(payloadItem => payloadItem.priority >= 0);
  //   return dataSourceItem;
  // });
  return filterDataSource.map(dataSourceItem => <NavListItem navList={dataSourceItem} key={dataSourceItem.title} />);
}

renderNoContent() {
  const { noContentDesc } = this.props;
  return <div className="nav_list_blank">{noContentDesc}</div>;
}

render() {
  return (
    <div className="nav_list">
      {this.renderNavList()}
    </div>
  );
}
}
NavList.defaultProps = {
  dataSource: [],
  noContentDesc: 'No Content',
};
