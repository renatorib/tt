import React from 'react'
import { pipe } from 'ramda'
import { Listener } from './detector'
import { createModal } from '../createModal'

import Toast from 'grommet/components/Toast'

const status = {
  online: {
    status: 'ok',
    message: 'Your network connection was successfully recovered',
  },
  offline: {
    status: 'critical',
    message: 'We lost your connection. Please check your network.'
  }
}

const getProps = online => online ? status.online : status.offline

const networkNotify = createModal((props, modal) => (
  <Toast onClose={ modal.unmount } size='small' status={ props.status }>
    {props.message}
  </Toast>
))

export const Notifier = () => (
  <Listener onChange={ online => {
    console.log('Listener onChange', { online })
    pipe(getProps, networkNotify.open)(online)
  } } />
)
