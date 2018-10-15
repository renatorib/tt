import uuid from 'uuid'
import ReactDOM from 'react-dom'

const canUseDom = () =>
  typeof window !== 'undefined'

/**
 * Create a modal template and
 * programatically opens a instance passing their own props.
 *
 * e.g.:
 * const dialog = createModal((props, modal) => (
 *   <div>
 *     <div>{props.message}</div>
 *     <button onClick={modal.unmount}>Fechar</button>
 *   </div>
 * ));
 *
 * dialog.open({ message: 'Dialog message' })
 *
 * Draft: https://codesandbox.io/s/480ply31wx
 */

const createBullet = (
  render,
  {
    getContainer = () => document.body,
    onUnmount = () => {},
    onMount = () => {}
  } = {}
) => {
  const node = document.createElement('div')
  const key = uuid()
  let state = 'UNMOUNTED'

  const bullet = {
    mount: (props = {}) => {
      const container = getContainer()
      container.appendChild(node)
      ReactDOM.render(render(props, bullet), node)
      state = 'MOUNTED'
      onMount()
      return this
    },
    unmount: () => {
      ReactDOM.unmountComponentAtNode(node)
      node.parentNode && node.parentNode.removeChild(node)
      state = 'UNMOUNTED'
      onUnmount()
    },
    get state () {
      return state
    },
    node,
    key
  }

  return bullet
}

export const createModal = render => {
  return {
    open: props => {
      if (!canUseDom()) return false
      return createBullet(render).mount(props)
    }
  }
}
