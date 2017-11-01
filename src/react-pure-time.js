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
    this.runSelfAdjustingTimer = this.runSelfAdjustingTimer.bind(this);
    this.state = {
      relativeTime: '',
    };
    this.timer = null;
    this.expectedTimerDiff = Date.now() + 1000;
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

  getRelativeTimeDiff(value) {
    const date = value;
    const now = new Date();

    const dateMs = date.getTime();
    const nowMs = now.getTime();

    const ms = nowMs - dateMs;
    if (ms < 0) {
      console.warn('Your date from future!');
      return false;
    }

    const years = now.getFullYear() - date.getFullYear();

    return {
      ms,
      seconds: Math.floor(ms / msAmountIn.second),
      minutes: Math.floor(ms / msAmountIn.minute),
      hours: Math.floor(ms / msAmountIn.hour),
      days: Math.floor(ms / msAmountIn.day),
      months: years * 12 + now.getMonth() - date.getMonth(),
      years,
    };
  }

  bestFit(diff) {
    switch (true) {
      case diff.years > 0 && diff.months > 11:
        return 'year';
      case diff.months > 0 && diff.days > 27:
        return 'month';
      case diff.weeks > 0 && diff.days > 6:
        return 'week';
      case diff.days > 0 && diff.hours > 23:
        return 'day';
      case diff.hours > 0 && diff.minutes > 59:
        return 'hour';
      case diff.minutes > 0 && diff.seconds > 59:
        return 'minute';
      default:
        return 'second';
    }
  }

  updateRelativeTime(value, unit) {
    const diff = this.getRelativeTimeDiff(value);
    if (!diff) return;

    const finalUnit = unit || this.bestFit(diff);
    let time = diff[`${finalUnit}s`];

    if (finalUnit === 'second') {
      let normTime = 45;
      if (time < 20) normTime = 20;
      if (time < 5) normTime = 5;
      time = normTime;
    }

    this.setState({
      relativeTime: this.getRelativeTimeString(time, finalUnit),
    });
  }

  runSelfAdjustingTimer(fn) {
    this.timer = setTimeout(function step() {
      if (this.timer) window.clearTimeout(this.timer);
      const dt = Date.now() - this.expectedTimerDiff;
      this.expectedTimerDiff += 1000;
      fn();
      this.timer = setTimeout(step, Math.max(0, 1000 - dt) + 10);
    }, 10);
  }

  checkForRelativeTimeProps(props) {
    if (props.relativeTime) {
      this.runSelfAdjustingTimer(
        () => this.updateRelativeTime(props.value, props.unit)
      );
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
