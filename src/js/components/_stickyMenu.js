import { WIN, SHOW, FIXED } from '../_constants';

;(function() { let header = $('.js-header');
  let lastScrollTop = 0;
  WIN.scroll( function(event) {
    let scrollPosition = $(this).scrollTop();
    if (WIN.width() > 768) return;
    (scrollPosition > lastScrollTop) 
      ? header.removeClass(SHOW)
      : header.addClass(SHOW);
    lastScrollTop = scrollPosition;
    menuFixed(scrollPosition);
  });

  let menuFixed = (position) => { (position > 0) ? header.addClass(FIXED) : header.removeClass(FIXED); };

})();
