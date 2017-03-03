// Add it after jquery.magnific-popup.js and before first initialization code
$.extend(true, $.magnificPopup.defaults, {
  tClose: 'Закрыть (Esc)', // Alt text on close button
  tLoading: 'Загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
  gallery: {
    tPrev: 'Назад (Left arrow key)', // Alt text on left arrow
    tNext: 'Вперед (Right arrow key)', // Alt text on right arrow
    tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
  },
  image: {
    tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
  },
  ajax: {
    tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
  }
});

/*=====  End of Translating magnificPopup  ======*/


// Загрузка карты
function loadMapScript() {
  var script = document.createElement("script");
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyC9a_UDjprd--E33HE4d9_S6I0yjvViR8o&callback=initializeMap";
  document.head.appendChild(script);
}

// Инициализация карты
function initializeMap() {
  var locationOffice = {
    lat: 53.249121,
    lng: 34.335855
  };

  function createProp(defaultLocation) {
    return {
      center: defaultLocation,
      zoom: 16,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
    };
  }

  var mapProp = createProp(locationOffice);
  var map = new google.maps.Map(document.getElementById("location-map"), mapProp);
  var markerPriem = new google.maps.Marker({
    position: locationOffice,
    map: map,
    title: 'PITLINE Брянск'
  });
}

// Выровнять элементы по высоте.
// elements - строка селектора, напр. '.element'
function setMaxHeight(elements) {
  var maxHeight = 0;
  elements = document.querySelectorAll(elements);

  if (!elements.length) {
    return;
  }

  Array.prototype.forEach.call(elements, function findMaxHeight(element) {
    maxHeight = (maxHeight > element.clientHeight) ? maxHeight : element.clientHeight;
  });

  Array.prototype.forEach.call(elements, function specifyMaxHeight(element) {
    element.style.height = maxHeight + 'px';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var indexSlider = document.querySelector('.index-slider');

  if (indexSlider) {
    $(indexSlider).slick({
      accessibility: false,
      dots: true,
      appendArrows: '.index-slider__arrows-wrapper'
    });
  }

  if ('matchMedia' in window) {
    if (matchMedia('(min-width: 400px)').matches) {
      setMaxHeight('.product-card__title');
      setMaxHeight('.product-card__properties');
    }
  }



  var locationMap = document.querySelector('#location-map');

  if (locationMap) {
    loadMapScript();
  }


  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    removalDelay: 300
  });

  $('.product-main-photo').magnificPopup({
    delegate: 'a',
    type: 'image',
    mainClass: 'popup-fade',
    removalDelay: 300,
    gallery: {
      enabled: true
    },
    retina: {
      ratio: 2
    }
  });


  // Tabs
  $('.tabs').tabslet();

  /*==============================
  =            Filter            =
  ==============================*/

  // var queryString = location.search.substring(1);
  // var vars = queryString.split('&');
  // console.log(queryString, vars);
  // 
  var parseQueryString = function() {

    var str = window.location.search;
    var objURL = {};

    str.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) {
        objURL[$1] = $3;
      }
    );
    return objURL;
  };



  var $filter = $('.filter');

  if ($filter.length) {

    var params = parseQueryString();

    var $grid = $('.products-grid').isotope({
      itemSelector: '.product-card'
    });

    $('.filter__list').on('click', 'a', function(event) {
      event.preventDefault();
      var filterValue = '.' + this.dataset.filter;
      console.log(filterValue, 'click');

      $('.filter__list').find('.current').removeClass('current');
      $(this).closest('li').addClass('current');

      $grid.isotope({
        filter: filterValue
      });
    });

    $('.filter__select').on('change', function(event) {
      var filterValue = '.' + this.value;
      console.log(filterValue);
      $grid.isotope({
        filter: filterValue
      });
    });

    var param = decodeURIComponent(params['filter-id']) || '*';

    console.log(param);

    $('[data-filter="' + param +'"]').trigger('click');
    console.log($('[data-filter="' + param +'"]'));

  }

  /*=====  End of Filter  ======*/

});
