import api from './api';

export const sendVideoDetails = async (videoName) => {
  // returns the video id
  const res = await api.post('/', videoName);
  return res.data; 
}

export const uploadVideo = async (video) => {
  const res = await api.post('/', video);
  return res.data; 
};

export const processVideo = async (videoId, processType, outputFmt, codecFmt, resolution) => {
  const data = {
    "videoId" : videoId,
    "type" : processType,
    "options" : {
      "output" : outputFmt,
      "codec" : codecFmt,
      "resolution" : resolution,
    }
  }
  const res = await api.post('/', data);
  return res.data; 
}

export const getUserVideos = async (userId) => {
    const res = await api.post('/', userId); 
    return res.data; 
};
  

// long polling example
// async function subscribe() {
//   let response = await fetch("/subscribe");

//   if (response.status == 502) {
//     // Status 502 is a connection timeout error,
//     // may happen when the connection was pending for too long,
//     // and the remote server or a proxy closed it
//     // let's reconnect
//     await subscribe();
//   } else if (response.status != 200) {
//     // An error - let's show it
//     showMessage(response.statusText);
//     // Reconnect in one second
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     await subscribe();
//   } else {
//     // Get and show the message
//     let message = await response.text();
//     showMessage(message);
//     // Call subscribe() again to get the next message
//     await subscribe();
//   }
// }