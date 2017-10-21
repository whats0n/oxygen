import { BODY, OPEN } from './../_constants';
;(function() {
  let btn = $('.js-btn-menu');
  let header = $('.js-header');
  btn.on('click', () => {
    ( !header.hasClass( OPEN ) ) 
      ? header.addClass(OPEN)
      : header.removeClass(OPEN);
    return false;
  });
  BODY.on('click touchend', (e) => {
    let target = $(e.target);
    if ( target.closest(btn).length || target.closest(header).length ) return;
    header.removeClass(OPEN);
  });
})();
