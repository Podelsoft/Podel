'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Fs = require('fs');
const sizeOfImage = Promise.promisify(require('image-size'));
const createPngFileStream = require('png-file-stream');
const GIFEncoder = require('gifencoder');

class GifCreationService {

    /**
     * Creates an animated GIF from the array of images
     * Note, the outputted GIF will be the same size as the first image
     * If the images are different sizes the output will be very wonky. You shouldn't do this.
     *
     * @param {String[]} imagePaths - list of PNG image files
     * @param {String} outputFilePath
     * @param {Object} [options]
     * @param {boolean} [options.repeat=false]
     * @param {number} [options.fps=1]
     * @param {number} [options.quality=10]
     *
     * @returns {Promise.<String,Error>}
     */
    static createAnimatedGifFromPngImages(imagePaths, outputFilePath, options) {
        options = _.defaults(options, {repeat: false, fps: 1});
        return Promise.resolve()
        // 1) Determine image size
        .then(() => sizeOfImage(imagePaths[0]))
        .then(dimensions => {
            const gifEncoder = new GIFEncoder(dimensions.width, dimensions.height);

            return new Promise((resolve, reject) => {
                const pngFileStream = createPngFileStream(imagePaths);

                const gifEncodingStreamOptions = {
                    repeat: options.repeat ? 0 : -1,
                    frameRate: options.fps,
                    quality: options.quality
                };
                const gifEncodingStream = gifEncoder.createWriteStream(gifEncodingStreamOptions);
                const gifFileWritingStream = Fs.createWriteStream(outputFilePath);

                // Explicitly handle errors on each stream b/c that's how you have to do it.  Thanks Node :)
                pngFileStream.on('error', err => reject(err));
                gifEncodingStream.on('error', err => reject(err));
                gifFileWritingStream.on('error', err => reject(err));

                // 2) Stream the PNG files
                // 3) Pipe PNG stream to GIF creator
                // 4) Write the file
                pngFileStream.pipe(gifEncodingStream).pipe(gifFileWritingStream).on('finish', () => resolve(outputFilePath));
            });
        });
    }

}

module.exports = GifCreationService;
