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
import FixturePanel from './FixturePanel'
import HeaderInner from '../share/HeaderInner'
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
  _setAnimation(hideHeader,duration=250) {
     Animated.timing(this.headerHeight, {
       duration: duration,
       toValue: hideHeader ? 0 : 50
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
    //let showSearch = false;
    const {dataSource, date} = this.state
    const {live, over, unstart} = this.props
    const gameCount = live.data.length + over.data.length + unstart.data.length
    return (
      <View style={styles.container}>
        <HeaderInner headerHeight={this.headerHeight}/>
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
  // List View
  listView: {
    backgroundColor: 'white',
    flex: 6,
    flexDirection: 'column',
    paddingTop: 12
  }
})
