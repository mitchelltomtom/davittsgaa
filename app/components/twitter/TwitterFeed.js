'use strict'

import React, {
  Component,
  StyleSheet,
  ListView,
  View,
  ScrollView,
  Text,
  PropTypes,
  Animated
} from 'react-native'

import moment from 'moment-timezone'
import Tweet from './Tweet'
import HeaderInner from '../share/HeaderInner'
import Tabbar from '../share/Tabbar'
import teamInfo from '../../utils/team-info'
//import twitter, {auth} from 'react-native-twitter';

export default class TwitterFeed extends Component {
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
    this.originalHeaderHeight = 30
    this.headerHeight = new Animated.Value(this.originalHeaderHeight)
    this.scrollOffset = 0
  }

  _setAnimation(hideHeader,duration=250) {
     Animated.timing(this.headerHeight, {
       duration: duration,
       toValue: hideHeader ? 0 : this.originalHeaderHeight
     }).start()
  }

 /**
  * TODO: check what will be triggered when user re active app(from backend to front-end)
  */
  componentDidMount () {
    const {actions} = this.props
    //actions.getFixtureGeneral(teamInfo.teamName)
  }

  componentWillReceiveProps (props) {

  }

  componentWillUnmount () {
    this.mount = false
  }

  renderRow (fixture, _, index) {
    const {date} = this.state
    if (this.mount) {
      return (<Tweet />)
    }
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
  return (
      <View style={styles.container}>
        {true && <HeaderInner headerHeight={this.headerHeight}/>}
        <Tabbar tab={'twitter'} {...this.props}/>
        <Text>Tweet test</Text>
        {/*
        <ScrollView onScroll={this.handleScroll.bind(this)} onMomentumScrollEnd={this.showHeader.bind(this)}>
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView}
          />
        </ScrollView>
        */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // List View
  listView: {
    backgroundColor: "#e9e6f2",
    flex: 6,
    flexDirection: 'column',
    paddingTop: 12
  }
})
