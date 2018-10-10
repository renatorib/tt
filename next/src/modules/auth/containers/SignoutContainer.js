import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import { Value } from 'react-powerplug'

export const logoutMutation = gql`
  mutation UserLogout {
    user: userLogout {
      uid
      name
    }
  }
`

const SignoutContainer = ({ children }) => (
  <Value>
    { ({ value: loading, set: setLoading }) => (
      <Mutation mutation={ logoutMutation }>
        {logoutMutate => {
          const logout = () => {
            const onLogout = () => Router.push('/')

            setLoading(true)
            logoutMutate()
              .then(onLogout)
              .catch(onLogout) // I need this catch while I can not solve the problem of mutation resolve
          }

          return children({ logout, loading })
        }}
      </Mutation>
    ) }
  </Value>
)

SignoutContainer.propTypes = {
  children: PropTypes.func,
}

export default SignoutContainer
