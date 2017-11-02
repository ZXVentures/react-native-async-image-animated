/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react'
import { Component } from 'react'

import {
  Animated,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { lightenColor } from './lib/color'

type AnimationStyle = 'fade' | 'shrink' | 'explode'

interface NetworkImage { uri: string }
type ImageSource = NetworkImage | number

interface Props {
  animationStyle?: AnimationStyle,
  delay?: number,
  imageKey?: string,
  placeholderColor?: string,
  placeholderSource?: ImageSource,
  source: NetworkImage,
  style: ViewStyle,
}

interface State {
  failed: boolean,
  imageOpacity: Animated.Value,
  loaded: boolean,
  placeholderColorAnimated: Animated.Value,
  placeholderColorLightened: string,
  placeholderOpacity: Animated.Value,
  placeholderScale: Animated.Value,
}

export default class AsyncImageAnimated extends Component<Props, State> {

  props: Props
  state: State

  private animationStyle: AnimationStyle

  constructor(props) {
    super(props)

    const style = typeof props.style === 'number'
      ? StyleSheet.flatten(props.style)
      : props.style

    const { width, height } = style
    if (!width || !height) {
      if (__DEV__) console.warn('AsyncImageAnimated: Width and height should be defined in styles.')
    }

    this.animationStyle = props.placeholderSource
      ? 'fade'
      : props.animationStyle

    this.state = {
      failed: false,
      imageOpacity: new Animated.Value(0),
      loaded: false,
      placeholderColorAnimated: new Animated.Value(1.0),
      placeholderColorLightened: props.placeholderColor
        ? lightenColor(props.placeholderColor, 20)
        : 'transparent',
      placeholderOpacity: new Animated.Value(1.0),
      placeholderScale: new Animated.Value(1.0),
    }
  }

  componentDidMount() {
    if (!this.props.placeholderSource) {
      this.animatePlaceholderColor()
    }
  }

  render() {
    const {
      imageKey,
      placeholderColor,
      placeholderSource,
      source,
      style,
    } = this.props

    const {
      failed,
      imageOpacity,
      loaded,
      placeholderColorAnimated,
      placeholderColorLightened,
      placeholderOpacity,
      placeholderScale,
    } = this.state

    return (
      <View style={style}>

        {!failed &&
          <Animated.Image
            key={imageKey}
            source={source}
            resizeMode={'contain'}
            style={[
              style,
              {
                opacity: imageOpacity,
                position: 'absolute',
                resizeMode: 'contain',
              },
            ]}
            onLoad={this.onLoad}
            onError={this.onError} />
        }

        {(placeholderSource && !loaded) &&
          <Animated.Image
            source={placeholderSource}
            style={[
              style,
              {
                opacity: placeholderOpacity,
                position: 'absolute',
                resizeMode: 'contain',
              },
            ]} />
        }

        {(!placeholderSource && !loaded) &&
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
                opacity: placeholderOpacity,
                position: 'absolute',
                transform: [{ scale: placeholderScale }],
              },
            ]} />
        }

      </View>
    )
  }

  private onError = () => {
    this.setState(() => ({
      failed: true,
    }), () => {
      Animated.timing(this.state.placeholderColorAnimated, {
        duration: 200,
        toValue: 0.0,
      }).start()
    })
  }

  private onLoad = () => {
    const { delay } = this.props

    const {
      imageOpacity,
      placeholderOpacity,
      placeholderScale,
    } = this.state

    const callback = () => this.setState(() => ({ loaded: true }))

    switch (this.animationStyle) {
      case 'fade':
        return Animated.parallel([
          Animated.timing(placeholderOpacity, {
            delay,
            duration: 200,
            toValue: 0,
          }),
          Animated.timing(imageOpacity, {
            delay,
            duration: 300,
            toValue: 1,
          }),
        ]).start(callback)

      case 'shrink':
        return Animated.parallel([
          Animated.parallel([
            Animated.timing(placeholderOpacity, {
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
          Animated.timing(imageOpacity, {
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
            Animated.timing(placeholderOpacity, {
              duration: 100,
              toValue: 0.66,
            }),
          ]),
          Animated.parallel([
            Animated.parallel([
              Animated.timing(placeholderOpacity, {
                duration: 200,
                toValue: 0,
              }),
              Animated.timing(placeholderScale, {
                duration: 200,
                toValue: 1.2,
              }),
            ]),
            Animated.timing(imageOpacity, {
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
      failed,
      loaded,
      placeholderColorAnimated,
    } = this.state

    if (failed || loaded) return

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
