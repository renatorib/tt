import React from 'react'
import { pipe } from 'ramda'
import { Listener } from './detector'
import { createModal } from '../modal/create'

import Toast from 'grommet/components/Toast'

const ONLINE = {
  [true]: {
    status: 'ok',
    message: 'Your network connection was successfully recovered',
  },
  [false]: {
    status: 'critical',
    message: 'We lost your connection. Please check your network.'
  }
}

const getProps = online => ONLINE[online]

const networkNotify = createModal((props, modal) => (
  <Toast onClose={ modal.unmount } size='small' status={ props.status }>
    {props.message}
  </Toast>
))

export const Notifier = () => (
  <Listener onChange={ pipe(getProps, networkNotify.open) } />
)
