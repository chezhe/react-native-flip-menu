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
      count: 0,
      animating: false
    }
  }

  componentDidMount() {
    
  }

  _animate() {
    const tmp = this.state.count + 1
    this.setState({animating: true})
    Animated.timing(this.state.theta, {
      toValue: 180*tmp,
      duration: 1000,
    }).start();
    function count(){
      const tmp = this.state.count + 1
      this.setState({count: tmp,animating: false})
    }
    setTimeout(count.bind(this),1000)
  }

  render() {
    const { count,animating } = this.state
    const { Main, Menu } = this.props
    const awrapper = (
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
          <Main open={()=>{
            this._animate()
          }} />
        </Animated.View>
    )
    const bwrapper = (
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
          <Menu close={()=>{
            this._animate()
          }} />
        </Animated.View>
    )
    let content = null;
    if (animating) {
      content = (
        <View>
          {awrapper}
          {bwrapper}
        </View>
      )
    }else{
      content = (
        <View>
          {count%2==0 ? awrapper : bwrapper}
        </View>
      )
    }
    return (
      <View style={styles.flipCardContainer}>
        {content}
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
