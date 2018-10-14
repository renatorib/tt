import { Detector as _Detector, Online, Offline } from 'react-detect-offline'
import { mapProps } from 'recompose'

const Detector = mapProps(({ children }) => ({ render: children }))(_Detector)
export { Detector, Online, Offline }
