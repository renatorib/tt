import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

export const logoutMutation = gql`
  mutation UserLogout {
    user: userLogout {
      uid
      name
    }
  }
`

const SignoutContainer = ({ children }) => (
  <Mutation mutation={ logoutMutation }>
    {logout => {
      return children(() => {
        // TODO: await this execution before redirects user
        // Need to fix logout mutation return error first
        logout()
        Router.push('/')
      })
    }}
  </Mutation>
)

SignoutContainer.propTypes = {
  children: PropTypes.func,
}

export default SignoutContainer
