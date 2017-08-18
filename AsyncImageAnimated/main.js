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

import AsyncImageAnimated from './lib/AsyncImageAnimated'

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

AppRegistry.registerComponent('AsyncImageAnimated', () => Example)
