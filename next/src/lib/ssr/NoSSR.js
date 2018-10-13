import { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * "If you intentionally need to render something different on the server and the
 * client, you can do a two-pass rendering. Components that render something different
 * on the client can read a state variable like this.state.isClient, which you can set
 * to true in componentDidMount(). This way the initial render pass will render the same
 * content as the server, avoiding mismatches, but an additional pass will happen
 * synchronously right after hydration. Note that this approach will make your components
 * slower because they have to render twice, so use it with caution."
 *
 * Read more: https://reactjs.org/docs/react-dom.html#hydrate
 */
class NoSSR extends Component {
  state = { client: false }

  componentDidMount () {
    this.setState({ client: true })
  }

  render () {
    return this.state.client
      ? this.props.children()
      : this.props.fallback || null
  }
}

NoSSR.propTypes = {
  children: PropTypes.func,
  fallback: PropTypes.any
}

export default NoSSR
