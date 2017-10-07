import { WIN, SHOW, FIXED } from '../_constants';

;(function() {
  let header = $('.js-header');
  let lastScrollTop = 0;
  let menuFixed = (position) => { (position > 0) ? header.addClass(FIXED) : header.removeClass(FIXED); };
  WIN.scroll( function(event) {
    let scrollPosition = $(this).scrollTop();
    (scrollPosition > lastScrollTop) 
      ? header.removeClass(SHOW)
      : header.addClass(SHOW);
    lastScrollTop = scrollPosition;
    menuFixed(scrollPosition);
  });


})();
