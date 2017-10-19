import { HTMLBODY } from '../_constants';
;(function() {
  let hash = window.location.hash.slice(1);
  let popup = $('.js-modal-thanks');
  let popupHash = popup.data('hash');
  if (hash === popupHash) {
    HTMLBODY.trigger('scroll');
    setTimeout(() => {
      popup.addClass('is-open');
    }, 700);
  };
})();
