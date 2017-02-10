document.addEventListener('DOMContentLoaded', function() {
  var indexSlider = document.querySelector('.index-slider');

  if (indexSlider) {
    $(indexSlider).slick({
      accessibility: false,
      dots: true,
      appendArrows: '.index-slider__arrows-wrapper'
    });
  }
});
