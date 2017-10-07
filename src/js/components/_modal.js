import { OPEN } from '../_constants';

export default (function() {
  const $modalClose = $('.js-modal-close');
  const $modalOpen = $('.js-modal-open');
  const $modal = $('.js-modal');
  const $emailFirst = $('.js-validation-email-first');
  const $emailSecond = $('.js-validation-email-second');

  const closeAndClear = $currentModal => {
    $currentModal.removeClass(OPEN);

    const $form = $modal.find('form');

    if (!$form.length) return;
      
    $form.each(function() {
      this.reset();
    });

    $form.find('.js-validation-submit').prop('disabled', true);
  };

  const setEmailValue = () => {
    let value = null;
    $emailFirst.each(function() {
      const fieldValue = $(this).val();

      if (!value && !!fieldValue) return;
      value = fieldValue;
    });

    $emailFirst.val(value);
  };

  $modalClose.on('click', function(e) {
    e.preventDefault();
    const $currentModal = $(this).closest('.js-modal');
    closeAndClear($currentModal);
  });

  $modalOpen.on('click', function(e) {
    e.preventDefault();
    const modalTarget = $(this).data('modal-target');
    $modal
      .filter(`[data-modal="${modalTarget}"]`)
      .addClass(OPEN);

    setEmailValue();
  });

  $modal.click(function(e) {
  	const $target = $(e.target);
  	if ($target.closest('.js-modal-container').length) return;
    closeAndClear($(this));
  });

})();
