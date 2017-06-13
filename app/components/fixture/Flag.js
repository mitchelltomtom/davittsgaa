import React,{Component, View} from 'react-native'
export default class Flag extends Component {

  constructor(props){
    super(props)
  }

  componentWillReceiveProps (props){

  }

  render() {
    return (
      <View style={{borderWidth: 0.5, flexDirection: 'row', height: 45, marginTop: 15}}>
        <View style={{backgroundColor: this.props.colorLeft, width: 40, flex: 0.5}} />
        <View style={{backgroundColor: this.props.colorRight, width: 40, flex: 0.5}} />
      </View>
    );
  }
}
