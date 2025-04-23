import formatFileSize from "../ui/helper";

export const getVideoMetadata = (file: File): Promise<{
    fileUrl: string;
    fileName: string;
    fileSize: number; // MB
    fileType: string; 
    fileDuration: number; // seconds
    fileHeight: number; // px
    fileWidth: number; // px
  }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const fileUrl = URL.createObjectURL(file);
      video.preload = "metadata";
  
      video.onloadedmetadata = () => {
        resolve({
          fileUrl,
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          fileType: file.type,
          fileDuration: video.duration,
          fileHeight: video.videoHeight,
          fileWidth: video.videoWidth,
        });
      };
  
      video.onerror = () => {
        reject("Failed to load video metadata.");
      };
  
      video.src = fileUrl;
    });
  };
  