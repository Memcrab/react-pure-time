/**
 * @jest-environment jsdom
 */

import * as React from "react";
import * as renderer from "react-test-renderer";
import Time from "../src/react-pure-time";

import {
  mockedStringHour,
  mockedStringMinutes,
} from "./helpers/data-mocked.const";

jest.setTimeout(100000);
describe("test async behavior of the Time component", () => {
  it("Render Time component with relative time", (done) => {
    const TimeComponent = renderer.create(
      <Time value={mockedStringMinutes} relativeTime />
    );
    renderer.act(() => {
      setTimeout(() => {
        expect(TimeComponent.toJSON()).toMatchSnapshot();
        done();
      }, 1000);
    });
  });

  it("1 minute change to hour", (done) => {
    const TimeComponent = renderer.create(
      <Time value={mockedStringHour} relativeTime />
    );
    renderer.act(() => {
      setTimeout(() => {
        expect(TimeComponent.toJSON()).toMatchSnapshot();
        done();
      }, 61000);
    });
  });
});

describe("Time component behavior", () => {
  it("Renders default placeholder with empty props", () => {
    const TimeComponent = renderer.create(<Time />);
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders default placeholder with UTC flag", () => {
    const TimeComponent = renderer.create(<Time utc />);
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders custom placeholder with empty value", () => {
    const TimeComponent = renderer.create(
      <Time placeholder="no time defined" />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders custom placeholder with UTC flag", () => {
    const TimeComponent = renderer.create(
      <Time placeholder="no time defined" utc />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders date value with default format", () => {
    const TimeComponent = renderer.create(<Time value={1261322332312} />);
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders date value with custom format H:i:s", () => {
    const TimeComponent = renderer.create(
      <Time value={1261322332312} format="H:i:s" />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders date value with custom format H:i:s and UTC flag", () => {
    const TimeComponent = renderer.create(
      <Time value={1261322332312} format="H:i:s" utc />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders right with milliseconds value", () => {
    const TimeComponent = renderer.create(
      <Time value={1261322332312} format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders right with milliseconds value and UTC", () => {
    const TimeComponent = renderer.create(
      <Time value={1261322332312} format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders right with object value", () => {
    const TimeComponent = renderer.create(
      <Time value={new Date(1261322332312)} format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders right with object value and UTC", () => {
    const TimeComponent = renderer.create(
      <Time value={new Date(1261322332312)} format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Renders right with string 1990-06-16 13:22:17", () => {
    const TimeComponent = renderer.create(
      <Time value="1990-06-16 13:22:17" format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it('Renders right with string "1990-06-16 13:22:17" and UTC', () => {
    const TimeComponent = renderer.create(
      <Time value="1990-06-16 13:22:17" format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it('Renders right with string "September 2, 2003, 2:26 am"', () => {
    const TimeComponent = renderer.create(
      <Time value="September 2, 2003, 2:26 am" format="d.m.Y H:i:s" />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it('Renders right with string "September 2, 2003, 2:26 am" and UTC', () => {
    const TimeComponent = renderer.create(
      <Time value="September 2, 2003, 2:26 am" format="d.m.Y H:i:s" utc />
    );
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Checks value and renders placeholder if its invalid", () => {
    const TimeComponent = renderer.create(<Time value="2003 36 2003" />);
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Checks value and renders placeholder if its invalid with UTC", () => {
    const TimeComponent = renderer.create(<Time value="2003 36 2003" utc />);
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });

  it("Checks value and renders custom placeholder if its invalid", () => {});

  it("Applies custom styles", () => {
    const TimeComponent = renderer.create(<Time className="customName" />);
    expect(TimeComponent.toJSON()).toMatchSnapshot();
  });
});
