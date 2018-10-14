import React from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Query, ApolloConsumer } from 'react-apollo'

const query = gql`
  query Users($term: String!) {
    users: userQuery(
      filter: {
        conditions: [{
          operator: LIKE,
          field: "name",
          value: [$term]
        }]
      }
    ) {
      count
      entities {
        ... on UserUser {
          name
          uid
        }
      }
    }
  }
`

const buildQuery = (term) => ({ query, variables: { term: `%${term}%` } })

const UsersMentionContainer = ({ term, ...props }) => (
  <Query { ...props } { ...buildQuery(term) } />
)

UsersMentionContainer.propTypes = {
  children: PropTypes.func,
  term: PropTypes.string
}

/**
 * Fires a query programmatically
 * <Fetch>{fetchUsers => { fetchUsers("a").then(...) }}</Fetch>
 */
UsersMentionContainer.Fetch = ({ children }) => (
  <ApolloConsumer>
    {client => children((term) => client.query(buildQuery(term)))}
  </ApolloConsumer>
)

UsersMentionContainer.Fetch.propTypes = {
  children: PropTypes.func
}

export default UsersMentionContainer
