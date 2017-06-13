'use strict'

import React, {
  Component,
  StyleSheet,
  ListView,
  View,
  ScrollView,
  Text,
  TextInput,
  PropTypes,
  TouchableHighlight,
  Animated
} from 'react-native'

import {Icon} from 'react-native-icons'
import moment from 'moment-timezone'
import FixturePanel from './FixturePanel'
import Tabbar from '../share/Tabbar'

export default class FixtureList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      isToday: true,
      showSearch: false,
      searchText: "",
    }
    this.mount = true // Control the state of mount
    this.timeout = null // Control the state of setTimeout
    this.inputDelay = null
    this.headerHeight = new Animated.Value(50)
    this.scrollOffset = 0
  }

  _setAnimation(hideHeader,duration=250) {
     Animated.timing(this.headerHeight, {
       duration: duration,
       toValue: hideHeader ? 0 : 50
     }).start()
  }

 /**
  * TODO: check what will be triggered when user re active app(from backend to front-end)
  */
  componentDidMount () {
    const {actions} = this.props
    const {date} = this.state
    actions.getFixtureGeneral('Davitts')
  }

  componentWillReceiveProps (props) {
    const {live, over, unstart, actions, application} = props
    const {dataSource, date} = this.state
    const rows = live.data.concat(unstart.data).concat(over.data)

    /* Judge if the navigator is on Game List page */
    if (application.navigator === 'fixturesIndex') {
      if (live.data.length > 0) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          actions.getFixtureGeneral('Davitts')
        }, 5000)
      } else if (unstart.data.length > 0) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          actions.getFixtureGeneral('Davitts')
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

  renderRow (fixture, _, index) {
    const {date} = this.state
    if (this.mount) {
      return (<FixturePanel fixture={fixture} date={date} index={index} {...this.props}/>)
    }
  }
  onInput (text) {
    /* Close after user stop typing */
    clearTimeout(this.inputDelay)

    /* Search after user stop typing */
    this.inputDelay = setTimeout(() => {
      this.setState({
        ...this.state, searchText: text
      })
    }, 1000)

    this.inputDelay = setTimeout(() => {
      this.setState({
        ...this.state, showSearch:!this.state.showSearch
      })
    }, 4000)
  }

  search(){
    this.setState({
      ...this.state, showSearch:!this.state.showSearch
    })
    console.log("searched");
  }

  showHeader(){
    this._setAnimation(false,400)
  }
  handleScroll(event){
    let currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.scrollOffset ? 'down' : 'up';
    this.scrollOffset = currentOffset;
    console.log(direction)
    this._setAnimation(direction === "up")
  }

  render () {
    //let showSearch = false;
    const {dataSource, date} = this.state
    const {live, over, unstart} = this.props
    const gameCount = live.data.length + over.data.length + unstart.data.length
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header,{ height: this.headerHeight }]}>
          {!this.state.showSearch &&
            <View style={styles.headerInner}>
            <Text style={styles.clubName}>{'Davitt\'s GAA'}</Text>
            <TouchableHighlight onPress={this.search.bind(this)} underlayColor='transparent'>
              <Icon name='ion|search'
                  size={25}
                  color='#fff'
                  style={styles.searchIcon}
              />
            </TouchableHighlight>
          </View>}
          {this.state.showSearch &&
          <View style={styles.headerInner}>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onInput.bind(this)}
              keyboardType={'default'}
              textAlignVertical={'center'}
              autoCorrect={false}
              placeholder={'Find fixture'}
            />
            <View style={styles.searchIconView}>
              <Icon name='ion|search' size={16} color='#fff' style={styles.searchBarIcon} />
            </View>
          </View>}
          <TouchableHighlight onPress={this.search.bind(this)} underlayColor='transparent'>
            <Icon name='ion|navicon'
              size={30}
              color='#fff'
              style={styles.settingsIcon}
            />
          </TouchableHighlight>
          {/*<Text style={styles.gameDate}>{date[0] + '-' + date[1] + '-' + date[2]}</Text>
          <Text style={styles.gameCount}>{gameCount + ' Games'}</Text>*/}
        </Animated.View>
        <Tabbar tab={'fixtures'} {...this.props}/>
        <ScrollView onScroll={this.handleScroll.bind(this)} onMomentumScrollEnd={this.showHeader.bind(this)}>
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView}
          />
        </ScrollView>
      </View>
    )
  }
}

FixtureList.propTypes = {
  actions: PropTypes.object,
  live: PropTypes.object,
  unstart: PropTypes.object,
  over: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  header: {
    backgroundColor: '#000000',
    height: 50,
    flexDirection: 'row',
    paddingLeft: 15
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  searchIcon: {
    height: 40,
    marginRight: 0,
    marginTop: 5,
    width: 30
  },
  searchBarIcon: {
    width: 16,
    height: 16,
    left: 20,
    marginLeft: -8,
    marginTop: -8,
    position: 'absolute',
    top: 20,
  },
  settingsIcon: {
    height: 40,
    marginRight: 5,
    marginTop: 5,
    width: 30
  },
  clubName: {
    color: 'white',
    fontWeight: '400',
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
    backgroundColor: 'white',
    flex: 6,
    flexDirection: 'column',
    paddingTop: 12
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000bb',
    fontSize: 14,
    height: 40,
    paddingHorizontal: 5,
    width: 260,
    marginLeft: 10
  },
  searchIconView: {
    backgroundColor: 'red',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    left: -5,
    position: 'relative',
    width: 40
  }
})
