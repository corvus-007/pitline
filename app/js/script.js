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
      autoplay: true,
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


  $('.js-trigger-image-popup').magnificPopup({
    type: 'image',
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


  function getHashFilter() {
    var hash = location.hash;
    // get filter=filterName
    var matches = location.hash.match( /filter=([^&]+)/i );
    var hashFilter = matches && matches[1];

    if (!hashFilter) {
      return '*';
    }
    return hashFilter && decodeURIComponent( hashFilter );
  }

  var $filter = $('.filter');

  if ($filter.length) {
    var $grid = $('.products-grid');
    var $filters = $filter.on( 'click', 'a', function(event) {
      event.preventDefault();
      var filterAttr = $( this ).data('filter');
      console.log(filterAttr)
      // set filter in hash
      location.hash = 'filter=' + encodeURIComponent( filterAttr );
    });

    var isIsotopeInit = false;
    onHashchange();
  }

    

    // bind filter button click


    function onHashchange() {
      var hashFilter = getHashFilter();
      hashFilter = (hashFilter != '*') ? hashFilter: 'product-card';
      if ( !hashFilter && isIsotopeInit ) {
        return;
      }
      isIsotopeInit = true;
      // filter isotope
      $grid.isotope({
        itemSelector: '.product-card',
        filter: '.' + hashFilter
      });
      // set selected class on button
      if ( hashFilter ) {
        $filters.find('.current').removeClass('current');
        $filters.find('[data-filter="' + hashFilter + '"]').closest('li').addClass('current');
      }
    }

    $(window).on( 'hashchange', onHashchange );
    // trigger event handler to init Isotope

  /*=====  End of Filter  ======*/



  /*======================================
  =            Yandex targets            =
  ======================================*/
  
  // Заказ отправлен (полностью завершили заказ и нажали кнопку "Подтвердить")
  $('.woocommerce-checkout').on('submit', function() {
    yaCounter43474974.reachGoal('ORDER_SEND');
  });


  // Добавили товар в корзину
  $('.product-card__add-to-cart').on('click', targetAddToCart);
  $('form.cart').on('submit', targetAddToCart);

  function targetAddToCart() {
    yaCounter43474974.reachGoal('ADD_TO_CART');
  }


  // Перешли в корзину и нажали на кнопку "Перейти к оформлению"
  $('.wc-proceed-to-checkout .checkout-button').on('click', function() {
    yaCounter43474974.reachGoal('ORDER_FORM');
  });


  // Отправили форму обратной связи (в шапке) 
  $('#popup-callback form').on('submit', function() {
    yaCounter43474974.reachGoal('CALLBACK_FORM');
  });


  // Кликнули по адресу email в шапке сайта
  $('[href="mailto:info@pitline32.ru"]').on('click', function() {
    yaCounter43474974.reachGoal('CLICK_TO_EMAIL');
  });
  
  /*=====  End of Yandex targets  ======*/

  

});
