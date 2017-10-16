import { WIN, BODY } from '../_constants';

;(function() {

  let btnScroll = $('.js-btn-scroll');
  WIN.on('mousewheel scroll', () => {
  	// BODY.hasClass('unfix') && 
    if (!BODY.hasClass('hide-help')) btnScroll.trigger('click');
  });

  btnScroll.on('click', () => {
    BODY.addClass('hide-help');
    setTimeout(() => BODY.css({
    	'position': 'static',
    	'overflow-y': 'auto'
    }), 600);
    return false;
  });

})();
