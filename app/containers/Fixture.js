'use strict'

import React, {
  PropTypes,
  Component,
  Navigator
} from 'react-native'

import FixtureList from '../components/fixture/FixtureList'
import NavigatorBar from '../components/share/NavigatorBar'

export default class Fixture extends Component {

  componentDidMount () {
    const {actions} = this.props
    actions.getFixtureGeneral()
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
          name: 'FixtureList',
          component: FixtureList
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

Fixture.propTypes = {
  fixture: PropTypes.object,
  actions: PropTypes.object
}
