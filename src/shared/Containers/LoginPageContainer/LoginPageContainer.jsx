import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

import { loginUser, currentUser } from '~src/shared/graphql/queries'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

export class LoginPageContainer extends Component {
  checkUser = formData => {
    const { client, history } = this.props
    client.mutate({
      mutation: loginUser,
      variables: formData
    }).then(({ data }) => {
      if (data.login && data.login.token) {
        client.query({
          query: currentUser,
          fetchPolicy: 'network-only'
        }).then(() => {
          history.push('/dashboard')
        })
      }
    })
  }

  render() {
    return (
      <FormContainer onSubmit={this.checkUser} >
        <TextInput type='email' name='email' placeholder='Email' icon='at' required />
        <TextInput type='password' name='password' placeholder='Password' icon='unlock-alt' required />
        <Button>Log in</Button>
      </FormContainer>
    )
  }
}

LoginPageContainer.propTypes = {
  client: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
}


export default withRouter(withApollo(LoginPageContainer))
