'use strict'

import React, {
  PropTypes,
  Component,
  Navigator
} from 'react-native'

import TwitterFeed from '../components/twitter/TwitterFeed'
import NavigatorBar from '../components/share/NavigatorBar'

export default class Twitter extends Component {

  componentDidMount () {
    const {actions} = this.props
    console.log(actions);
    //actions.getFixtureGeneral()
  }

  renderScene (route, navigator) {
    if (route.component) {
      const Component = route.component
      return <Component navigator={navigator} route={route} {...this.props} />
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{
          name: 'TwitterFeed',
          component: TwitterFeed
        }}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })}
        renderScene={this.renderScene.bind(this)}
        navigationBar={<NavigatorBar />}
      />
    )
  }
}

Twitter.propTypes = {
  twitter: PropTypes.object,
  actions: PropTypes.object
}
