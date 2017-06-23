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
    )
  }
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
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
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000bb',
    fontSize: 14,
    height: 40,
    paddingHorizontal: 5,
    width: 220,
    marginLeft: 0,
    marginTop: 5
  },
  searchIconView: {
    backgroundColor: 'red',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    left: -5,
    position: 'relative',
    width: 40,
    marginTop: 5
  }
})
