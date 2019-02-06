import { graphql } from 'react-apollo'
import React, { Fragment, Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { me } from '~src/shared/graphql/queries'
import HeaderContainer from '~src/shared/Containers/HeaderContainer'
import routes from './routes'

if (process.browser) {
  require('styles/global.scss')
}

class AppRouter extends Component {
  componentDidMount() {
    console.log(this.props.data)
  }

  render() {
    return (
      <Fragment>
        <div className='approuter'>
          <HeaderContainer />
          <Switch>
            {
              routes.map(({ Component, path }, index) =>
                <Route
                  key={index}
                  exact
                  path={path}
                  component={Component}
                />)
            }
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default graphql(me)(AppRouter)
