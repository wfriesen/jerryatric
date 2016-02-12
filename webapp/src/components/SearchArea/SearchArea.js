/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './SearchArea.scss';
import withStyles from '../../decorators/withStyles';
import axios from 'axios';

@withStyles(s)
class SearchArea extends Component {

  constructor(props) {
    super(props)
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = {
      results: []
    }
  }

  static propTypes = {
    maxLines: PropTypes.number,
  };

  static defaultProps = {
    maxLines: 1,
  };

  _handleKeyPress(e) {
    if (e.key === 'Enter') {

      axios.get('http://localhost:9200/seinfeld/_search?q=text:' + e.target.value)
        .then(function (response) {
          const results = response.data.hits.hits.map(function(hit) {
            return hit._source;
          });
          this.setState({
            results: results
          });
        }.bind(this))
        .catch(function (response) {
          console.log(response);
        });
    }
  }

  render() {

    return (
      <div className={s.root}>
        <input type="text" placeholder="Search..." onKeyPress = {this._handleKeyPress}/>
        <ul>
          {this.state.results.map(function(result) {
            if (result === undefined ) return;
            const minutes = Number(result.startTime.slice(3,5));
            const seconds = Number(result.startTime.slice(6,8));
            const index = (minutes * 60) + seconds;
            const src = "http://localhost:8000/" + result.episode + "/" + index + ".jpg";
            return <li key={result.id}>
              <img src={src} width="400px"/>
              <p>{result.text}</p>
            </li>
          }.bind(this))
          }
        </ul>
      </div>
    );
  }

}

export default SearchArea;
