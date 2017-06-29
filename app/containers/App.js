'use strict'

import React, {
  Component,
  View,
  StyleSheet,
  PropTypes
} from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'

import applicationActions from '../actions/application'
import gameActions from '../actions/game'
import playerActions from '../actions/player'
import teamActions from '../actions/team'
import fixtureActions from '../actions/fixture'
import twitterActions from '../actions/twitter'

import Game from './Game'
import Player from './Player'
import Team from './Team'
import Fixture from './Fixture'
import Twitter from './Twitter'

export class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      tab: null
    }
  }

  componentWillReceiveProps (props) {
    const {application} = props
    this.setState({
      tab: application.tab
    })
  }

  render () {
    const {tab} = this.state
    console.log(tab)
    console.log(this.props)
    const {game, player, team, fixture, twitter, gameActions, playerActions, teamActions, fixtureActions, twitterActions} = this.props
    return (
      <View style={styles.container}>
        {tab === 'game' &&
          <Game {...game} actions={gameActions} />
        }
        {tab === 'twitter' &&
          <Twitter {...twitter} actions={twitterActions} />
        }
        {tab === 'fixtures' &&
          <Fixture {...fixture} actions={fixtureActions} />
        }
        {tab === 'players' &&
          <Player {...player} actions={playerActions} />
        }
        {tab === 'teams' &&
          <Team {...team} actions={teamActions} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

App.propTypes = {
  game: PropTypes.object,
  player: PropTypes.object,
  team: PropTypes.object,
  fixture: PropTypes.object,
  twitter: PropTypes.object,
  gameActions: PropTypes.object,
  playerActions: PropTypes.object,
  teamActions: PropTypes.object,
  fixtureActions: PropTypes.object,
  twitterActions: PropTypes.object
}

export default connect(state => {
  return {
    application: state.application,
    game: {
      live: state.live,
      over: state.over,
      unstart: state.unstart,
      standing: state.standing,
      application: state.application
    },
    fixture: {
      live: state.live,
      over: state.over,
      unstart: state.unstart,
      standing: state.standing,
      application: state.application
    },
    twitter: {
      application: state.application
    },
    player: {
      playerList: state.playerList,
      playerLoaded: state.playerLoaded
    },
    team: {
      team: state.team,
      playerLoaded: state.playerLoaded
    }
  }
}, dispatch => {
  return {
    twitterActions: bindActionCreators(Object.assign({}, applicationActions, twitterActions), dispatch),
    gameActions: bindActionCreators(Object.assign({}, applicationActions, gameActions), dispatch),
    fixtureActions: bindActionCreators(Object.assign({}, applicationActions, fixtureActions), dispatch),
    playerActions: bindActionCreators(Object.assign({}, applicationActions, playerActions), dispatch),
    teamActions: bindActionCreators(Object.assign({}, applicationActions, playerActions, teamActions), dispatch)
  }
})(App)
