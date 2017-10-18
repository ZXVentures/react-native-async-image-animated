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
  StyleSheet,
  View
} from 'react-native'

import AsyncImageAnimated from 'react-native-async-image-animated'

const uri = 'https://i.imgur.com/R5TraVR.png'
const placeholderUri = 'https://i.imgur.com/TSl1zQR.jpg'

const placeholderColor = '#cfd8dc'
const style = {
  borderRadius: 50,
  width: 100,
  height: 100,
  marginVertical: 20
}

const firstStyle = StyleSheet.create({
  first: style
})

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
          source={{ uri }}
          placeholderSource={{
            uri: placeholderUri
          }}
          style={style} />

        <AsyncImageAnimated
          delay={2000}
          animationStyle={'fade'}
          source={{ uri }}
          placeholderColor={placeholderColor}
          style={style} />

        <AsyncImageAnimated
          delay={3000}
          animationStyle={'shrink'}
          source={{ uri }}
          placeholderColor={placeholderColor}
          style={style} />

        <AsyncImageAnimated
          delay={4000}
          animationStyle={'explode'}
          source={{ uri }}
          placeholderColor={placeholderColor}
          style={style} />

      </View>
    )
  }
}

AppRegistry.registerComponent('AsyncImageAnimated', () => Example)
