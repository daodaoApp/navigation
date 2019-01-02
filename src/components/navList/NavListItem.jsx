import React from 'react';
import PropTypes from 'prop-types';
import './NavListItem.css';

const priorityMap = {
  3: 'super',
  0: 'normal',
  2: 'high',
};

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
  const { navList: { payload, title } } = this.props;
  const filterPayLoad = payload.filter(payloadItem => payloadItem.priority >= 0);
  if (filterPayLoad.length === 0) { return null; }
  const navListItem = filterPayLoad.map((payloadItem) => {
    const { url, text, priority } = payloadItem;
    return <a href={url} className={priorityMap[priority]} target="_blank" key={url} rel="noopener noreferrer">{text}</a>;
  });
  return (
    <div className="nav_list_item">
      <h3>{title}</h3>
      <div className="nav_list_item_content">
        {navListItem}
      </div>
    </div>
  );
}


render() {
  return this.renderNavList();
}
}
NavListItem.defaultProps = {
  navList: { title: '前端开发', payload: [{ text: '百度', url: 'https://www.baidu.com', proority: 0 }] },
};
