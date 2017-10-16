import { WIN, BODY } from '../_constants';

;(function() {

  let btnScroll = $('.js-btn-scroll');
  WIN.on('mousewheel scroll', () => {
    if (BODY.hasClass('unfix') && !BODY.hasClass('hide-help')) btnScroll.trigger('click');
  });

  btnScroll.on('click', () => {
    BODY.addClass('hide-help');
    setTimeout(() => BODY.css('overflow-y', 'auto'), 600);
  });

})();
