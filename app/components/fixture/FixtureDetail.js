'use strict'

import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS,
  InteractionManager,
  Platform
} from 'react-native'
import teamMap from '../../utils/team-map'
import {Icon} from 'react-native-icons'

import GamePlayers from '../game/GamePlayers'

export default class FixtureDetail extends Component {
  constructor (props) {
    super(props)
    const {fixture, date} = props.route
    const homeAbb = fixture.home_team.toLowerCase()
    const visitorAbb = fixture.away_team.toLowerCase()
    const homeName = fixture.home_team
    const visitorName = fixture.away_team
    this.state = {
      selectedIndex: 0,
      teamValues: [homeName, visitorName],
      indicator: true,
      fixtureType: fixture.type,
      fixture
    }
    this.date = date
    this.fixtureId = "0021500239" //set this static for now
    this.timeout = null
  }

  componentDidMount () {
    const {actions} = this.props
    const {fixtureType} = this.state
    const {fixtureId, date} = this
    InteractionManager.runAfterInteractions(() => {
      actions.getGameDetail(fixtureId, fixtureType, date[0], date[1], date[2])
        .catch(err => console.error(err))
    })
  }

  componentWillReceiveProps (props) {
    const {actions} = props
    const {fixtureType} = this.state
    const date = this.date
    let newState = {}
    /* gameType come from route in the begining, could be out of date */
    if (fixtureType === 'live') {
      let fixture = props.live.data.find(item => {
        return item.id === this.fixtureId
      })
      if (fixture) {
        newState.fixtureType = 'live'
        newState.fixture = fixture
        newState.indicator = !fixture.detail.loaded
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          actions.getGameDetail(this.fixtureId, 'live', date[0], date[1], date[2])
        }, 10000)
      } else {
        // Game has already finished
        newState.fixtureType = 'over'
        newState.fixture = props.over.data.find(item => {
          return item.id === this.fixtureId
        })
      }
    }
    this.setState(Object.assign({
      indicator: false
    }, newState))
  }

  onBackPress () {
    const {navigator, actions} = this.props
    actions.toNavigation('fixturesIndex')
      .then(() => navigator.pop())
      .catch(err => console.error(err))
  }

  onChange (index) {
    this.setState({
      selectedIndex: index,
      indicator: true
    })

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        indicator: false
      })
    })
  }

  render () {
    const {selectedIndex, teamValues, indicator, fixture} = this.state
    const homeAbb = fixture.home_team.toLowerCase()
    const visitorAbb = fixture.visitor_team.toLowerCase()

    /* Calculate for process and type */
    let fixtureProcess = ''
    let cssType = ''
    switch (fixture.type) {
      case 'live':
        fixtureProcess += fixture.process.quarter + ' '
        fixtureProcess += fixture.process.time.replace(/\s+/, '')
        cssType = 'Live'
        break
      case 'over':
        fixtureProcess = 'Final'
        cssType = 'Over'
        break
      default:
        return
    }

    /* Get standings of each team */
    const {standing} = this.props
    let homeStand = ''
    let visitorStand = ''

    if (standing.loaded) {
      homeStand = '0 - 0'
      visitorStand = '0 - 0'
    }

    const homeTeamLogo = teamMap[homeAbb] ? teamMap[homeAbb].logo : teamMap['atl'].logo
    const visitorTeamLogo = teamMap[visitorAbb] ? teamMap[visitorAbb].logo : teamMap['atl'].logo
    const homeColor = teamMap[homeAbb] ? teamMap[homeAbb].color : "#000000"
    const visitorColor = teamMap[visitorAbb] ? teamMap[visitorAbb].color : "#FFFFFF"
    /* Current team chosen */
    const homeCss = selectedIndex === 0 ? 'Active' : 'Inactive'
    const visitorCss = selectedIndex === 1 ? 'Active' : 'Inactive'
    return (
      <View style={{flex: 1}}>
        {/* Navigation */}
        <View style={[ styles.nav, {backgroundColor: homeColor} ]}>
          <TouchableHighlight onPress={this.onBackPress.bind(this)} underlayColor='transparent' style={{width: 80}}>
            <Icon name='ion|ios-arrow-left' size={26} color='#fff' style={styles.backNav} />
          </TouchableHighlight>
        </View>
        {/* Sum info */}
        <View style={[styles.sumContainer, {backgroundColor: homeColor}]} >
          <View style={styles.team}>
            <Image style={styles.teamLogo} source={homeTeamLogo}/>
            <Text style={styles.teamCity}>Senior</Text>
            <Text style={styles.teamName}>{fixture.home_team}</Text>
            <Text style={styles.standing}>{10}</Text>
          </View>

          <View style={styles.gameInfo}>
            <Text style={[styles.infoProcess, styles[`process${cssType}`]]}>{gameProcess}</Text>
            {game.type !== 'unstart' &&
              <View style={styles.infoScorePanel}>
                <View style={styles.infoScoreBlock}>
                  <Text style={styles.infoSide}>Home</Text>
                  <Text style={styles.infoScore}>{0}</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoScoreBlock}>
                  <Text style={styles.infoSide}>Away</Text>
                  <Text style={styles.infoScore}>{0}</Text>
                </View>
              </View>
            }
          </View>

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={visitorTeamLogo}/>
            <Text style={styles.teamCity}>Senior</Text>
            <Text style={styles.teamName}>{fixture.away_team}</Text>
            <Text style={styles.standing}>{11}</Text>
          </View>
        </View>
        {/* Switch */}
        <View style={styles.segment}>
          <TouchableHighlight onPress={this.onChange.bind(this, 0)} underlayColor='transparent' style={[styles.segPanel, styles[`segPanel${homeCss}`]]}>
            <View style={styles.segPanelInner}>
              <Text style={[styles.segTeam, styles[`segTeam${homeCss}`]]}>{teamValues[0]}</Text>
              <View style={homeCss === 'Active' ? {backgroundColor: homeColor, height: 4} : {opacity: 0}} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onChange.bind(this, 1)} underlayColor='transparent' style={[styles.segPanel, styles[`segPanel${visitorCss}`]]}>
            <View style={styles.segPanelInner}>
              <Text style={[styles.segTeam, styles[`segTeam${visitorCss}`]]}>{teamValues[1]}</Text>
              <View style={visitorCss === 'Active' ? {backgroundColor: visitorColor, height: 4} : {opacity: 0}} />
            </View>
          </TouchableHighlight>
        </View>
        {/* TODO: activity indicator can be a component */}
        {indicator && Platform.OS === 'ios' &&
          <View style={styles.indicatorView}>
            <ActivityIndicatorIOS
              animating
              color={selectedIndex === 0 ? homeColor : awayColor}
              style={styles.indicator}
              size='large'
            />
          </View>
        }
        {indicator && Platform.OS === 'android' &&
          <View style={styles.indicatorView}>
            <Text>Loading...</Text>
          </View>
        }
        {!indicator && fixture.detail && fixture.detail.loaded &&
          <GamePlayers detail={selectedIndex === 0 ? fixture.detail.data.home : fixture.detail.data.visitor} />
        }
      </View>
    )
  }
}

