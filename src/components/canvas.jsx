import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation";

const frameStyle = {
  fontSize: "1.5vh",
  position: "absolute",
  top: "0",
  left: '0',
  margin: "1vh",
  color: 'rgba(0, 0, 0, 0.3)',
}

export const Canvas = ({ universe, dimension, isPlaying, setIsPlaying }) => {
  const [genCount, setGenCount] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [fps, setFps] = useState(window.localStorage.getItem('fps') || 30);
  const canvasRef = useAnimation({
    universe,
    setGenCount,
    isPlaying,
    setIsPlaying,
    setAvgFps,
    fps,
  });

  return (
    <>
      {isPlaying && <span style={frameStyle}>{avgFps} / {fps == 10000 ? 'Max' : fps}</span>}
      <h3 style={{ margin: "0px 0px 5px 0px" }}>Game of Life</h3>
      <i style={{ margin: "0px 0px 10px 0px", fontSize: "10px" }}>
        Dimension: {dimension} | Generation: {genCount}
      </i>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <button className="controls" onClick={() => {
          setIsPlaying(!isPlaying)
          window.navigator.vibrate(1);
        }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
            className="controls"
            onClick={isPlaying ? () => {
              // setIsPlaying(true);
              universe.clear_all();
              setGenCount(0);
              setIsPlaying(false);
              window.navigator.vibrate(1);
            } : () => {
              window.location.reload();
              window.navigator.vibrate(1);
            }}
          >
            {isPlaying ? 'Clear' : 'Random'}
          </button>
        <select
          className="controls"
          value={fps}
          onChange={(event) => {
            const val = parseInt(event.target.value);
            setFps(val);
            window.localStorage.setItem('fps', val);
          }}
        >
          <option value="1">1 fps</option>
          <option value="5">5 fps</option>
          <option value="10">10 fps</option>
          <option value="20">20 fps</option>
          <option value="30">30 fps</option>
          <option value="60">60 fps</option>
          <option value="10000">Max fps</option>
        </select>
      </div>
      <canvas ref={canvasRef} />
    </>
  );
};
