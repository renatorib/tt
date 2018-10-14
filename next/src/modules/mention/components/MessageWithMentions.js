import React from 'react'
import PropTypes from 'prop-types'

import Paragraph from 'grommet/components/Paragraph'
import { MENTION_MATCH, MENTION_GROUPS } from '../lib/const'

const processMentions = (message) =>
  message
    .split(MENTION_MATCH)
    .map((piece, key) => {
      const [mention, name, uid] = MENTION_GROUPS.exec(piece) || []

      if (mention) {
        return <a key={ key } href={ `#user-${uid}` }>@{name}</a>
      }

      return <span key={ key }>{piece}</span>
    })

const MessageWithMentions = ({ children, ...props }) => (
  <Paragraph { ...props }>{ processMentions(children) }</Paragraph>
)

MessageWithMentions.propTypes = {
  children: PropTypes.string
}

export default MessageWithMentions
