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

type AnimationStyle = 'fade' | 'shrink' | 'explode'

type Props = {
  source: {
    uri: string
  },
  style: {
    [key: string]: string | number | Object
  },
  key?: string,
  placeholderColor?: string,
  delay?: number,
  animationStyle?: AnimationStyle
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
      placeholderScale: new Animated.Value(1.0),
      loaded: false
    }
  }

  render() {
    const {
      key,
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
      <View
        key={key}
        style={style}>

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
      animationStyle,
      delay
    } = this.props

    const {
      placeholderScale,
      opacity: {
        placeholder,
        image
      }
    } = this.state

    const callback = () => this.setState(() => ({ loaded: true }))

    switch (animationStyle) {
    case 'fade':
      return Animated.parallel([
        Animated.timing(placeholder, {
          delay,
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(image, {
          delay,
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(callback)

    case 'shrink':
      return Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholder, {
            delay,
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(placeholderScale, {
            delay,
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(image, {
          delay,
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(callback)

    default: // explode
      return Animated.sequence([
        Animated.parallel([
          Animated.timing(placeholderScale, {
            delay,
            toValue: 0.7,
            duration: 100,
            useNativeDriver: true
          }),
          Animated.timing(placeholder, {
            toValue: 0.66,
            duration: 100,
            useNativeDriver: true
          }),
        ]),
        Animated.parallel([
          Animated.parallel([
            Animated.timing(placeholder, {
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
          Animated.timing(image, {
            toValue: 1,
            delay: 200,
            duration: 300,
            useNativeDriver: true
          })
        ])
      ]).start(callback)
    }
  }
}
