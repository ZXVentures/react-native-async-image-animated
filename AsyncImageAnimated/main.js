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

import AsyncImageAnimated from 'react-native-async-image-animated'

const uri = 'https://lh6.ggpht.com/Gg2BA4RXi96iE6Zi_hJdloQAZxO6lC6Drpdr7ouKAdCbEcE_Px-1o4r8bg8ku_xzyF4y=h900'
const placeholderColor = '#cfd8dc'
const style = {
  borderRadius: 50,
  width: 100,
  height: 100,
  marginVertical: 20
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

        <AsyncImageAnimated
          delay={1000}
          animationStyle={'fade'}
          source={{ uri }}
          placeholderColor={placeholderColor}
          style={style}/>

        <AsyncImageAnimated
          delay={2000}
          animationStyle={'shrink'}
          source={{ uri }}
          placeholderColor={placeholderColor}
          style={style}/>

        <AsyncImageAnimated
          delay={3000}
          animationStyle={'explode'}
          source={{ uri }}
          placeholderColor={placeholderColor}
          style={style}/>

      </View>
    )
  }
}

AppRegistry.registerComponent('AsyncImageAnimated', () => Example)
