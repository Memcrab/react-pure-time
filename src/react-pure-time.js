import React, { Component, PropTypes } from 'react';
import dateformat from './format.js';

class Time extends Component {
  isDate(value) {
    const testDate = new Date(value);
    if (Object.prototype.toString.call(testDate) !== '[object Date]') return false;
    return !isNaN(testDate.getTime());
  }

  render() {
    const {
      value,
      format,
      placeholder,
      className,
      utc,
    } = this.props;
    return (
      <span className={className}>
        {
          this.isDate(value) ?
          dateformat(new Date(value), format, utc) :
          placeholder
        }
      </span>
    );
  }
}

Time.defaultProps = {
  placeholder: '—',
  format: 'd.m.Y H:i',
  utc: false,
};


Time.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  placeholder: PropTypes.string,
  utc: PropTypes.bool,
  format: PropTypes.string,
};

export const format = dateformat;
export default Time;
