export function formatFileSize(bytes) : number {
    if (bytes === 0) return 0;
    const k = 1024;
    // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const size = 'MB'
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  }

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
  