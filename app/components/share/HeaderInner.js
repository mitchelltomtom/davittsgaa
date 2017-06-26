'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Animated
} from 'react-native'


import {Icon} from 'react-native-icons'
import teamInfo from '../../utils/team-info'
import teamMap from '../../utils/mayo-club-team-map'

export default class HeaderInner extends Component {
  constructor (props) {
    super(props)
    this.headerHeight = props.headerHeight
    this.state = {
      showSearch: props.showSearch,
      searchText: ""
    }
  }


  onInput (text) {
    /* Close after user stop typing */
    clearTimeout(this.inputDelay)

    if(this.props.handleSearch)
      this.props.handleSearch(text)

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

  componentDidMount () {
    this.setState({
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
    })
  }

  render () {
    return (
      <Animated.View style={[styles.header,{ height: this.headerHeight }]}>
        {!this.state.showSearch &&
          <View style={styles.headerInner}>
          <Text style={styles.clubName}>{`${teamInfo.displayName} GAA`}</Text>
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
    )
  }
}
const primaryColor = teamMap[teamInfo.teamName].Colours[0].toLowerCase() || "#fff";
const secondaryColor = teamMap[teamInfo.teamName].Colours[1].toLowerCase() || primaryColor;
const mainTextColor = primaryColor === "white" || primaryColor === "#fff" ? "black" : "white";
const panelTextColor = secondaryColor === "white" || primaryColor === "#fff" ? "black" : "white";
const styles = StyleSheet.create({
  header: {
    backgroundColor: primaryColor,
    height: this.headerHeight,
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
    height: 26,
    marginRight: 0,
    marginTop: 2,
    width: 30
  },
  searchBarIcon: {
    width: 16,
    height: 16,
    left: 20,
    marginLeft: -8,
    marginTop: -8,
    position: 'absolute',
    top: 13,
  },
  settingsIcon: {
    height: 26,
    marginRight: 5,
    marginTop: 2,
    width: 30
  },
  clubName: {
    color: mainTextColor,
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 0,
    marginTop: 5,
    flex: 1
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000bb',
    fontSize: 14,
    height: 26,
    paddingHorizontal: 5,
    width: 220,
    marginLeft: 0,
    marginTop: 2
  },
  searchIconView: {
    backgroundColor: secondaryColor,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 26,
    left: -5,
    position: 'relative',
    width: 40,
    marginTop: 2
  }
})
