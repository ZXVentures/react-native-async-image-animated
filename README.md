# AsyncImageAnimated

<p align="center">
  <img src ="https://media.giphy.com/media/X06Nr75bS7k8U/giphy.gif" />
</p>

Simple cross-platform asynchronous image component for React Native 🙌🏻 with a few animation options.  Displays a placeholder color while the image loads from the network.

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
    uri: 'https://yourimage.com'
  }}
  placeholderColor={'#cfd8dc'}
  style={{
    height: 30,
    width: 30
  }}
/>
```

### Props

* `AsyncImageAnimated`:

  ```javacript
  source: {
    uri: string // Network uri
  },
  style: { // StyleSheet or Objects will work
    [key: string]: string | number | Object
  },
  key?: string, // For lists
  placeholderColor?: string,
  delay?: number,
  animationStyle?: 'fade' | 'shrink' | 'explode'
  ```

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

* [ ] Animate color of placeholder while loading
* [ ] Placeholder image support
* [ ] Progressive image support
* [ ] Tests / Detox Tests
