import React from 'react';
import PropTypes from 'prop-types';

export default class NavListItem extends React.Component {
static propTypes = {
  navList: PropTypes.object,
}

static renderNavListItem(payloadItem) {
  const { url, text } = payloadItem;
  console.log(url, text);
}

constructor(props) {
  super(props);
  this.state = {};
  this.renderNavList = this.renderNavList.bind(this);
}

renderNavList() {
  const { navList: { payload } } = this.props;
  const filterPayLoad = payload.filter(payloadItem => payloadItem.priority >= 0);
  const navListItem = filterPayLoad.map((payloadItem) => {
    const { url, text } = payloadItem;

    return <a href={url} target="_blank" key={url} rel="noopener noreferrer">{text}</a>;
  });
  return navListItem;
  // console.log(navListItem);
}


render() {
  const { navList: { title } } = this.props;
  return (
    <div className="nav_list_item">
      {title}
      <div className="nav_list_item_content">
        {this.renderNavList()}
      </div>
    </div>
  );
}
}
NavListItem.defaultProps = {
  navList: { title: '前端开发', payload: [{ text: '百度', url: 'https://www.baidu.com', proority: 0 }] },
};
