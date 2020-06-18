## Overview
gif-creation-service provides a Promise-based-interface for creating GIFs.
It currently only supports animated GIFs (who wants a static GIF anyways?) from PNG images.
 Underneath the hood it uses gifencoder.
 
 
## How to install

```npm install --save gif-creation-service```

## How to use

Here's an example that creates a repeating GIF from 8 images at 1 FPS.

```javascript
const GifCreationService = require('gif-creation-service');

const pngImages = [
    'thumbnail-0001.png',
    'thumbnail-0002.png',
    'thumbnail-0003.png',
    'thumbnail-0004.png',
    'thumbnail-0005.png',
    'thumbnail-0006.png',
    'thumbnail-0007.png',
    'thumbnail-0008.png'
];
const outputGifFile = 'output.gif';

GifCreationService.createAnimatedGifFromPngImages(pngImages, outputGifFile, {repeat: true, fps: 1, quality: 10})
.then(outputGifFile => {
    console.log(`Alright, GIF ${outputGifFile} created!`);
});
```