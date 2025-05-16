import api from './api';
import { getOutputExtension } from '../components/utils/helperMethods';

export const getUploadUrl = async (videoName, type, resolution) => {
  const input = {
    "name":videoName,
    "type":type, 
    "resolution":resolution
  }
  const res = await api.post('/tranceapi/upload-Url', 
    JSON.stringify(input)
  );
  return {"url": res.data.uploadurl, "videoid": res.data.videoid}; 
}

export const notifyUpload = async (processType, outputFmt, codecFmt, resolution, videoId) => {
  let outputExt = getOutputExtension(outputFmt)
  const data = {
    "videoId" : videoId,
    "type" : processType.toUpperCase(),
    "options" : {
      "output" : outputExt,
      "codec" : codecFmt,
      "resolution" : resolution,
    }
  }
  const res = await api.post('/tranceapi/notifyUpload', data);
  return res.data; 
}

export const getUserVideos = async () => {
    const res = await api.get('/tranceapi/getVideos', userId); 
    return res.data; 
};

export const getJobStatus = async (jobId) => {
  const poll = async () => {
    const res = await api.get(`/tranceapi/jobStatus/${jobId}`);
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
  const res = await api.get(`/tranceapi/fetchVideo/${videoId}`)

  return res.data;
}

export const fetchDownloadVideoUrl = async(videoId) => {
  const res = await api.get(`/tranceapi/downloadVideo/${videoId}`)

  return res.data;
}
