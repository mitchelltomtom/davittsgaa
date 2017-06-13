'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  PropTypes
} from 'react-native'

export default class Tabbar extends Component {

  onPress (tab) {
    const {actions} = this.props
    actions.changeTab(tab)
  }

  render () {
    console.log(tab);
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
              <Text style={styles.tabtext}>FIXTURES</Text>
            </View>
            {tab === 'fixtures' &&
              <View style={styles.active} />
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPress.bind(this, 'players')} underlayColor='transparent' style={styles.tab}>
          <View style={styles.tabview}>
            <View style={styles.tabviewInner}>
              <Text style={styles.tabtext}>PLAYERS</Text>
            </View>
            {tab === 'players' &&
              <View style={styles.active} />
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPress.bind(this, 'teams')} underlayColor='transparent' style={styles.tab}>
          <View style={styles.tabview}>
            <View style={styles.tabviewInner}>
              <Text style={styles.tabtext}>TEAMS</Text>
            </View>
            {tab === 'teams' &&
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
    flexDirection: 'row',
    flex: 1,
    position: 'relative'
  },
  tabtext: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 13,
    color: '#fff'
  },
  // Active
  active: {
    backgroundColor: 'red',
    bottom: 0,
    height: 3,
    left: -35,
    position: 'absolute',
    right: -35
  },
  // Background
  game: {
    backgroundColor: '#000000'
  },
  fixtures: {
    backgroundColor: '#000000dd'
  },
  players: {
    backgroundColor: '#000000dd'
  },
  teams: {
    backgroundColor: '#000000dd'
  },
  roster: {}
})

Tabbar.propTypes = {
  actions: PropTypes.object,
  tab: PropTypes.string
}