FixtureDetail.propTypes = {
  actions: PropTypes.object,
  route: PropTypes.object,
  navigator: PropTypes.object,
  standing: PropTypes.object
}

const styles = StyleSheet.create({
  // Navigation
  nav: {
    height: 40,
    paddingTop: 5,
    paddingLeft: 5
  },
  backNav: {
    height: 40,
    position: 'relative',
    left: -8,
    width: 50
  },
  // Sum container
  sumContainer: {
    flex: 5,
    flexDirection: 'row'
  },
  // Team
  team: {
    alignItems: 'center',
    flex: 1
  },
  teamLogo: {
    width: 75,
    height: 75
  },
  teamCity: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2
  },
  teamName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    position: 'relative',
    top: 0
  },
  standing: {
    color: '#fff',
    marginTop: 5
  },
  // Info
  gameInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  infoProcess: {
    color: '#fff',
    fontSize: 13,
    marginTop: 18,
    marginBottom: 3
  },
  processUnstart: {
    fontSize: 19,
    position: 'relative',
    top: 9
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row'
  },
  infoScoreBlock: {
    alignItems: 'center',
    flex: 1,
    width: 60
  },
  infoScore: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '200',
    flex: 9,
    fontSize: 35
  },
  infoSide: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    flex: 1,
    marginTop: 6
  },
  infoDivider: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15,
    width: 2 / PixelRatio.get(),
    height: 55
  },
  // Segment
  segment: {
    height: 35,
    flexDirection: 'row'
  },
  segPanel: {
    flex: 1
  },
  segPanelActive: {
    backgroundColor: '#fff'
  },
  segPanelInactive: {
    backgroundColor: '#EBEBEB'
  },
  segPanelInner: {
    flexDirection: 'column',
    flex: 1
  },
  segTeam: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 12,
    lineHeight: 22
  },
  segTeamActive: {
    color: '#222'
  },
  segTeamInactive: {
    color: '#7F7F7F'
  },
  // Indicator
  indicatorView: {
    flex: 13,
    flexDirection: 'column'
  },
  indicator: {
    alignSelf: 'center',
    height: 36,
    justifyContent: 'center',
    position: 'relative',
    top: 100
  }
})
