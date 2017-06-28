'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  PropTypes
} from 'react-native'

import teamInfo from '../../utils/team-info'
import teamMap from '../../utils/mayo-club-team-map'
import {Icon} from 'react-native-icons'

const primaryColor = teamMap[teamInfo.teamName].Colours[0].toLowerCase() || "#fff";
const secondaryColor = teamMap[teamInfo.teamName].Colours[1].toLowerCase() || primaryColor;
const mainTextColor = primaryColor === "white" || primaryColor === "#fff" ? "black" : "white";
const panelTextColor = secondaryColor === "white" || primaryColor === "#fff" ? "black" : "white";
var Color = require('color');

export default class Tabbar extends Component {

  onPress (tab) {
    const {actions} = this.props
    actions.changeTab(tab)
  }

  render () {
    const {tab} = this.props
    return (
      <View style={[styles.container, styles[tab]]}>
        {/*<TouchableHighlight onPress={this.onPress.bind(this, 'game')} underlayColor='transparent' style={styles.tab}>
          <View style={styles.tabview}>
            <View style={styles.tabviewInner}>
              <Text style={styles.tabtext}>GAME</Text>
            </View>
            {tab === 'game' &&
              <View style={styles.active} />
            }
          </View>
        </TouchableHighlight>*/}
        <TouchableHighlight onPress={this.onPress.bind(this, 'fixtures')} underlayColor='transparent' style={styles.tab}>
          <View style={styles.tabview}>
            <View style={styles.tabviewInner}>
              {true && <Icon name='ion|ios-calendar'
                  size={25}
                  color='#fff'
                  style={styles.tabImg} /> }
              <Text style={styles.tabtext}>FIXTURES</Text>
            </View>
            {tab === 'fixtures' &&
              <View style={styles.active} />
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPress.bind(this, 'teams')} underlayColor='transparent' style={styles.tab}>
          <View style={styles.tabview}>
            <View style={styles.tabviewInner}>
              {true && <Icon name='ion|social-twitter'
                  size={25}
                  color='#fff'
                  style={styles.tabImg} /> }
              {true && <Text style={styles.tabtext}>TWITTER</Text>}
            </View>
            {tab === 'teams' &&
              <View style={styles.active} />
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPress.bind(this, 'teams')} underlayColor='transparent' style={styles.tab}>
          <View style={styles.tabview}>
            <View style={styles.tabviewInner}>
              {true && <Icon name='ion|ios-wineglass'
                  size={23}
                  color='#fff'
                  style={[styles.tabImg,{marginLeft:5}]} /> }
              <Text style={styles.tabtext}>EVENTS</Text>
            </View>
            {tab === 'teams' &&
              <View style={styles.active} />
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPress.bind(this, 'players')} underlayColor='transparent' style={styles.tab}>
          <View style={styles.tabview}>
            <View style={[styles.tabviewInner]}>
              {true && <Icon name='ion|ios-cart'
                  size={25}
                  color='#fff'
                  style={[styles.tabImg,{marginLeft:0}]} /> }
              <Text style={styles.tabtext}>SHOP</Text>
            </View>
            {tab === 'players' &&
              <View style={styles.active} />
            }
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45
  },
  tab: {
    alignItems: 'center',
    flex: 1
  },
  tabview: {
    flex: 1,
    flexDirection: 'column'
  },
  tabviewInner: {
    flexDirection: 'column',
    flex: 1
  },
  tabtext: {
    flex: 1,
    fontSize: 8,
    paddingTop: 5,
    color: '#fff'
  },
  tabImg: {
    width: 20,
    height: 20,
    marginTop: 0,
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    backgroundColor: "transparent"
  },
  // Active
  active: {
    backgroundColor: secondaryColor,
    bottom: 0,
    height: 3,
    left: -10,
    position: 'absolute',
    right: -10
  },
  // Background
  game: {
    backgroundColor: '#000000'
  },
  fixtures: {
    backgroundColor: Color(primaryColor).alpha(0.85).string()
  },
  players: {
    backgroundColor: Color(primaryColor).alpha(0.85).string()
  },
  teams: {
    backgroundColor: Color(primaryColor).alpha(0.85).string()
  },
  roster: {}
})

Tabbar.propTypes = {
  actions: PropTypes.object,
  tab: PropTypes.string
}
