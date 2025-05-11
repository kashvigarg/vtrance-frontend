import api from './api';

const getUploadUrl = async (videoName, type, resolution) => {
  const input = {
    "name":videoName,
    "type":type, 
    "resolution":resolution
  }
  const res = await api.post('/upload-Url', input);
  // name, videoid, uploadurl
  return res.data; 
}

export const uploadVideo = async (videoName, processType, outputFmt, codecFmt, resolution, videoHeight, videoType) => {
  // upload video to the upload url
  urlResponse = await getUploadUrl(videoName, videoType, videoHeight);
  // get videoid
  
  // notify upload
  const data = {
    "videoId" : videoId,
    "type" : processType.toUpperCase(),
    "options" : {
      "output" : outputFmt,
      "codec" : codecFmt,
      "resolution" : resolution,
    }
  }
  const res = await api.post('/notifyUpload', data);
  // jobid
  return res.data; 
}

export const getUserVideos = async () => {
    const res = await api.get('/getVideos', userId); 
    // list of [name, url]
    return res.data; 
};

export const getJobStatus = async (jobId) => {
  const poll = async () => {
    const res = await api.get(`/jobStatus/${jobId}`);
    const status = res.data?.status;

    if (status === "REJECTED" || status === "COMPLETED") {
      return status;
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await poll();
    }
  };

  return await poll();
};


export const fetchStreamVideoUrl = async(videoId) => {
  const res = await api.get(`/fetchVideo/${videoId}`)

  return res.data;
  // name
  // stream url
}

export const fetchDownloadVideoUrl = async(videoId) => {
  const res = await api.get(`/downloadVideo/${videoId}`)

  return res.data;
  // download url
}
