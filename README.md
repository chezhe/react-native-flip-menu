# react-native-flip-menu

#### Usage

```
import { Slide,Slide3D,Flip } from 'react-native-flip-menu'

class APP extends Component {
  render() {
    return (
      <View>
        <Flip Main={Main} Menu={Menu} />
      </View>
    );
  } 
}

class Main extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=>{ 
        //trigger by button
          this.props.open()
        }}>
          <Text>Open Menu</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Menu extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=>{ 
        //trigger by button
          this.props.close()
        }}>
          <Text>Open Menu</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
```


#### Common Props

|Props | Type      |Description |
|------|:----------|:-----------|
| Main | Component |The main View       |
| Menu | Component |The menu View       |

#### Effect

##### Flip
![alt](https://github.com/chezhe/react-native-flip-menu/blob/master/Flip.gif)

##### Slide
![alt](https://github.com/chezhe/react-native-flip-menu/blob/master/Slide.gif)

##### Slide3D
![alt](https://github.com/chezhe/react-native-flip-menu/blob/master/Slide3D.gif)
