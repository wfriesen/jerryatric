/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import s from './SearchArea.scss';
import withStyles from '../../decorators/withStyles';
import axios from 'axios';
import Result from '../Result';

@withStyles(s)
class SearchArea extends Component {

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = {
      results: [],
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _handleKeyPress(e) {
    if (e.target.value === this.query) {
      return;
    }
    this.query = e.target.value;
    if (this.query) {
      clearTimeout(this.timer);
      if (this.query.length !== 0) {
        this.timer = setTimeout(() => {
          axios.get('/api/search?q=' + this.query)
            .then(function processResponse(response) {
              this.setState({
                results: response.data.results,
              });
            }.bind(this))
            .catch(function error(response) {
              console.log(response);
            });
        }.bind(this), 300);
      }
    }
  }

  render() {
    return (
      <div className={s.root}>
        <input type="text" placeholder="Search..." onKeyUp={this._handleKeyPress}/>
        <p/>
        <div>
          {this.state.results.map(function getResult(result) {
            return <Result key={[result.episode, result.id].join(':')} result={result}/>;
          })
          }
        </div>
      </div>
    );
  }

}

export default SearchArea;
