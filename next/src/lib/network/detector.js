import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createContext from 'create-react-context'

import ping from './ping'

const canUseNavigator = () =>
  typeof window !== 'undefined' &&
  typeof window.navigator !== 'undefined' &&
  typeof window.navigator.onLine === 'boolean'

const isOnline = () => canUseNavigator()
  ? window.navigator.onLine
  : true

const DetectorContext = createContext(isOnline())

export const Detector = DetectorContext.Consumer

export class DetectorProvider extends Component {
  static propTypes = { children: PropTypes.any }

  state = { online: isOnline() }

  set = (online) => this.setState({ online })
  setOnline = () => this.set(true)
  setOffline = () => this.set(false)

  startPolling = () => {
    this.pollingId = setInterval(() => ping().then(this.set), 5000)
  }

  stopPolling = () => {
    this.pollingId && clearInterval(this.pollingId)
  }

  componentDidMount () {
    this.startPolling()
    window.addEventListener('online', this.setOnline)
    window.addEventListener('offline', this.setOffline)
  }

  componentWillUnmount () {
    this.stopPolling()
    window.removeEventListener('online', this.setOnline)
    window.removeEventListener('offline', this.setOffline)
  }

  render () {
    return (
      <DetectorContext.Provider value={ this.state.online }>
        {this.props.children}
      </DetectorContext.Provider>
    )
  }
}

export class Listener extends Component {
  static propTypes = { onChange: PropTypes.func }

  online = isOnline()

  render () {
    return (
      <Detector>
        { online => {
          if (this.online !== online) {
            this.online = online
            this.props.onChange && this.props.onChange(online)
          }

          return null
        } }
      </Detector>
    )
  }
}

export const Online = ({ children }) => (
  <Detector>{online => online ? children : null}</Detector>
)

Online.propTypes = {
  children: PropTypes.func
}

export const Offline = ({ children }) => (
  <Detector>{online => online ? null : children}</Detector>
)

Offline.propTypes = {
  children: PropTypes.func
}
