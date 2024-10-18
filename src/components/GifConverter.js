import React, { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });

export default function GifConverter({ gif, setGif }) {
  const [ready, isReady] = useState(false);
  const [video, setVideo] = useState();

  const load = async () => {
    await ffmpeg.load();
    isReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const convertToGif = async () => {
    ffmpeg.FS("writeFile", "giphy.mp4", await fetchFile(video));

    await ffmpeg.run("-i", "giphy.mp4", "-f", "gif", "out.gif");

    const data = ffmpeg.FS("readFile", "out.gif");

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );

    setGif(url);
  };

  return ready ? (
    <div className="App">
      {video && (
        <video controls width="250" src={URL.createObjectURL(video)}></video>
      )}
      <br />
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />

      <h3>Result</h3>

      <button onClick={convertToGif}>Convert to GIF</button>
      <br />
      {gif && <img src={gif} width="250"></img>}
    </div>
  ) : (
    <p>Please wait...</p>
  );
}
