import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Router from 'next/router'

import NoSSR from 'app/lib/ssr/NoSSR'

const query = gql`
  query CurrentUser {
    user: currentUserContext {
      uid
      name
      mail
    }
  }
`

const CurrentUserContainer = ({ children }) => (
  <Query query={ query } ssr={ false }>
    {children}
  </Query>
)

CurrentUserContainer.propTypes = {
  children: PropTypes.func,
}

const isLoggedIn = (user) => user && user.uid

CurrentUserContainer.Auth = ({ children, fallback = null, redirect = '/' }) => (
  <NoSSR fallback={ fallback }>
    {() => (
      <CurrentUserContainer>
        {userData => {
          const { networkStatus, data: { user } } = userData

          if (networkStatus === 1) {
            return fallback
          }

          if (networkStatus === 7 && !isLoggedIn(user)) {
            Router.replace(redirect)
            return fallback
          }

          return children(userData)
        }}
      </CurrentUserContainer>
    )}
  </NoSSR>
)

CurrentUserContainer.Auth.propTypes = {
  children: PropTypes.func,
  fallback: PropTypes.any,
  redirect: PropTypes.string,
}

export default CurrentUserContainer
