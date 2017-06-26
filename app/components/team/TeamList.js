'use strict'

import React, {
  Component,
  PropTypes,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
  ScrollView
} from 'react-native'

import Tabbar from '../share/Tabbar'
import moment from 'moment-timezone'
import TeamConference from './TeamConference'
import HeaderInner from '../share/HeaderInner'
import CollectionView from '../../lib/collection'
import {Icon} from 'react-native-icons'

export default class TeamList extends Component {

  constructor (props) {
    super(props)
    this.showSearch = false;
    this.state = {
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

  componentDidMount () {
    const {actions} = this.props
    const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format()
    const dateArray = dateString.replace('T', '-').split('-')
    //actions.getTeamRank(dateArray[0], dateArray[1], dateArray[2])
  }

  scrollEnd (x, y) {
    if (x === 0) {
      this.setState({
        conference: 'western'
      })
    } else {
      this.setState({
        conference: 'eastern'
      })
    }
  }

  search(){
    console.log("searched Team Page");
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
    console.log(direction)
    this._setAnimation(direction === "up")
  }

  render () {
    const {conference} = this.state
    const {team} = this.props

    return (
      <View style={styles.container}>
        <HeaderInner headerHeight={this.headerHeight}/>
        <Tabbar tab={'teams'} {...this.props}/>
        {team && team.loaded &&
          <ScrollView>
            <CollectionView scrollEnd={this.scrollEnd.bind(this)}>
            {[<TeamConference data={team.data.western} {...this.props} key={0}/>, <TeamConference data={team.data.eastern} {...this.props} key={1} />]}
            </CollectionView>
          </ScrollView>
        }
      </View>
    )
  }
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
    paddingLeft: 15
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0
  },clubName: {
    color: 'white',
    fontWeight: '400',
    fontSize: 28,
    marginLeft: 0,
    marginTop: 5,
    flex: 1
  },
  searchIcon: {
    height: 40,
    marginRight: 0,
    marginTop: 5,
    width: 30
  },
  settingsIcon: {
    height: 40,
    marginRight: 5,
    marginTop: 5,
    width: 30
  },
})

TeamList.propTypes = {
  actions: PropTypes.object,
  team: PropTypes.object
}
