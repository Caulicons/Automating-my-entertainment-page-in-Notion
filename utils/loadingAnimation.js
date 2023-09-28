import logUpdate from "log-update";

let frames = ["/", "-", "\\", "|"];

export default function loadingAnimation(comment) {
  let i = 0;
  const interval = setInterval(() => {
    const frame = frames[i++ % frames.length];
    logUpdate('\n', comment, frame, '\n');
  }, 200)

  return interval
}
