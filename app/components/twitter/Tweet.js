'use strict'

import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio,
  Platform,
  Dimensions
} from 'react-native'

import teamMap from '../../utils/team-map'
import teamInfo from '../../utils/team-info'
import clubMap from '../../utils/mayo-club-team-map'
let {height, width} = Dimensions.get('window');
var Color = require('color');

const primaryColor = clubMap[teamInfo.teamName].Colours[0].toLowerCase() || "#fff";
let secondaryColor = clubMap[teamInfo.teamName].Colours[1].toLowerCase() || primaryColor;
secondaryColor = secondaryColor === "white" || secondaryColor === "#fff" ? primaryColor: secondaryColor;

const mainTextColor = primaryColor === "white" || primaryColor === "#fff" ? "black" : "white";
const panelTextColor = secondaryColor === "white" || primaryColor === "#fff" ? "black" : "white";

export default class Tweet extends Component {

  onPressRow () {

  }

  render () {

    return (
      <TouchableHighlight onPress={this.onPressRow.bind(this)} underlayColor='transparent'>
        <View style={[styles.container]} >
        </View>
      </TouchableHighlight>
    )
  }
}

const fixureFontSize = Platform.OS === 'ios' ? 31 : 25

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,//5,
    backgroundColor: Color(secondaryColor).alpha(0.85).string(),
    flex: 1,
    flexDirection: 'row',
    height: 95,
    marginHorizontal: 12,
    marginBottom: 10
  }
})
