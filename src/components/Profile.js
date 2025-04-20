import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { setDragging, setSelectedFile, clearSelectedFile } from '../store/fileSlice';

const Profile = () => {
    const selectedFile = useSelector((state) => state.fileUpload.selectedFile);
    const videoRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect( () => {
        async function tryFFMPEG(){
           try {
            const ffmpeg = new FFmpeg()
            await ffmpeg.load()

            const sourceBuffer = await fetch("try.mov").then(r => r.arrayBuffer());
            if (sourceBuffer){
                console.log("SOURCE BUFFER EXISTS")
            }

            ffmpeg.on("log", ({ type, message }) => {
                console.log(type, message)
            });

            await ffmpeg.writeFile("try.mov", new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength))
            await ffmpeg.exec(['-i', "try.mov", 'try.mp4']);
            const output = await ffmpeg.readFile("video.mp4");
            if (output){
                console.log("OUTPUT EXISTS")
                console.log(output)
            }
          // ... and now do something with the file
            const video = document.getElementById("video");
            video.src = URL.createObjectURL(
            new Blob([output.buffer], { type: "video/mp4" })
            );
           } catch (error) {
            console.log(error)
           }
        }

        tryFFMPEG();
      }, []);

//     useEffect( async () => {
        
// const sourceBuffer = await fetch("input.avi").then(r => r.arrayBuffer());

// // create the FFmpeg instance and load it
// const ffmpeg = FFmpeg({ log: true });
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
//     })

    // useEffect(() => {
    //   if (selectedFile) {
    //     const url = URL.createObjectURL(selectedFile);
    //     setVideoSrc(url);
  
    //     // Cleanup when file changes or component unmounts
    //     return () => URL.revokeObjectURL(url);
    //   }
    // }, [selectedFile]);
    // const dispatch = useDispatch();

    return (
        <div style={{backgroundColor:"black", minHeight:"100vh", alignContent:"center"}}>This is the Profile Page
        <p>Testing Transcoder Streaming</p>
        <br/><br/>
        <video width="400" controls id="video" muted="muted" src={videoSrc} ref={videoRef}
        >
  Your browser does not support HTML video.
</video>
        </div>
        
    );
}

export default Profile;

