/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Header extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>The Jerryatric</h1>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
