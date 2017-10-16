# AsyncImageAnimated

<p align="center">
  <img src ="https://media.giphy.com/media/3ov9jIB7SSbQLbwmGI/giphy.gif" />
</p>

Simple cross-platform asynchronous image component for React Native that supports progressive and placeholder images, while providing a placeholder color when one is not provided.

Source is available in the `AsyncImageAnimated/src` directory. 🙂

## Exports

* `AsyncImageAnimated`: Asynchronous image component

### Installation

```
npm i --save react-native-async-image-animated
```

### Usage Examples

Fetch an image with a 30x30 dimension and a placeholderColor.

```javascript
<AsyncImageAnimated
  source={{
    uri: 'https://i.imgur.com/R5TraVR.png'
  }}
  placeholderColor={'#cfd8dc'}
  style={{
    height: 30,
    width: 30
  }}
/>
```

Fetch an image with a 30x30 dimension and a progressive image.

```javascript
<AsyncImageAnimated
  source={{
    uri: 'https://i.imgur.com/R5TraVR.png'
  }}
  placeholderSource={{
    uri: 'https://i.imgur.com/TSl1zQR.jpg'
  }}
  style={{
    height: 30,
    width: 30
  }}
/>
```

Fetch an image with a 30x30 dimension and a placeholder image.

```javascript
<AsyncImageAnimated
  source={{
    uri: 'https://i.imgur.com/R5TraVR.png'
  }}
  placeholderSource={require('./path/to/image.png')}
  style={{
    height: 30,
    width: 30
  }}
/>
```

### Props

* `AsyncImageAnimated`:

  ```javacript
  animationStyle?: 'fade' | 'shrink' | 'explode',
  delay?: number,
  imageKey?: string,
  placeholderColor?: string,
  placeholderSource?: { uri: string } | number,
  source: { uri: string }, // required
  style: ViewStyle, // height & width required
  ```

#### Conditions

* If `placeholderSource` is set the animationStyle is set to `fade`. It just looks better.

## Running the Example

Run the following in the `AsyncImageAnimated` directory:

```javascript
npm i
react-native start
npm run ios // or 'android' or 'start' for both
```

Then reload to view animations again.

## Stack

* [React Native](https://github.com/facebook/react-native)
* [React](https://github.com/facebook/react)
* [TypeScript](https://github.com/Microsoft/TypeScript)

## Planned Updates

* [x] Animate color of placeholder while loading - v2
* [x] Placeholder image support
* [x] Progressive image support
* [ ] Tests / Detox Tests
