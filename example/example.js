import React from 'react';
import { render } from 'react-dom';
import Time from '../dist/react-pure-time.min.js';

class ModalContainer extends React.Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Format</th>
              <th>Time component</th>
              <th>UTC Time component</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Empty</td>
              <td></td>
              <td><Time /></td>
              <td></td>
            </tr>
            <tr>
              <td>1261322332312</td>
              <td>H:i:s</td>
              <td></td>
              <td><Time value={1261322332312} format="H:i:s" /></td>
            </tr>
            <tr>
              <td>new Date(1261322332312)</td>
              <td>d.m.Y H:i:s</td>
              <td></td>
              <td><Time value={new Date(1261322332312)} format="d.m.Y H:i:s" /></td>
            </tr>
            <tr>
              <td>new Date()</td>
              <td>d.m.Y H:i:s</td>
              <td></td>
              <td><Time value={new Date()} format="d.m.Y H:i:s" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

render(<ModalContainer />, document.getElementById('js--time'));
