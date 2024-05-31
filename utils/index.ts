export function animate(target: HTMLElement) {
  const originalText = target.textContent!.trim();
  const duration = 600;
  const emptyChar = "-";
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let animationFrameHandle = -1;
  let str = "";
  const randomIndex: Array<number> = [];
  for (let i = 0; i < originalText.length; i++) {
    let rate = i / originalText.length;
    randomIndex[i] = Math.random() * (1 - rate) + rate;
    str += emptyChar;
  }
  const startTime = new Date().getTime();
  const render = () => {
    const currTime = new Date().getTime() - startTime;
    const percent = currTime / duration;
    let str2 = "";
    if (percent > 1) {
      str2 = originalText;
      target.textContent = str2;
      cancelAnimationFrame(animationFrameHandle);
      return;
    }
    for (let i = 0; i < Math.sin(percent * Math.PI / 2) * originalText.length; i++) {
      if (percent >= randomIndex[i]) {
        str2 += originalText[i];
      } else if (percent < randomIndex[i] / 2) {
        str2 += emptyChar;
      } else {
        str2 += randomChars[Math.floor(Math.random() * randomChars.length)];
      }
    }
    target.textContent = str2;
    animationFrameHandle = requestAnimationFrame(render);
  };
  animationFrameHandle = requestAnimationFrame(render);
}
