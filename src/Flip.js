import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated
} from 'react-native'

const {height, width} = Dimensions.get('window')

class Flip extends Component {
  constructor(props){
    super(props)

    this.state = {
      theta: new Animated.Value(0),
      count: 0
    }
  }

  componentDidMount() {
    
  }

  _animate() {
    const tmp = this.state.count + 1
    Animated.timing(this.state.theta, {
      toValue: 180*tmp,
      duration: 1000,
    }).start();
    this.setState({count: tmp})
  }

  render() {
    const { A, B } = this.props
    return (
      <View style={styles.flipCardContainer}>
        <Animated.View style={[
          styles.flipCard,
          {position: 'absolute',
          top: 0,
          transform: [
            {perspective: 1000},
            {rotateY: this.state.theta.interpolate({
              inputRange: [0, 180],
              outputRange: ['0deg', '180deg']
            })},
          ]}]}>
          <B animate={()=>{
            this._animate()
          }} />
        </Animated.View>
        <Animated.View style={[styles.flipCard, {
          position: 'absolute',
          top: 0,
          transform: [
            {perspective: 1000},
            {rotateY: this.state.theta.interpolate({
              inputRange: [0, 180],
              outputRange: ['180deg', '360deg']
            })},
          ]}]}>
          <A animate={()=>{
            this._animate()
          }} />
        </Animated.View>
      </View>
    );
  }
}

export default Flip;

const styles = StyleSheet.create({
  flipCardContainer: {
    width: width,
    height: height,
    backgroundColor: 'black'
  },
  flipCard: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  }
});
