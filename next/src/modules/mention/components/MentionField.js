import React from 'react'
import PropTypes from 'prop-types'
import { Mention } from 'react-mentions'

import MentionInput from './MentionInput'
import UsersMentionContainer from '../containers/UsersMentionContainer'
import { MENTION_PATTERN } from '../lib/const'

const MentionField = ({ input, ...props }) => (
  <UsersMentionContainer.Fetch>
    {fetchUsers => {
      const transform = ({ data }) =>
        data.users.entities
          .map(user => user ? ({ display: user.name, id: user.uid }) : false)
          .filter(Boolean)

      const data = (query, cb) =>
        fetchUsers(query).then(transform).then(cb)

      return (
        <MentionInput
          { ...props }
          { ...input }
          displayTransform={ (_, name) => `@${name}` }
          markup={ MENTION_PATTERN }
          singleLine
        >
          <Mention
            trigger='@'
            data={ data }
            style={ { backgroundColor: '#d3e5f3' } }
          />
        </MentionInput>
      )
    }}
  </UsersMentionContainer.Fetch>
)

MentionField.propTypes = {
  input: PropTypes.object
}

export default MentionField
