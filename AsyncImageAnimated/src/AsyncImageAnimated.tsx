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

export default class AsyncImageAnimated extends Component<Props, State> {

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
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.state.opacity.image, {
        toValue: 1,
        delay: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => this.setState(() => ({ loaded: true })))
  }
}
