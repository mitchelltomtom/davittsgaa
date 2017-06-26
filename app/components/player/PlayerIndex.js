'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView,
  TextInput,
  PropTypes,
  Animated,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import {Icon} from 'react-native-icons'
import Tabbar from '../share/Tabbar'
import PlayerDetail from './PlayerDetail'
import HeaderInner from '../share/HeaderInner'

export default class PlayerIndex extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => { row1 !== row2}
      })
    }
    this.playerList = []
    this.searchRecent = []
    this.mount = true // Control the state of mount
    this.timeout = null // Control the state of setTimeout
    this.inputDelay = null
    this.originalHeaderHeight = 30
    this.headerHeight = new Animated.Value(this.originalHeaderHeight)
    this.scrollOffset = 0
    this.handler = this.onInput.bind(this)
  }

  componentDidMount () {
    console.log("player index component did mount");
    const {actions} = this.props
    actions.getPlayerList()
      .then(() => {
        actions.getSearchRecord()
      })
  }

  componentWillReceiveProps (props) {
    const {playerList} = props
    this.playerList = playerList.data
    this.searchRecent = playerList.recent
  }

  componentWillUnmount () {
    this.mount = false
  }

  getResult (text) {
    if (text.length > 0) {
      const {playerList} = this
      const reg = new RegExp(text, 'i')
      const players = playerList.filter(player => {  return reg.test(player.name)})
      console.log(players.length)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(players)
      })

    }
  }

  onInput (text) {
    this.setState({
      text
    })
    /* Search after user stop typing */
    clearTimeout(this.inputDelay)
    this.inputDelay = setTimeout(() => {
      this.getResult(text)
    }, 1500)
  }

  selectPlayer (player) {
    const {actions, navigator} = this.props
    actions.setSearchRecord(player)
    navigator.push({
      name: 'PlayerDetail',
      component: PlayerDetail,
      player
    })
  }

  _setAnimation(hideHeader,duration=250) {
     Animated.timing(this.headerHeight, {
       duration: duration,
       toValue: hideHeader ? 0 : this.originalHeaderHeight
     }).start()
  }
  showHeader(){
    this._setAnimation(false,400)
  }
  handleScroll(event){
    let currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.scrollOffset ? 'down' : 'up';
    this.scrollOffset = currentOffset;
    this._setAnimation(direction === "up")
  }
  renderRow (player, _, index) {
    console.log("renderRow");
    return (
      <TouchableHighlight onPress={this.selectPlayer.bind(this, player)} underlayColor='transparent'>
        <View style={styles.panel}>
          <View style={styles.panelLeft}>
            <Text style={styles.panelName}>{player.name}</Text>
            <Text style={styles.panelTeam}>{player.teamCity + ' ' + player.teamName}</Text>
          </View>
          <View style={styles.panelRight}>
            <Icon name='ion|ios-arrow-right' size={16} color='#6B7C96' style={styles.enterIcon} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const {text, dataSource} = this.state
    let myDataSource = dataSource.cloneWithRows(this.playerList)

    return (
      <View style={styles.container}>
        <HeaderInner headerHeight={this.headerHeight} handleSearch={this.handler.bind(this)}/>
        <Tabbar tab={'players'} {...this.props}/>
        <ScrollView onScroll={this.handleScroll.bind(this)} onMomentumScrollEnd={this.showHeader.bind(this)}>
          <ListView
            dataSource={myDataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.list}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // List
  list: {
    flex: 1
  },
  panel: {
    borderColor: '#979797',
    borderBottomWidth: 1,
    height: 65,
    flexDirection: 'row'
  },
  panelLeft: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  panelName: {
    color: '#6B7C96',
    fontSize: 17
  },
  panelTeam: {
    color: '#909CAF',
    fontSize: 13
  },
  panelRight: {
    height: 65,
    position: 'relative',
    width: 30
  },
  enterIcon: {
    height: 30,
    left: 15,
    marginLeft: -15,
    marginTop: -15,
    position: 'absolute',
    top: 32.5,
    width: 30
  }
})

PlayerIndex.propTypes = {
  actions: PropTypes.object,
  navigator: PropTypes.object
}
