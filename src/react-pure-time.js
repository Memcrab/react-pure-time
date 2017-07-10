// @flow
import React, { Component } from 'react';
import dateformat from './format.js';

class Time extends Component {
  static defaultProps = {
    placeholder: '—',
    format: 'd.m.Y H:i',
    utc: false,
  }

  props: {
    className: string,
    value: string | number | Date,
    placeholder: string,
    utc: boolean,
    format: string,
  }

  isDate(value: string | number | Date): boolean {
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

export const format = dateformat;
export default Time;
