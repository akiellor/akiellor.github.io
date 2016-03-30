export function asciimate(dom) {
  var scene = dom.innerHTML.split('-----\n');
  var currentFrameIndex = 0;
  setInterval(function() {
    var frame = scene[currentFrameIndex % scene.length];
    dom.innerHTML = frame;
    currentFrameIndex++
  }, 1000)
}
