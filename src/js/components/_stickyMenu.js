import { WIN, SHOW, FIXED, BODY } from '../_constants';

;(function() { let header = $('.js-header');
  let lastScrollTop = 0;
  WIN.scroll( function(event) {
    let scrollPosition = $(this).scrollTop();
    (scrollPosition > lastScrollTop) 
      ? header.removeClass(SHOW)
      : header.addClass(SHOW);
    lastScrollTop = scrollPosition;
    menuFixed(scrollPosition);
  });

  let menuFixed = (position) => { (position > 10 ) ? header.addClass(FIXED) : header.removeClass(FIXED); };

})();
