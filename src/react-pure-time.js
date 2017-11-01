import React, { Component, PropTypes } from 'react';
import dateformat from './format.js';

const msAmountIn = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
};

class Time extends Component {
  constructor(props) {
    super(props);
    this.updateRelativeTime = this.updateRelativeTime.bind(this);
    this.checkForRelativeTimeProps = this.checkForRelativeTimeProps.bind(this);
    this.state = {
      relativeTime: '',
    };
    this.interval = null;
  }

  componentWillMount() {
    this.checkForRelativeTimeProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkForRelativeTimeProps(nextProps);
  }

  getRelativeTimeString(time, absTime, unit, isFuture) {
    const unitDecl = absTime % 100 === 1 || absTime % 10 === 1 ? unit : `${unit}s`;

    if (unit === 'second' && time === 0) return 'just now';
    if (unit === 'year' && time === 0) return 'this year';
    if (unit === 'year' && time === 1) return 'last year';

    return `${isFuture ? 'will come in' : ''} ${absTime} ${unitDecl} ${isFuture ? '' : 'ago'}`;
  }

  getRelativeTimeDiff(value) {
    const date = value;
    const now = new Date();

    const dateMs = date.getTime();
    const nowMs = now.getTime();

    const ms = nowMs - dateMs;

    const years = now.getFullYear() - date.getFullYear();

    return {
      ms,
      seconds: Math.floor(ms / msAmountIn.second),
      minutes: Math.floor(ms / msAmountIn.minute),
      hours: Math.floor(ms / msAmountIn.hour),
      days: Math.floor(ms / msAmountIn.day),
      weeks: Math.floor(ms / msAmountIn.week),
      months: years * 12 + now.getMonth() - date.getMonth(),
      years,
    };
  }

  bestFit(diff) {
    const seconds = Math.abs(diff.seconds);
    const minutes = Math.abs(diff.minutes);
    const hours = Math.abs(diff.hours);
    const days = Math.abs(diff.days);
    const weeks = Math.abs(diff.weeks);
    const months = Math.abs(diff.months);
    const years = Math.abs(diff.years);

    switch (true) {
      case years > 0 && months > 11:
        return 'year';
      case months > 0 && days > 27:
        return 'month';
      case weeks > 0 && days > 6:
        return 'week';
      case days > 0 && hours > 23:
        return 'day';
      case hours > 0 && minutes > 59:
        return 'hour';
      case minutes > 0 && seconds > 59:
        return 'minute';
      default:
        return 'second';
    }
  }

  updateRelativeTime(value, unit) {
    const diff = this.getRelativeTimeDiff(value);

    const finalUnit = unit || this.bestFit(diff);
    let time = diff[`${finalUnit}s`];
    let absTime = Math.abs(time);
    const isFuture = time < 0;

    if (finalUnit === 'second') {
      let normTime = 45;
      if (absTime < 45) normTime = 20;
      if (absTime < 20) normTime = 5;
      if (absTime < 5) normTime = 0;
      if (absTime === 0) normTime = 0;
      time = isFuture ? -(normTime) : normTime;
      absTime = Math.abs(time);
    }

    this.setState({
      relativeTime: this.getRelativeTimeString(time, absTime, finalUnit, isFuture),
    });
  }

  checkForRelativeTimeProps(props) {
    if (props.relativeTime && this.isDate(props.value)) {
      if (this.interval) window.clearInterval(this.interval);
      this.interval = setInterval(
        () => this.updateRelativeTime(new Date(props.value), props.unit)
      , 100);
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
            relativeTime ? this.state.relativeTime : dateformat(new Date(value), format, utc)
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
