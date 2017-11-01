// @flow
import React, { Component } from 'react';
import dateformat from './format.js';
import type {
  Props,
  State,
  Diff,
} from './types.js';

const msAmountIn = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
};

class Time extends Component<Props, State> {
  static defaultProps = {
    placeholder: '—',
    format: 'd.m.Y H:i',
    utc: false,
  }

  constructor(props: Props) {
    super(props);
    this.updateRelativeTime = this.updateRelativeTime.bind(this);
    this.checkForRelativeTimeProps = this.checkForRelativeTimeProps.bind(this);
    this.state = {
      relativeTime: '',
    };
    this.interval = null;
    this.currentUnit = '';
  }

  interval: ?number;
  currentUnit: string;

  componentWillMount() {
    this.checkForRelativeTimeProps(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.checkForRelativeTimeProps(nextProps);
  }

  getRelativeTimeString(time: number, absTime: number, unit: string, isFuture: boolean): string {
    const unitDecl = absTime % 100 === 1 || absTime % 10 === 1 ? unit : `${unit}s`;

    if (unit === 'second' && time === 0) return 'just now';
    if (unit === 'year' && time === 0) return 'this year';
    if (unit === 'year' && time === 1) return 'last year';

    return `${isFuture ? 'will come in' : ''} ${absTime} ${unitDecl} ${isFuture ? '' : 'ago'}`;
  }

  getRelativeTimeDiff(value: Date): Diff {
    const date = value;
    const now = new Date();

    const dateMs = date.getTime();
    const nowMs = now.getTime();

    const ms = nowMs - dateMs;

    const years = now.getFullYear() - date.getFullYear();
    const round = Math[ms > 0 ? 'floor' : 'ceil'];

    return {
      ms,
      seconds: round(ms / msAmountIn.second),
      minutes: round(ms / msAmountIn.minute),
      hours: round(ms / msAmountIn.hour),
      days: round(ms / msAmountIn.day),
      weeks: round(ms / msAmountIn.week),
      months: years * 12 + now.getMonth() - date.getMonth(),
      years,
    };
  }

  getInterval() {
    if (!this.currentUnit.length) return 10;
    if (!msAmountIn[this.currentUnit]) return msAmountIn.week;
    return msAmountIn[this.currentUnit];
  }

  checkForRelativeTimeProps: Function;
  checkForRelativeTimeProps(props: Props): void {
    if (props.relativeTime && this.isDate(props.value)) {
      const date = new Date(props.value);
      this.updateRelativeTime(date, props.unit);

      if (this.interval) window.clearInterval(this.interval);
      this.interval = setInterval(
          () => this.updateRelativeTime(date, props.unit)
      , this.getInterval());
    }
  }

  updateRelativeTime: Function;
  updateRelativeTime(date: Date, unit: string): boolean {
    const diff = this.getRelativeTimeDiff(date);

    const prevUnit = this.currentUnit;
    this.currentUnit = unit || this.bestFit(diff);
    if (this.currentUnit !== prevUnit) {
      this.checkForRelativeTimeProps(this.props);
      return false;
    }

    let time = diff[`${this.currentUnit}s`];
    let absTime = Math.abs(time);
    const isFuture = time < 0;

    if (this.currentUnit === 'second') {
      let normTime = 45;
      if (absTime < 45) normTime = 20;
      if (absTime < 20) normTime = 5;
      if (absTime < 5) normTime = 0;
      if (absTime === 0) normTime = 0;
      time = isFuture ? -(normTime) : normTime;
      absTime = Math.abs(time);
    }

    this.setState({
      relativeTime: this.getRelativeTimeString(time, absTime, this.currentUnit, isFuture),
    });
    return true;
  }

  bestFit(diff: Diff): string {
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

export const format = dateformat;
export default Time;
