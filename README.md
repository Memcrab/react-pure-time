# react-pure-time
React component which convert js date object, milliseconds to human readable format

## Features
- very small
- UTC support
- no external dependencies

## Usage

```javascript
import Time from 'react-pure-time';
<Time value="1990-06-16 13:22:17" format="d.m.Y H:i:s" />
```

## Options
#### value: [string, number, instanceOf(Date)]
Date object, milliseconds or string

#### format: string
`Default: 'd.m.Y H:i'`

php standart time/date formatting. [PHP date format manual](http://php.net/manual/en/function.date.php)
#### utc: bool
`Default: false`

Show in UTC timezone
#### placeholder: string
`Default: —`

Shows when date is incorrect or empty
#### className: string
Just a wrapper class

## Can be used with values

| Value | Format | Time component | with `utc` flag |
| --- | --- | --- | --- |
| Empty value | — | <span>—</span> | <span>—</span> |
| Empty value with placeholder | — | <span>no time defined</span> | <span>no time defined</span> |
| 1261322332312 | H:i:s | <span>17:18:52</span> | <span>15:18:52</span> |
| new Date(1261322332312) | d.m.Y H:i:s | <span>20.12.2009 17:18:52</span> | <span>20.12.2009 15:18:52</span> |
| new Date() | d.m.Y H:i:s | <span>08.05.2016 16:22:23</span> | <span>08.05.2016 13:22:23</span> |
| 1990-06-16 13:22:17 | d.m.Y H:i:s | <span>16.06.1990 13:22:17</span> | <span>16.06.1990 10:22:17</span> |
| September 2, 2003, 2:26 am | d.m.Y H:i:s | <span>02.09.2003 02:26:00</span> | <span>01.09.2003 23:26:00</span> |
| 2003 36 2003 | d.m.Y H:i:s | <span>—</span> | <span>—</span> |