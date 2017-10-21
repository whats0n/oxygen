import { OPEN, ACTIVE, BODY } from '../_constants';
import { TOUCH } from '../_utils';

import tooltipster from 'tooltipster';
require('tooltipster-follower');

export default (function() {

  const $modalOpen = $('[data-diagram-modal="parent"]');
  const $modalOverlay = $('.js-diagram-modal-overlay');

  const $infoBox = $('.js-diagram-info-box');

  $infoBox.each(function() {
    const $this = $(this);
    const $infoBoxOpen = $this.find('.js-diagram-info-box-open');

    $infoBoxOpen.on('click', function(e) {
      if (!window.matchMedia(`(max-width: ${767}px)`).matches) return;
      e.preventDefault();
      if ($this.hasClass(OPEN)) {
        $this.removeClass(OPEN);
      } else {
        $infoBox.removeClass(OPEN);
        $this.addClass(OPEN);
      }
    });
  });

  $modalOpen.each(function() {
    const $this = $(this);

    $this.hover(function() {
      if (TOUCH()) return;
      $this.addClass(ACTIVE);
      $modalOverlay.addClass(OPEN);
    }, function() {
      if (TOUCH()) return;
      $this.removeClass(ACTIVE);
      $modalOverlay.removeClass(OPEN);
    });

    if (TOUCH()) return;
    $modalOpen.tooltipster({
      anchor: 'top-left',
      minWidth: 400,
      maxWidth: 400,
      delay: 0,
      animationDuration: 200,
      side: 'right',
      trigger: 'hover'
    });
  });


})();
