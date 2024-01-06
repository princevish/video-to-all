const ffmpeg = require('@ffmpeg/ffmpeg');

const { createFFmpeg, fetchFile } = ffmpeg;
const ffmpegInstance = createFFmpeg({ log: true });


async function convertToGif(video: File):Promise<string> {
    await ffmpegInstance.load();
    // Write the file to memory 
    ffmpegInstance.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpegInstance.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

    // Read the result
    const data = ffmpegInstance.FS('readFile', 'out.gif');

    // Create a URL
    return URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
}


export { convertToGif }