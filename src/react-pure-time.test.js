/* global describe expect it */
import React from 'react';
import { shallow } from 'enzyme';
import Time from './react-pure-time.js';

describe('Time component behavior', () => {
  it('Renders default placeholder with empty props', () => {
    const TimeComponent = shallow(<Time />);
    expect(TimeComponent.text()).toEqual('—');
  });

  it('Renders default placeholder with UTC flag', () => {
    const TimeComponent = shallow(<Time utc />);
    expect(TimeComponent.text()).toEqual('—');
  });

  it('Renders custom placeholder with empty value', () => {
    const TimeComponent = shallow(
      <Time placeholder="no time defined" />
    );
    expect(TimeComponent.text()).toEqual('no time defined');
  });

  it('Renders custom placeholder with UTC flag', () => {
    const TimeComponent = shallow(
      <Time placeholder="no time defined" utc />
    );
    expect(TimeComponent.text()).toEqual('no time defined');
  });

  it('Renders date value with default format', () => {
    const TimeComponent = shallow(
      <Time value={1261322332312} />
    );
    expect(TimeComponent.text()).toEqual('20.12.2009 17:18');
  });

  it('Renders date value with custom format H:i:s', () => {
    const TimeComponent = shallow(
      <Time value={1261322332312} format="H:i:s" />
    );
    expect(TimeComponent.text()).toEqual('17:18:52');
  });

  it('Renders date value with custom format H:i:s and UTC flag', () => {
    const TimeComponent = shallow(
      <Time value={1261322332312} format="H:i:s" utc />
    );
    expect(TimeComponent.text()).toEqual('15:18:52');
  });

  it('Renders right with milliseconds value', () => {
    const TimeComponent = shallow(
      <Time value={1261322332312} format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.text()).toEqual('20.12.2009 17:18:52');
  });

  it('Renders right with milliseconds value and UTC', () => {
    const TimeComponent = shallow(
      <Time value={1261322332312} format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.text()).toEqual('20.12.2009 15:18:52');
  });

  it('Renders right with object value', () => {
    const TimeComponent = shallow(
      <Time value={new Date(1261322332312)} format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.text()).toEqual('20.12.2009 17:18:52');
  });

  it('Renders right with object value and UTC', () => {
    const TimeComponent = shallow(
      <Time value={new Date(1261322332312)} format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.text()).toEqual('20.12.2009 15:18:52');
  });

  it('Renders right with string 1990-06-16 13:22:17', () => {
    const TimeComponent = shallow(
      <Time value="1990-06-16 13:22:17" format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.text()).toEqual('16.06.1990 13:22:17');
  });

  it('Renders right with string "1990-06-16 13:22:17" and UTC', () => {
    const TimeComponent = shallow(
      <Time value="1990-06-16 13:22:17" format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.text()).toEqual('16.06.1990 10:22:17');
  });

  it('Renders right with string "September 2, 2003, 2:26 am"', () => {
    const TimeComponent = shallow(
      <Time value="September 2, 2003, 2:26 am" format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.text()).toEqual('02.09.2003 02:26:00');
  });

  it('Renders right with string "September 2, 2003, 2:26 am" and UTC', () => {
    const TimeComponent = shallow(
      <Time value="September 2, 2003, 2:26 am" format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.text()).toEqual('01.09.2003 23:26:00');
  });

  it('Checks value and renders placeholder if its invalid', () => {
    const TimeComponent = shallow(
      <Time value="2003 36 2003" />
    );
    expect(TimeComponent.text()).toEqual('—');
  });

  it('Checks value and renders placeholder if its invalid with UTC', () => {
    const TimeComponent = shallow(
      <Time value="2003 36 2003" utc />
    );
    expect(TimeComponent.text()).toEqual('—');
  });

  it('Checks value and renders custom placeholder if its invalid', () => {
  });

  it('Applies custom styles', () => {
    const TimeComponent = shallow(
      <Time className="customName" />
    );
    expect(TimeComponent.find('.customName')).toHaveLength(1);
  });
});
