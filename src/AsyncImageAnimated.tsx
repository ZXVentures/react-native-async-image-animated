/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react'
import { Component } from 'react'

import {
  Animated,
  Easing,
  View,
  ViewStyle,
} from 'react-native'

import { lightenColor } from './lib/color'

type AnimationStyle = 'fade' | 'shrink' | 'explode'

interface Props {
  source: {
    uri: string,
  },
  style: ViewStyle,
  key?: string,
  placeholderColor?: string,
  delay?: number,
  animationStyle?: AnimationStyle
}

interface State {
  loaded: boolean,
  opacity: {
    image: Animated.Value,
    placeholder: Animated.Value,
  },
  placeholderColorAnimated: Animated.Value,
  placeholderColorLightened: string,
  placeholderScale: Animated.Value,
}

export default class AsyncImageAnimated extends Component<Props, State> {

  props: Props
  state: State

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      opacity: {
        image: new Animated.Value(0),
        placeholder: new Animated.Value(0.8),
      },
      placeholderColorAnimated: new Animated.Value(1.0),
      placeholderColorLightened: props.placeholderColor
        ? lightenColor(props.placeholderColor, 20)
        : 'transparent',
      placeholderScale: new Animated.Value(1.0),
    }
  }

  componentDidMount() {
    this.animatePlaceholderColor()
  }

  render() {
    const {
      key,
      source,
      placeholderColor,
      style,
    } = this.props

    const {
      loaded,
      opacity,
      placeholderScale,
      placeholderColorAnimated,
      placeholderColorLightened,
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
              resizeMode: 'contain',
            },
          ]}
          onLoad={this.onLoad} />

          {!loaded &&
            <Animated.View
              style={[
                style,
                {
                  backgroundColor: placeholderColor
                    ? placeholderColorAnimated.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          placeholderColor,
                          placeholderColorLightened,
                        ],
                      })
                    : 'transparent',
                  opacity: opacity.placeholder,
                  position: 'absolute',
                  transform: [{ scale: placeholderScale }],
                },
              ]} />
          }

      </View>
    )
  }

  private onLoad = () => {
    const {
      animationStyle,
      delay,
    } = this.props

    const {
      placeholderScale,
      opacity: {
        image,
        placeholder,
      },
    } = this.state

    const callback = () => this.setState(() => ({ loaded: true }))

    switch (animationStyle) {
    case 'fade':
      return Animated.parallel([
        Animated.timing(placeholder, {
          delay,
          duration: 200,
          toValue: 0,
        }),
        Animated.timing(image, {
          delay,
          duration: 300,
          toValue: 1,
        }),
      ]).start(callback)

    case 'shrink':
      return Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholder, {
            delay,
            duration: 200,
            toValue: 0,
          }),
          Animated.timing(placeholderScale, {
            delay,
            duration: 200,
            toValue: 0,
          }),
        ]),
        Animated.timing(image, {
          delay,
          duration: 300,
          toValue: 1,
        }),
      ]).start(callback)

    default: // explode
      return Animated.sequence([
        Animated.parallel([
          Animated.timing(placeholderScale, {
            delay,
            duration: 100,
            toValue: 0.7,
          }),
          Animated.timing(placeholder, {
            duration: 100,
            toValue: 0.66,
          }),
        ]),
        Animated.parallel([
          Animated.parallel([
            Animated.timing(placeholder, {
              duration: 200,
              toValue: 0,
            }),
            Animated.timing(placeholderScale, {
              duration: 200,
              toValue: 1.2,
            }),
          ]),
          Animated.timing(image, {
            delay: 200,
            duration: 300,
            toValue: 1,
          }),
        ]),
      ]).start(callback)
    }
  }

  private animatePlaceholderColor = () => {
    const {
      loaded,
      placeholderColorAnimated,
    } = this.state

    if (loaded) return

    Animated.sequence([
      Animated.timing(placeholderColorAnimated, {
        duration: 500,
        toValue: 1.0,
      }),
      Animated.timing(placeholderColorAnimated, {
        duration: 400,
        toValue: 0.0,
      }),
    ]).start(this.animatePlaceholderColor)
  }
}
