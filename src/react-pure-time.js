import React, { Component, PropTypes } from 'react';
import dateformat from './format.js';

const localTimezoneOffset = (new Date()).getTimezoneOffset() * 60 * 1000;

class Time extends Component {
  normalizeValue(value) {
    const milliseconds = new RegExp(/^[0-9]{0,13}$/);
    switch (true) {
      case milliseconds.test(value): // check if milliseconds
        return new Date(value - localTimezoneOffset);
      default:
        return value;
    }
    // check if mysql
    // check if simple string
  }

  render() {
    const { value, format, ifEmpty, className } = this.props;
    return (
      <span className={className}>
        {value ? dateformat(this.normalizeValue(value), format) : ifEmpty}
      </span>
    );
  }
}

Time.defaultProps = {
  ifEmpty: '—',
  format: 'd.m.Y H:i',
};


Time.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  ifEmpty: PropTypes.string,
  format: PropTypes.string,
};

export default Time;
