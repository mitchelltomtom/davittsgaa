'use strict'

import React, {
  Component,
  PropTypes,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import Tabbar from '../share/Tabbar'
import moment from 'moment-timezone'
import TeamConference from './TeamConference'
import CollectionView from '../../lib/collection'
import {Icon} from 'react-native-icons'

export default class TeamList extends Component {

  constructor (props) {
    super(props)
    this.showSearch = false;
    this.state = {
      conference: 'western'
    }
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

  render () {
    const {conference} = this.state
    const {team} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {!this.showSearch &&
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
          {this.showSearch &&
          <View style={styles.headerInner}>
            <TextInput
              style={styles.textInput}
              //onChangeText={this.onInput.bind(this)}
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
        </View>
        <Tabbar tab={'teams'} {...this.props}/>
        {team && team.loaded &&
          <CollectionView scrollEnd={this.scrollEnd.bind(this)}>
          {[<TeamConference data={team.data.western} {...this.props} key={0}/>, <TeamConference data={team.data.eastern} {...this.props} key={1} />]}
          </CollectionView>
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
    marginTop: 3,
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
