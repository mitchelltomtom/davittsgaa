'use strict'

import React, {
  Component,
  StyleSheet,
  ListView,
  View,
  Text,
  PropTypes,
  TouchableHighlight
} from 'react-native'

import {Icon} from 'react-native-icons'
import moment from 'moment-timezone'
import GamePanel from './GamePanel'
import Tabbar from '../share/Tabbar'

export default class GameList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      date: this.getToday(),
      isToday: true
    }
    this.mount = true // Control the state of mount
    this.timeout = null // Control the state of setTimeout
  }

 /**
  * TODO: check what will be triggered when user re active app(from backend to front-end)
  */
  componentDidMount () {
    const {actions} = this.props
    const {date} = this.state
    actions.getGameGeneral(date[0], date[1], date[2])
  }

  componentWillReceiveProps (props) {
    const {live, over, unstart, actions, application} = props
    const {dataSource, date} = this.state
    const rows = live.data.concat(unstart.data).concat(over.data)

    /* Judge if the navigator is on Game List page */
    if (application.navigator === 'gameIndex') {
      if (live.data.length > 0) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          actions.getGameGeneral(date[0], date[1], date[2])
        }, 5000)
      } else if (unstart.data.length > 0) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          actions.getGameGeneral(date[0], date[1], date[2])
        }, 120000)
      }
    }

    if (this.mount) {
      this.setState({
        dataSource: dataSource.cloneWithRows(rows)
      })
    }
  }

  componentWillUnmount () {
    this.mount = false
  }

  renderRow (game, _, index) {
    const {date} = this.state
    if (this.mount) {
      return (<GamePanel game={game} date={date} index={index} {...this.props}/>)
    }
  }

  /* Get date format */
  getToday () {
    const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format()
    const dateArray = dateString.replace('T', '-').split('-')
    return dateArray.splice(0, 3)
  }

  getYesterday () {
    let d = new Date()
    d.setDate(d.getDate() - 1)
    const dateString = moment.tz(d, 'America/Los_Angeles').format()
    const dateArray = dateString.replace('T', '-').split('-')
    return dateArray.splice(0, 3)
  }

  /* Swith between yesterday and today */
  changeDate () {
    const {isToday} = this.state
    const {actions} = this.props
    if (isToday) {
      const date = this.getYesterday()
      actions.getGameGeneral(date[0], date[1], date[2])
      this.setState({
        date,
        isToday: false
      })
    } else {
      const date = this.getToday()
      actions.getGameGeneral(date[0], date[1], date[2])
      this.setState({
        date,
        isToday: true
      })
    }
  }

  search(){
    console.log("searched");
  }

  render () {
    const {dataSource, date} = this.state
    const {live, over, unstart} = this.props
    const gameCount = live.data.length + over.data.length + unstart.data.length
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.clubName}>{'Davitt\'s GAA'}
          </Text>
          <TouchableHighlight onPress={this.search.bind(this)} underlayColor='transparent'>
            <Icon name='ion|search'
              size={30}
              color='#fff'
              style={styles.calendarIcon}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.search.bind(this)} underlayColor='transparent'>
            <Icon name='ion|navicon'
              size={30}
              color='#fff'
              style={styles.settingsIcon}
            />
          </TouchableHighlight>
          {/*<Text style={styles.gameDate}>{date[0] + '-' + date[1] + '-' + date[2]}</Text>
          <Text style={styles.gameCount}>{gameCount + ' Games'}</Text>*/}
        </View>
        <Tabbar tab={'game'} {...this.props}/>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
        />
      </View>
    )
  }
}

GameList.propTypes = {
  actions: PropTypes.object,
  live: PropTypes.object,
  unstart: PropTypes.object,
  over: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // Header
  header: {
    backgroundColor: '#000000',
    height: 50,
    flexDirection: 'row',
    position: 'relative',
    paddingLeft: 15
  },
  calendarIcon: {
    height: 40,
    marginRight: 10,
    marginTop: 5,
    width: 30
  },
  settingsIcon: {
    height: 40,
    marginRight: 5,
    marginTop: 5,
    width: 30
  },
  clubName: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 28,
    marginLeft: 0,
    marginTop: 5,
    flex: 1
  },
  gameDate: {
    color: '#fff',
    fontWeight: '200',
    fontSize: 25
  },
  gameCount: {
    color: '#fff',
    fontWeight: '200',
    fontSize: 14
  },
  // List View
  listView: {
    backgroundColor: '#fff',
    flex: 6,
    flexDirection: 'column',
    paddingTop: 12
  }
})
