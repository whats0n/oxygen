import { OPEN } from '../_constants';

export default (function() {
  const $modalClose = $('.js-modal-close');
  const $modalOpen = $('.js-modal-open');
  const $modal = $('.js-modal');

  $modalClose.on('click', function(e) {
    e.preventDefault();
    $(this)
      .closest('.js-modal')
      .removeClass(OPEN);
  });

  $modalOpen.on('click', function(e) {
    e.preventDefault();
    const modalTarget = $(this).data('modal-target');
    $modal
      .filter(`[data-modal="${modalTarget}"]`)
      .addClass(OPEN);
  });

  $modal.click(function(e) {
  	const $target = $(e.target);
  	if ($target.closest('.js-modal-container').length) return;
  	$(this).removeClass(OPEN);
  });

})();
