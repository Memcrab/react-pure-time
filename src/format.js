// @flow
// based on phpjs date format library
type valueType = Date | number | string;
export default function date(value: valueType, format: string, utc: boolean = false): string {
  const jsdate: Date = new Date(value);

  const txtWords: string[] = [
    'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  let f = {};
  const formatChr: RegExp = /\\?(.?)/gi;

  const formatChrCb = (t: string, s: string): string => {
    if (f[t]) return f[t]();
    return s;
  };

  const zeroPad = (n: number, c: number): string => {
    let newN: string = String(n);
    while (newN.length < c) {
      newN = `0${newN}`;
    }
    return newN;
  };

  f = {
    // Day
    d(): string {
      // Day of month w/leading 0; 01..31
      return zeroPad(f.j(), 2);
    },
    D(): string {
      // Shorthand day name; Mon...Sun
      return f.l()
        .slice(0, 3);
    },
    j(): number {
      // Day of month; 1..31
      if (utc) return jsdate.getUTCDate();
      return jsdate.getDate();
    },
    l(): string {
      // Full day name; Monday...Sunday
      return `${txtWords[f.w()]}day`;
    },
    N(): number {
      // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S(): string {
      // Ordinal suffix for day of month; st, nd, rd, th
      const j: number = f.j();
      let i: number = j % 10;
      if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
        i = 0;
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th';
    },
    w(): number {
      // Day of week; 0[Sun]..6[Sat]
      if (utc) return jsdate.getUTCDay();
      return jsdate.getDay();
    },
    z(): number {
      // Day of year; 0..365
      const a: Date = new Date(f.Y(), f.n() - 1, f.j());
      const b: Date = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W(): string {
      // ISO-8601 week number
      const a: Date = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
      let b: Date;
      if (utc) {
        b = new Date(a.getUTCFullYear(), 0, 4);
      } else {
        b = new Date(a.getFullYear(), 0, 4);
      }
      return zeroPad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F(): string {
      // Full month name; January...December
      return txtWords[6 + f.n()];
    },
    m(): string {
      // Month w/leading 0; 01...12
      return zeroPad(f.n(), 2);
    },
    M(): string {
      // Shorthand month name; Jan...Dec
      return f.F()
        .slice(0, 3);
    },
    n(): number {
      // Month; 1...12
      if (utc) return jsdate.getMonth() + 1;
      return jsdate.getUTCMonth() + 1;
    },
    t(): number {
      // Days in month; 28...31
      if (utc) return (new Date(f.Y(), f.n(), 0)).getUTCDate();
      return (new Date(f.Y(), f.n(), 0)).getDate();
    },

    // Year
    L(): number {
      // Is leap year?; 0 or 1
      const j: number = f.Y();
      return (j % 4 === 0 && j % 100 !== 0 || j % 400 === 0) ? 1 : 0;
    },
    o(): number {
      // ISO-8601 year
      const n: number = f.n();
      const W: number = parseInt(f.W(), 10);
      const Y: number = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y(): number {
      // Full year; e.g. 1980...2010
      if (utc) return jsdate.getUTCFullYear();
      return jsdate.getFullYear();
    },
    y(): string {
      // Last two digits of year; 00...99
      return f.Y().toString().slice(-2);
    },

    // Time
    a(): string {
      // am or pm
      if (utc) return jsdate.getHours() > 11 ? 'pm' : 'am';
      return jsdate.getUTCHours() > 11 ? 'pm' : 'am';
    },
    A(): string {
      // AM or PM
      return f.a()
        .toUpperCase();
    },
    B(): string {
      // Swatch Internet time; 000..999
      const H: number = jsdate.getUTCHours() * 36e2;
      // Hours
      const i: number = jsdate.getUTCMinutes() * 60;
      // Minutes
      // Seconds
      const s: number = jsdate.getUTCSeconds();
      return zeroPad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g(): number {
      // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G(): number {
      // 24-Hours; 0..23
      if (utc) return jsdate.getUTCHours();
      return jsdate.getHours();
    },
    h(): string {
      // 12-Hours w/leading 0; 01..12
      return zeroPad(f.g(), 2);
    },
    H(): string {
      // 24-Hours w/leading 0; 00..23
      return zeroPad(f.G(), 2);
    },
    i(): string {
      // Minutes w/leading 0; 00..59
      if (utc) return zeroPad(jsdate.getUTCMinutes(), 2);
      return zeroPad(jsdate.getMinutes(), 2);
    },
    s(): string {
      // Seconds w/leading 0; 00..59
      if (utc) return zeroPad(jsdate.getUTCSeconds(), 2);
      return zeroPad(jsdate.getSeconds(), 2);
    },
    u(): string {
      // Microseconds; 000000-999000
      if (utc) return zeroPad(jsdate.getUTCMilliseconds() * 1000, 6);
      return zeroPad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e(): Error {
      // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      /*              return that.date_default_timezone_get();
       */
      throw new Error(`Not supported
        (see source code of date() for timezone on how to add support)`);
    },
    I(): number {
      // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      const a: Date = new Date(f.Y(), 0);
      // Jan 1
      const c: number = Date.UTC(f.Y(), 0);
      // Jan 1 UTC
      const b: Date = new Date(f.Y(), 6);
      // Jul 1
      // Jul 1 UTC
      const d: number = Date.UTC(f.Y(), 6);
      return (a - c) !== (b - d) ? 1 : 0;
    },
    O(): string {
      // Difference to GMT in hour format; e.g. +0200
      const tzo: number = jsdate.getTimezoneOffset();
      const a: number = Math.abs(tzo);
      return (tzo > 0 ? '-' : '+') + zeroPad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P(): string {
      // Difference to GMT w/colon; e.g. +02:00
      const O: string = f.O();
      return `${O.substr(0, 3)}:${O.substr(3, 2)}`;
    },
    T(): string {
      if (utc) return 'UTC';
      return 'LOCAL';
    },
    Z(): number {
      // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c(): string {
      // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r(): string {
      // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U(): number {
      // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    },
  };

  return format.replace(formatChr, formatChrCb);
}
