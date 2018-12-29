import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../../components/header';

export default class MainPage extends React.Component {
static propTypes = {}

constructor(props) {
  super(props);
  this.state = {};
}

render() {
  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
}
}
MainPage.defaultProps = {};
