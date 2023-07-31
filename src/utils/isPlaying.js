function isPlaying(video) {
  return (
    !video.paused
    && !video.ended
    && (
      video.readyState === HTMLMediaElement.HAVE_NOTHING
      || video.readyState === HTMLMediaElement.HAVE_METADATA
      || video.readyState === HTMLMediaElement.HAVE_CURRENT_DATA
    )
  );
}

export default isPlaying;
