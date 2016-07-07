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

class Slide3D extends Component {
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
        const animateV = this.state.animateV
        if (gestureState.dx > 0) {
          this.setState({slideTo: 'right'})
          this._animate(Math.abs(gestureState.dx)/width)
        }
        if (gestureState.dx < 0) {
          this.setState({slideTo: 'left'})
          this._animate((width-Math.abs(gestureState.dx))/width)
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const to = this.state.slideTo
        this._animate(to=='right'?1:0)
      },
      onPanResponderTerminate: (evt, gestureState) => {
        
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return false;
      },
    });
  }

  _animate(v) {
    this.setState({animateV:v})
    Animated.spring(this.state.theta, {
              toValue: v,   // Returns to the start
              easing: Easing.linear,
              duration: 10,
              friction: 12,
            }).start();
  }

  render() {
    const { animateV } = this.state
    const { A, B } = this.props 
    return (
      <View style={styles.flipCardContainer} {...this._panResponder.panHandlers}>
        <Animated.View style={[styles.flipCard, {backgroundColor: 'red',position:'absolute',left: 0,top: 0},{
          transform: [{
            translateX: this.state.theta.interpolate({
              inputRange: [0,1],
              outputRange: [-width*0.4,0]
            })
          }]
        }]}>
          <B animate={()=>{
            this._toggle()
          }} style={{width: width*1.4}} />
        </Animated.View>
        <Animated.View style={[
          styles.flipCard,{backgroundColor: 'blue',top: 0},
            {
              transform: [
                {scale: this.state.theta.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8],
                })},
                {translateX:this.state.theta.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, width*0.8],
                })},
              ]
            }
          ]}>
          <A animate={()=>{
            this._toggle()
          }} />
        </Animated.View>
      </View>
    );
  }

  _toggle(){
    const { animateV } = this.state
    let v = -1
    if (animateV==1) {
      v = 0
    }else if (animateV==0) {
      v = 1
    }
    if (v!=-1) {
      this._animate(v)              
    }
  }
}

export default Slide3D;

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
