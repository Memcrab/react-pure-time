import React, { Component, PropTypes } from 'react';
import dateformat from './format.js';

const msAmountIn = {
  second: 1e3,
  minute: 6e4,
  hour: 36e5,
  day: 864e5,
};

class Time extends Component {
  constructor(props) {
    super(props);
    this.updateRelativeTime = this.updateRelativeTime.bind(this);
    this.getRelativeTimeDiff = this.getRelativeTimeDiff.bind(this);
    this.getRelativeTimeString = this.getRelativeTimeString.bind(this);
    this.state = {
      relativeTime: {
        value: null,
        string: '',
      },
    };
    this.timer = null;
  }

  componentWillMount() {
    this.checkForRelativeTimeProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkForRelativeTimeProps(nextProps);
  }

  getRelativeTimeString(time, unit) {
    if (unit === 'second' && time === 0) return 'just now';
    if (unit === 'year' && time === 0) return 'this year';
    if (unit === 'year' && time === 1) return 'last year';

    return `${time} ${time % 100 === 1 || time % 10 === 1 ? `${unit}` : `${unit}s`} ago`;
  }

  getRelativeTimeDiff(value, utc = false) {
    const date = value;
    const now = new Date();

    const dateMs = utc ? this.convertToUTC(date) : date.getTime();
    const nowMs = utc ? this.convertToUTC(now) : now.getTime();

    const ms = nowMs - dateMs;
    if (ms < 0) {
      console.warn('Your date from future!');
      return false;
    }

    const getMonth = utc ? 'getUTCMonth' : 'getMonth';
    const getYear = utc ? 'getUTCFullYear' : 'getFullYear';

    const years = now[getYear]() - date[getYear]();
    const round = Math[ms > 0 ? 'floor' : 'ceil'];

    return {
      ms,
      seconds: round(ms / msAmountIn.second),
      minutes: round(ms / msAmountIn.minute),
      hours: round(ms / msAmountIn.hour),
      days: round(ms / msAmountIn.day),
      months: years * 12 + now[getMonth]() - date[getMonth](),
      years,
    };
  }

  bestFit(diff) {
    switch (true) {
      case diff.years > 0:
        return 'year';
      case diff.months > 0:
        return 'month';
      case diff.weeks > 0:
        return 'week';
      case diff.days > 0:
        return 'day';
      case diff.hours > 0:
        return 'hour';
      case diff.minutes > 0:
        return 'minute';
      default:
        return 'second';
    }
  }

  convertToUTC(value) {
    return Date.UTC(
      value.getFullYear(),
      value.getMonth(),
      value.getDay(),
      value.getHours(),
      value.getMinutes(),
      value.getSeconds(),
      value.getMilliseconds()
    );
  }

  updateRelativeTime(value, utc, unit) {
    if (this.timer) window.clearTimeout(this.timer);

    const diff = this.getRelativeTimeDiff(value, utc);
    if (!diff) return;

    const finalUnit = unit || this.bestFit(diff);
    let time = diff[`${finalUnit}s`];

    if (finalUnit === 'second') {
      switch (true) {
        case time < 45:
          time = 45;
          break;
        case time < 20:
          time = 20;
          break;
        case time < 5:
          time = 5;
          break;
        default:
          time = 45;
      }
    }

    this.setState({
      relativeTime: {
        value: time,
        string: this.getRelativeTimeString(time, finalUnit),
      },
    });

    if (finalUnit !== 'year' || finalUnit !== 'month' || finalUnit !== 'week') {
      this.timer = setTimeout(
        () => this.updateRelativeTime(value, utc, unit),
        msAmountIn[finalUnit] + 100
      );
    }
  }

  checkForRelativeTimeProps(props) {
    if (props.relativeTime) {
      this.updateRelativeTime(props.value, props.utc, props.unit);
    }
  }

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
      relativeTime,
    } = this.props;
    return (
      <span className={className}>
        {
          this.isDate(value) ?
          (
            relativeTime ? this.state.relativeTime.string : dateformat(new Date(value), format, utc)
          ) : placeholder
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
  relativeTime: PropTypes.bool,
  unit: PropTypes.string,
};

export const format = dateformat;
export default Time;
