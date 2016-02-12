/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './Result.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Result extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    maxLines: PropTypes.number,
  };

  static defaultProps = {
    maxLines: 1,
  };

  strip (html) {
     var tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  }

  render() {
    const result = this.props.result;
    const key = result.episode + ':' + result.id
    const minutes = Number(result.startTime.slice(3,5));
    const seconds = Number(result.startTime.slice(6,8));
    const index = (minutes * 60) + seconds;
    const text = this.strip(result.text);
    const src = "http://localhost:8000/" + result.episode + "/" + index + ".jpg";

    return <div key={key} style={{backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', marginTop: 20, position: 'relative', width: '400px', height: '225px'}}>
      <p style={{position: 'absolute', bottom: 0, display: 'block', width: '100%', textAlign: 'center', color: 'white'}}>{text}</p>
    </div>
  }

}

export default Result;
