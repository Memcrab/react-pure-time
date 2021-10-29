import * as React from "react";
import { render } from "react-dom";
import Time from "../src/react-pure-time";

const ModalContainer = () => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Value</th>
          <th>Format</th>
          <th>Time component</th>
          <th>
            with <code>utc</code> flag
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Empty value</td>
          <td>—</td>
          <td>
            <Time />
          </td>
          <td>
            <Time utc />
          </td>
        </tr>
        <tr>
          <td>Empty value with placeholder</td>
          <td>—</td>
          <td>
            <Time placeholder="no time defined" />
          </td>
          <td>
            <Time placeholder="no time defined" utc />
          </td>
        </tr>
        <tr>
          <td>1261322332312</td>
          <td>H:i:s</td>
          <td>
            <Time value={1261322332312} format="H:i:s" />
          </td>
          <td>
            <Time value={1261322332312} format="H:i:s" utc />
          </td>
        </tr>
        <tr>
          <td>new Date(1261322332312)</td>
          <td>d.m.Y H:i:s</td>
          <td>
            <Time value={new Date(1261322332312)} format="d.m.Y H:i:s" />
          </td>
          <td>
            <Time value={new Date(1261322332312)} format="d.m.Y H:i:s" utc />
          </td>
        </tr>
        <tr>
          <td>new Date()</td>
          <td>d.m.Y H:i:s</td>
          <td>
            <Time value={new Date()} format="d.m.Y H:i:s" />
          </td>
          <td>
            <Time value={new Date()} format="d.m.Y H:i:s" utc />
          </td>
        </tr>
        <tr>
          <td>1990-06-16 13:22:17</td>
          <td>d.m.Y H:i:s</td>
          <td>
            <Time value="1990-06-16 13:22:17" format="d.m.Y H:i:s" />
          </td>
          <td>
            <Time value="1990-06-16 13:22:17" format="d.m.Y H:i:s" utc />
          </td>
        </tr>
        <tr>
          <td>September 2, 2003, 2:26 am</td>
          <td>d.m.Y H:i:s</td>
          <td>
            <Time value="September 2, 2003, 2:26 am" format="d.m.Y H:i:s" />
          </td>
          <td>
            <Time value="September 2, 2003, 2:26 am" format="d.m.Y H:i:s" utc />
          </td>
        </tr>
        <tr>
          <td>2003 36 2003</td>
          <td>d.m.Y H:i:s</td>
          <td>
            <Time value="2003 36 2003" format="d.m.Y H:i:s" />
          </td>
          <td>
            <Time value="2003 36 2003" format="d.m.Y H:i:s" utc />
          </td>
        </tr>
        <tr>
          <td>September 2, 2003, 2:26 am</td>
          <td>relativeTime</td>
          <td>
            <Time value="September 2, 2003, 2:26 am" relativeTime />
          </td>
          <td>
            <Time
              value="Wed Nov 01 2017 17:29:03 GMT+0200 (EET)"
              relativeTime
              utc
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

render(<ModalContainer />, document.getElementById("js--time"));
