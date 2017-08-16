/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react"
import { Component } from "react"

import {
  Animated,
  AppRegistry,
  Text,
  View
} from 'react-native'

type Props = {
  source: {
    uri: string
  },
  placeholderColor?: string,
  style: {
    [key: string]: string | number | Object
  },
  key?: string
}

type State = {
  opacity: {
    image: Animated.Value,
    placeholder: Animated.Value
  },
  loaded: boolean
}

class AsyncImage extends Component<Props, State> {

  props: Props
  state: State

  constructor(props) {
    super(props)

    this.state = {
      opacity: {
        image: new Animated.Value(0),
        placeholder: new Animated.Value(1)
      },
      loaded: false
    }
  }

  render() {
    const {
      source,
      placeholderColor,
      style
    } = this.props

    const {
      opacity,
      loaded
    } = this.state

    return (
      <View style={style}>

        <Animated.Image
          source={source}
          resizeMode={'contain'}
          style={[
            style,
            {
              opacity: opacity.image,
              position: 'absolute',
              resizeMode: 'contain'
            }
          ]}
          onLoad={this._onLoad} />

          {!loaded &&
            <Animated.View
              style={[
                style,
                {
                  backgroundColor: placeholderColor ||
                    'transparent',
                  opacity: opacity.placeholder,
                  position: 'absolute'
                }
              ]} />
          }

      </View>
    )
  }

  _onLoad = () => {
    Animated.parallel([
      Animated.timing(this.state.opacity.placeholder, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.opacity.image, {
        toValue: 1,
        delay: 0,
        duration: 3000,
        useNativeDriver: true
      })
    ]).start(() => this.setState(() => ({ loaded: true })))
  }
}

export default class Example extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }}>

        <AsyncImage
          source={{
            uri: 'https://lh6.ggpht.com/Gg2BA4RXi96iE6Zi_hJdloQAZxO6lC6Drpdr7ouKAdCbEcE_Px-1o4r8bg8ku_xzyF4y=h900'
          }}
          placeholderColor='#cfd8dc'
          style={{
            borderRadius: 50,
            width: 100,
            height: 100
          }}/>

      </View>
    )
  }
}

AppRegistry.registerComponent('Example', () => Example)
