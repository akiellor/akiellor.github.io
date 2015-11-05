import $ from 'jquery';

export function asciimate(dom) {
  var scene = $(dom).text().split('-----\n');
  var currentFrameIndex = 0;
  setInterval(function() {
    console.log(currentFrameIndex);
    var frame = scene[currentFrameIndex % scene.length];
    $(dom).text(frame);
    currentFrameIndex++
  }, 1000)
}

export function install() {
  $(function() {
    setTimeout(function() {
      $('.asciimate').each((i,e) => asciimate(e));
    }, 1000);
  });
}
