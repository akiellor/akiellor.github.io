import $ from 'jquery';

export function asciimate(dom) {
  var scene = $(dom).html().split('-----\n');
  var currentFrameIndex = 0;
  setInterval(function() {
    var frame = scene[currentFrameIndex % scene.length];
    $(dom).html(frame);
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
