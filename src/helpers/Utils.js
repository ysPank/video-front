/**
 * Handle warning before closing window,
 * default message will be displayed
 * @returns {Function} Cleanup function
 */
export const handleBlockUnload = () => {
  window.onbeforeunload = () => 'Are you sure you want to leave?';

  return () => window.onbeforeunload = null;
}

export const getPreviewFromVideo = (video) => {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL();

      resolve(dataURL)
    }
  })
}
