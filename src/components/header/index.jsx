import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

/**
 * Created By ChrisWen
 *  2018/12/29
 *  @prop {string} value --- input输入框的值
 *  @prop {bool} autoFocus --- input是否自动获得焦点
 *  @prop { (value) => void } onChange --- input值发生变化的回调
 *  @prop {any} slogan --- header的标题
 */

export default class HeaderComponent extends React.Component {
static propTypes = {
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  slogan: PropTypes.any,
}

constructor(props) {
  super(props);
  this.state = {};
  this.input = React.createContext();
  this.onFocus = this.onFocus.bind(this);
  this.onChange = this.onChange.bind(this);
}


componentDidMount() {
  const { autoFocus } = this.props;
  if (autoFocus) { this.onFocus(); }
}

onFocus() {
  this.input.current.focus();
}

onChange(e) {
  const { target: { value } } = e;
  return this.props.onChange(value);
}

render() {
  const { value, slogan } = this.props;
  return (
    <header>
      <div className="header_content">
        <div className="header_slogan">
          {slogan}
        </div>

        <div className="header_search">
          <input
            type="text"
            value={value}
            onChange={this.onChange}
            ref={this.input}
          />
        </div>
      </div>
    </header>
  );
}
}
HeaderComponent.defaultProps = {
  value: '',
  autoFocus: true,
  onChange: f => f,
  slogan: '',
};
