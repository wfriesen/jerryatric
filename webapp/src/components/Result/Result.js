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

  render() {
    const result = this.props.result;
    const minutes = Number(result.startTime.slice(3,5));
    const seconds = Number(result.startTime.slice(6,8));
    const index = (minutes * 60) + seconds;
    const src = "http://localhost:8000/" + result.episode + "/" + index + ".jpg";
    return <li key={result.id}>
      <img src={src} width="400px"/>
      <p>{result.text}</p>
    </li>
  }

}

export default Result;
