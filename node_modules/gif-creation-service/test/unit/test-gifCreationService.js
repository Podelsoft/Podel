'use strict';

const Should = require('should');
const Promise = require('bluebird');
const Fs = require('fs');
const Path = require('path');
const Tmp = require('tmp-promise');
const GifCreationService = require('../../lib/gifCreationService');

/** @type {{path: string, cleanup: Function}} */
var tmpDirInfo;

describe('GifCreationService', function() {

    describe('createAnimatedGifFromPngImages', function() {

        beforeEach(() => {
            return Tmp.dir({unsafeCleanup: true})
                .then(dirInfo => tmpDirInfo = dirInfo)
        });

        afterEach(() => {
            tmpDirInfo.cleanup();
        });

        it('Should create a repeating GIF at 2 FPS (test-case-1)', function() {
            const thumbnails = getThumbnailArray(10, 'test-case-1');
            const outputGifFilePath = Path.resolve(tmpDirInfo.path, 'output.gif');

            return GifCreationService.createAnimatedGifFromPngImages(thumbnails, outputGifFilePath, {repeat:true, fps:2})
            .then(outputGifFilePath => {
                Fs.existsSync(outputGifFilePath).should.be.True();
                confirmOutputFile(outputGifFilePath, 'test-case-1/output.gif');
            });
        });

        it('Should create a non-repeating GIF at 8 FPS (test-case-2)', function() {
            const thumbnails = getThumbnailArray(30, 'test-case-2');
            const outputGifFilePath = Path.resolve(tmpDirInfo.path, 'output.gif');

            return GifCreationService.createAnimatedGifFromPngImages(thumbnails, outputGifFilePath, {repeat:false, fps:8})
            .then(outputGifFilePath => {
                Fs.existsSync(outputGifFilePath).should.be.True();
            });
        });

    })

});

function getThumbnailArray(numThumbnails, testCaseFolder) {
    const thumbnails = [];
    for (let i=1; i<=numThumbnails; i++) {
        const num = i < 10 ? `0${i}` : ''+i;
        thumbnails.push(Path.resolve(__dirname, `../unit-helper/${testCaseFolder}/thumbnail-00${num}.png`));
    }
    return thumbnails;
}

function confirmOutputFile(outputGifFilePath, expectedGifFilePath) {
    expectedGifFilePath = Path.resolve(__dirname, '../unit-helper/', expectedGifFilePath);

    const outputGifFileContents = Fs.readFileSync(outputGifFilePath);
    const expectedGifFileContents = Fs.readFileSync(expectedGifFilePath);

    outputGifFileContents.should.eql(expectedGifFileContents);
}