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
    placeholder: Animated.Value,
  },
  placeholderScale: Animated.Value,
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
        placeholder: new Animated.Value(0.8)
      },
      placeholderScale: new Animated.Value(1),
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
      placeholderScale,
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
                  position: 'absolute',
                  transform: [{ scale: placeholderScale }]
                }
              ]} />
          }

      </View>
    )
  }

  _onLoad = () => {
    const {
      placeholderScale,
      opacity: {
        placeholder,
        image
      }
    } = this.state
    const callback = () => this.setState(() => ({ loaded: true }))

    animations.shrink(
      placeholderScale,
      placeholder,
      image,
      callback
    )
  }
}

const animations = {
  fade: (
    placeholderOpacity: Animated.Value,
    imageOpacity: Animated.Value,
    callback?: (result:  { finished: boolean }) => void
  ) => (
    Animated.parallel([
      Animated.timing(placeholderOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(imageOpacity, {
        toValue: 1,
        delay: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(callback)
  ),
  explode: (
    placeholderScale: Animated.Value,
    placeholderOpacity: Animated.Value,
    imageOpacity: Animated.Value,
    callback?: (result:  { finished: boolean }) => void
  ) => (
    Animated.parallel([
      Animated.parallel([
        Animated.timing(placeholderOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(placeholderScale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true
        }),
      ]),
      Animated.timing(imageOpacity, {
        toValue: 1,
        delay: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(callback)
  ),
  shrink: (
    placeholderScale: Animated.Value,
    placeholderOpacity: Animated.Value,
    imageOpacity: Animated.Value,
    callback?: (result:  { finished: boolean }) => void
  ) => (
    Animated.parallel([
      Animated.parallel([
        Animated.timing(placeholderOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(placeholderScale, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
      ]),
      Animated.timing(imageOpacity, {
        toValue: 1,
        delay: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(callback)
  )
}
