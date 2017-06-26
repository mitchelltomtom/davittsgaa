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
  Platform,
  Dimensions
} from 'react-native'

import FixtureDetail from './FixtureDetail'
import teamMap from '../../utils/team-map'
import teamInfo from '../../utils/team-info'
import clubMap from '../../utils/mayo-club-team-map'
import Flag from './Flag'
let {height, width} = Dimensions.get('window');
var Color = require('color');

const primaryColor = clubMap[teamInfo.teamName].Colours[0].toLowerCase() || "#fff";
let secondaryColor = clubMap[teamInfo.teamName].Colours[1].toLowerCase() || primaryColor;
secondaryColor = secondaryColor === "white" || secondaryColor === "#fff" ? primaryColor: secondaryColor;

const mainTextColor = primaryColor === "white" || primaryColor === "#fff" ? "black" : "white";
const panelTextColor = secondaryColor === "white" || primaryColor === "#fff" ? "black" : "white";

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
    const {fixture} = this.props
    const homeTeam = fixture.home_team
    const awayTeam = fixture.away_team
    fixture.type = 'unstart'
    const dateSplit = fixture.date.split("/")
    const timeSplit = fixture.time.split(":")
    let fixtureDate = "TBC"
    let fixtureTime = ""
    if(dateSplit.length === 3){
      let _date = new Date(dateSplit[2]+"-"+dateSplit[1]+"-"+dateSplit[0])
      fixtureDate = _date.toGMTString().replace((" " + _date.getFullYear()), "").replace(" GMT","").replace(" 00:00:00","")
      if(timeSplit.length >=2){
        _date.setHours(parseInt(timeSplit[0]))
        _date.setMinutes(parseInt(timeSplit[1]))
        fixtureTime = " (" + _date.toLocaleTimeString().substring(0,5) +")"

      }
    }

    let cssType = ''
    switch (fixture.type) {
      case 'unstart':
        cssType = 'Unstart'
        break
      case 'over':
        fixtureDate = 'Finished'
        cssType = 'Over'
        break
      default:
        return
    }

    const awayTeamLogo = clubMap[awayTeam] && clubMap[awayTeam].logo ? clubMap[awayTeam].logo : null
    const homeTeamLogo = clubMap[homeTeam] && clubMap[homeTeam].logo ? clubMap[homeTeam].logo : null
    const localHome = fixture.home_team === teamInfo.teamName
    const homeColor1 = clubMap[homeTeam] && clubMap[homeTeam]["Colours"] && clubMap[homeTeam]["Colours"].length && clubMap[homeTeam]["Colours"][0].toLowerCase() || "white"
    const homeColor2 = clubMap[homeTeam] && clubMap[homeTeam]["Colours"] && clubMap[homeTeam]["Colours"].length && clubMap[homeTeam]["Colours"][1].toLowerCase() || homeColor1
    const awayColor1 = clubMap[awayTeam] && clubMap[awayTeam]["Colours"] && clubMap[awayTeam]["Colours"].length && clubMap[awayTeam]["Colours"][0].toLowerCase() || "white"
    const awayColor2 = clubMap[awayTeam] && clubMap[awayTeam]["Colours"] && clubMap[awayTeam]["Colours"].length && clubMap[awayTeam]["Colours"][1].toLowerCase() || awayColor1


    return (
      <TouchableHighlight onPress={this.onPressRow.bind(this)} underlayColor='transparent'>
        <View style={[styles.container]} >
          {!localHome &&
          <View style={[styles.team]}>
            {!homeTeamLogo && <Flag colorLeft={homeColor1} colorRight={homeColor2} />}
            {homeTeamLogo && <Image style={styles.teamLogo} source={homeTeamLogo} />}
            <Text style={styles.teamName} numberOfLines={1} ellipsizeMode={'middle'}>{fixture.home_team}</Text>
          </View>}
          <View style={styles.fixtureInfo}>
            <Text style={[styles.fixtureAgeGroup]} ellipsizeMode={'tail'}>{fixture.comp_details.age_group}</Text>
            <Text style={[styles.fixtureComp]} numberOfLines={1} ellipsizeMode={'middle'}>{fixture.comp_details.comp_name}</Text>
            <Text>
              <Text style={[styles.fixtureDate]}>{`${fixtureDate}`}</Text>
              <Text style={[styles.fixtureTime]}>{` ${fixtureTime}`}</Text>
            </Text>
            <Text style={[styles.fixturePitch]} ellipsizeMode={'tail'}>{fixture.pitch}</Text>
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
            {awayTeamLogo && <Image style={styles.teamLogo} source={awayTeamLogo} />}
            {!awayTeamLogo && <Flag colorLeft={awayColor1} colorRight={awayColor2} />}
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
const flagH = 25;
const flagW = flagH * 2;
const styles = StyleSheet.create({
  container: {
    borderRadius: 0,//5,
    backgroundColor: Color(secondaryColor).alpha(0.85).string(),
    flex: 1,
    flexDirection: 'row',
    height: 95,
    marginHorizontal: 12,
    marginBottom: 10
  },
  flag:{
    width: flagW,
    height: flagH,
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row"
  },
  flag_left: {
    marginLeft: -flagW
  },
  flag_right: {
    marginLeft: 0
  },
  // Team
  team: {
    alignItems: 'center',
    borderRadius: 0,
    height: 95,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
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
    borderRightWidth: 45,
    borderTopWidth: 85,
    borderRightColor: 'transparent',
    borderTopColor: 'red',
    position: "absolute",
    transform: [
      //{rotate: '180deg'}
    ]
  },
  slant_rotate: {
    rotation: 270
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
  teamName: {
    color: "#000",
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
    color: panelTextColor,
    fontSize: 22,
    marginBottom: 3
  },
  fixtureComp: {
    color: panelTextColor,
    fontSize: 12,
    marginBottom: 10
  },
  fixturePitch: {
    color: panelTextColor,
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 3
  },
  fixtureTime: {
    color: panelTextColor,
    fontSize: 13,
    marginBottom: 3
  },
  fixtureDate: {
    color: panelTextColor,
    fontSize: 15,
    fontWeight: "bold",
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
    color: panelTextColor,
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
