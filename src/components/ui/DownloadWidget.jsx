const CustomDownloadWidget = ({ downloadLink = "download link here..." , fileName = '' , outputFormat = ''}) => {
  const handleDownload = async () => {
    if (!downloadLink) {
      alert('Download link not available.');
      return;
    }

    try {
      const response = await fetch(downloadLink, { mode: 'cors' });
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to download the video.');
    }
  };

  return (
    <div>
      <h2>Download your Video</h2>

      <div>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default CustomDownloadWidget;
