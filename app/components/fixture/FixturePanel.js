'use strict'

import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio,
  Platform
} from 'react-native'

import FixtureDetail from './FixtureDetail'
import teamMap from '../../utils/team-map'

export default class FixturePanel extends Component {

  onPressRow () {
    const {navigator, fixture, date, actions} = this.props
    fixture.type = "unstart"; //all the fixtures are unstarted for now.
    if (fixture.type !== 'unstart') {
      actions.toNavigation('fixtureDetail')
        .then(() => {
          navigator.push(Object.assign({}, {
            name: 'fixtureDetail',
            component: fixtureDetail,
            fixture,
            date
          }))
        })
        .catch(err => console.error(err))
    }
  }

  render () {
    console.log("rendering panel");
    const {fixture} = this.props
    const homeTeam = fixture.home_team.toLowerCase()
    const awayTeam = fixture.away_team.toLowerCase()
    fixture.type = 'unstart'
    let fixtureDate = ''
    const fixtureTime = fixture.time
    let cssType = ''
    switch (fixture.type) {
      case 'unstart':
        fixtureDate = fixture.date
        cssType = 'Unstart'
        break
      case 'over':
        fixtureDate = 'Finished'
        cssType = 'Over'
        break
      default:
        return
    }
    const awayTeamLogo = teamMap[awayTeam] ? teamMap[awayTeam].logo : teamMap['uta'].logo
    const homeTeamLogo = teamMap[homeTeam] ? teamMap[homeTeam].logo : teamMap['uta'].logo
    const localHome = fixture.home_team === "Davitts"
    const homeTeamColor = "#bf0000cc"
    return (
      <TouchableHighlight onPress={this.onPressRow.bind(this)} underlayColor='transparent'>
        <View style={[styles.container, {backgroundColor: homeTeamColor}]} >
          {!localHome &&
            <View style={styles.team}>
            <Image style={styles.teamLogo} source={homeTeamLogo} />
            <Text style={styles.teamName} numberOfLines={1} ellipsizeMode={'middle'}>{fixture.home_team}</Text>
          </View>}

          <View style={styles.fixtureInfo}>
            <Text style={[styles.fixtureAgeGroup]} ellipsizeMode={'tail'}>{fixture.comp_details.age_group}</Text>
            <Text style={[styles.fixtureComp]} ellipsizeMode={'tail'}>{fixture.comp_details.comp_name}</Text>
            <Text style={[styles.fixtureDate]}>{fixtureDate}</Text>
            <Text style={[styles.fixtureTime]}>{fixtureTime}</Text>
            {fixture.type !== 'unstart' &&
              <View style={styles.infoScorePanel}>
                <Text style={styles.infoScore}>0</Text>
                <View style={styles.infoDivider} />
                <Text style={styles.infoScore}>0</Text>
              </View>
            }
          </View>
          {localHome &&
            <View style={styles.team}>
            <Image style={styles.teamLogo} source={awayTeamLogo} />
            <Text style={styles.teamName}>{fixture.away_team}</Text>
          </View>}
        </View>
      </TouchableHighlight>
    )
  }
}

FixturePanel.propTypes = {
  navigator: PropTypes.object,
  game: PropTypes.object,
  date: PropTypes.array,
  actions: PropTypes.object
}

const fixureFontSize = Platform.OS === 'ios' ? 31 : 25

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    height: 95,
    marginHorizontal: 12,
    marginBottom: 10
  },
  // Team
  team: {
    alignItems: 'center',
    borderRadius: 5,
    height: 85,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    width: 105,
    backgroundColor: "white"
  },
  leftTeam: {
    position: "absolute",
    width: 30
  },
  slant: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderRightWidth: 95,
    borderTopWidth: 95,
    borderRightColor: 'transparent',
    borderTopColor: 'red',
    marginLeft: 20,
    position: "absolute"
  },
  slant_rotate: {

  },
  teamLogo: {
    width: 50,
    height: 50,
    marginTop: 10,
    backgroundColor: "transparent"
  },
  teamLogoLeft: {
    marginTop: 25
  },
  teamCity: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2
  },
  teamName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
    top: 0
  },
  teamNameLeft: {
    position: "absolute",
    marginLeft: -45,
    marginTop: 10
  },
  // Info
  fixtureInfo: {
    borderRadius: 5,
    alignItems: 'center',
    flex: 2,
    flexDirection: 'column'
  },
  fixtureAgeGroup: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3
  },
  fixtureComp: {
    color: '#fff',
    flex: 0.8,
    fontSize: 15,
    marginBottom: 3
  },
  fixtureTime: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 3
  },
  fixtureDate: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 3
  },
  processUnstart: {
    fontSize: 22,
    position: 'relative',
    top: 13
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  infoScore: {
    color: '#fff',
    fontWeight: '100',
    fontSize: fixureFontSize,
    textAlign: 'center',
    width: 50
  },
  infoDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 25,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    width: 2 / PixelRatio.get()
  }
})
