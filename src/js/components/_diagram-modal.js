import { OPEN, ACTIVE } from '../_constants';

export default (function() {

  const $modalOpen = $('.js-diagram-modal-open');
  const $modalOverlay = $('.js-diagram-modal-overlay');

  $modalOpen
    .hover(function() { 
      if (window.matchMedia(`(max-width: ${1280}px)`).matches) return;
      $(this).addClass(ACTIVE);
      $modalOverlay.addClass(OPEN);
    }, function() {
      if (window.matchMedia(`(max-width: ${1280}px)`).matches) return;
      $(this).removeClass(ACTIVE);
      $modalOverlay.removeClass(OPEN);
    });

})();
