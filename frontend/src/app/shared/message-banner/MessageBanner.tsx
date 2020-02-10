import * as React from 'react';

import { Fade } from '@shared/fade';
import { Backdrop } from '@shared/backdrop';

import './MessageBanner.light.scss';
import './MessageBanner.dark.scss';

export class MessageBanner extends React.Component<{}, {}> {

  render() {
    return (
      <Fade in>
        <div className='message-banner'>
          <Backdrop visible />
          <div className='message-banner__content'>
            {this.props.children}
          </div>
        </div>
      </Fade>
    );
  }

}
