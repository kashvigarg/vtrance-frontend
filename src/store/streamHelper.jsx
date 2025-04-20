// const { Observable, fromEvent, partition, combineLatest, zip } = rxjs;
// const { map, flatMap, take, skip } = rxjs.operators;

// console.log("HI?")
// const bufferStream = (filename) =>
//   new Observable(async (subscriber) => {
//     console.log("CREATING FFMPeg")
//     const ffmpeg = FFmpeg.createFFmpeg({
//       corePath: "thirdparty/ffmpeg-core.js",
//       log: true,
//     });

//     const fileExists = (file) => ffmpeg.FS("readdir", "/").includes(file);
//     const readFile = (file) => ffmpeg.FS("readFile", file);

//     await ffmpeg.load();
//     const sourceBuffer = await fetch(filename).then((r) => r.arrayBuffer());
//     ffmpeg.FS(
//       "writeFile",
//       "input.mp4",
//       new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength)
//     );

//     let index = 0;

//     ffmpeg
//       .run(
//         "-i",
//         "input.mp4",
//         // Encode for MediaStream
//         "-segment_format_options",
//         "movflags=frag_keyframe+empty_moov+default_base_moof",
//         // encode 5 second segments
//         "-segment_time",
//         "5",
//         // write to files by index
//         "-f",
//         "segment",
//         "%d.mp4"
//       )
//       .then(() => {
//         // send out the remaining files
//         while (fileExists(`${index}.mp4`)) {
//           subscriber.next(readFile(`${index}.mp4`));
//           index++;
//         }
//         subscriber.complete();
//       });

//     setInterval(() => {
//       // periodically check for files that have been written
//       if (fileExists(`${index + 1}.mp4`)) {
//         subscriber.next(readFile(`${index}.mp4`));
//         index++;
//       }
//     }, 200);
//   });

// const mediaSource = new MediaSource();
// videoPlayer.src = URL.createObjectURL(mediaSource);
// videoPlayer.play();

// const mediaSourceOpen = fromEvent(mediaSource, "sourceopen");

// const bufferStreamReady = combineLatest(
//   mediaSourceOpen,
//   bufferStream("4club-JTV-i63.avi")
// ).pipe(map(([, a]) => a));

// const sourceBufferUpdateEnd = bufferStreamReady.pipe(
//     take(1),
//     map(buffer => {
//       // create a buffer using the correct mime type
//       const mime = `video/mp4; codecs="${muxjs.mp4.probe
//         .tracks(buffer)
//         .map(t => t.codec)
//         .join(",")}"`;
//       const sourceBuf = mediaSource.addSourceBuffer(mime);
  
//       // append the buffer
//       mediaSource.duration = 5;
//       sourceBuf.timestampOffset = 0;
//       sourceBuf.appendBuffer(buffer);
  
//       // create a new event stream 
//       return fromEvent(sourceBuf, "updateend").pipe(map(() => sourceBuf));
//     }),
//     flatMap(value => value)
//   );

//   zip(sourceBufferUpdateEnd, bufferStreamReady.pipe(skip(1)))
//   .pipe(
//     map(([sourceBuf, buffer], index) => {
//       mediaSource.duration = 10 + index * 5;
//       sourceBuf.timestampOffset = 5 + index * 5;
//       sourceBuf.appendBuffer(buffer.buffer);
//     })
//   )
//   .subscribe();

// const sourceBuffer = await fetch("input.avi").then(r => r.arrayBuffer());

// // create the FFmpeg instance and load it
// const ffmpeg = createFFmpeg({ log: true });
// await ffmpeg.load();

// // write the AVI to the FFmpeg file system
// ffmpeg.FS(
//   "writeFile",
//   "input.avi",
//   new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength)
// );

// // run the FFmpeg command-line tool, converting the AVI into an MP4
// await ffmpeg.run("-i", "input.avi", "output.mp4");

// // read the MP4 file back from the FFmpeg file system
// const output = ffmpeg.FS("readFile", "output.mp4");

// // ... and now do something with the file
// const video = document.getElementById("video");
// video.src = URL.createObjectURL(
//   new Blob([output.buffer], { type: "video/mp4" })
// );