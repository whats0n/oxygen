import { WIN, BODY, SHOW } from '../_constants';

;(function() {

  let btnScroll = $('.js-btn-scroll');
  let link = $('.js-help-link');
  WIN.on('mousewheel scroll', () => {
    if (BODY.hasClass('hide-help')) return;
    if (!BODY.hasClass('hide-help')) btnScroll.trigger('click');
  });

  btnScroll.on('click', () => {
    if (BODY.hasClass('hide-help')) return;
    BODY.addClass('hide-help');
    setTimeout(() => BODY.addClass('is-clear'), 600);
    return false;
  });
  if (!link.length) return;
  setTimeout(() => link.addClass(SHOW), 2000);

})();
