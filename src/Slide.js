import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Easing
} from 'react-native'

const {height, width} = Dimensions.get('window')

const OFFSET_LIMIT = width*0.5

class Slide extends Component {
  constructor(props){
    super(props)

    this.state = {
      theta: new Animated.Value(0),
      slideTo: 'right',
      animateV: 0
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 30 && gestureState.dx<OFFSET_LIMIT) {
          this.setState({slideTo: 'right'})
          this._animate(gestureState.dx-30)
        }
        if (gestureState.dx < -30 && -gestureState.dx<OFFSET_LIMIT) {
          this.setState({slideTo: 'left'})
          this._animate((OFFSET_LIMIT-Math.abs(gestureState.dx+30)))
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this._animate(this.state.slideTo=='left'?0:OFFSET_LIMIT)
      },
      onPanResponderTerminate: (evt, gestureState) => {

      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }

  _animate(v) {
    this.setState({animateV:v})
    Animated.timing(this.state.theta, {
      toValue: v,
      easing: Easing.linear,
      friction: 12,
      duration: 10
    }).start();
  }

  open(){
    this._animate(OFFSET_LIMIT)
  }
  close(){
    this._animate(0)
  }

  render() {
    const { Main, Menu } = this.props
    return (
      <View style={styles.flipCardContainer} {...this._panResponder.panHandlers}>
        <Animated.View style={[styles.flipCard, {backgroundColor: 'red',position:'absolute',left: 0,top: 0}]}>
          <Menu close={()=>{
            this._toggle()
          }} style={{width: width*1.4}} />
        </Animated.View>
        <Animated.View style={[
          styles.flipCard,{backgroundColor: 'blue',top: 0,left: this.state.theta}]}>
          <Main open={()=>{
            this._toggle()
          }} />
        </Animated.View>
      </View>
    );
  }
  _toggle(){
    const { animateV } = this.state
    let v = -1
    console.log(animateV);
    if (Math.abs(animateV-OFFSET_LIMIT)<5) {
      this.close()
    }else if (Math.abs(animateV)<5) {
      this.open()
    }
  }
}

export default Slide;

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
  flipCardContainer: {
    width: width,
    height: height,
    backgroundColor: 'white'
  },
  flipCard: {
    width: width,
    height: height
  }
});
