/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import s from './Result.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Result extends Component {

  constructor(props) {
    super(props);
  }

  strip(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  render() {
    const result = this.props.result;
    const src = 'http://localhost:8000/' + result.episode + '/' + result.seconds + '.jpg';

    return (
      <div style={{ float: 'left', backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', marginTop: 20, marginRight: 20, position: 'relative', width: '400px', height: '225px' }}>
        <p style={{ position: 'absolute', bottom: 0, display: 'block', width: '100%', textAlign: 'center', color: 'white' }}>{result.text}</p>
      </div>
    );
  }

}
Result.propTypes = { result: React.PropTypes.object };
export default Result;
