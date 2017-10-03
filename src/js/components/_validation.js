import { validate } from 'jquery-form-validator';
import { OPEN } from '../_constants';

export default (function() {

  const $form = $('.js-validation');
  const $modalFirst = $('.js-modal-first');
  const $modalSecond = $('.js-modal-second');
  const $modalThird = $('.js-modal-third');
  const $modalClose = $('.js-modal-close');

  //steps
  const FIRST = 'first';
  const SECOND = 'second';
  const THIRD = 'third';

  //utils
  const nextStep = ($nextModal, $prevModal) => {
    $nextModal && $nextModal.length && $nextModal.addClass(OPEN);
    $prevModal && $prevModal.length && $prevModal.removeClass(OPEN);
  };

  const validateCheckboxes = ($checkboxes) => {
    let valid = false;
    $checkboxes.each(function() {
      if (valid) return;
      valid = $(this).prop('checked');
    });
    return valid;
  };

  const closeModal = $modal => $modal.removeClass(OPEN);

  //functionality
  $modalClose.on('click', function(e) {
    e.preventDefault();
    $(this)
      .closest('.js-modal')
      .removeClass(OPEN);
  });

  $form.each(function() {
    const $this = $(this);

    $this.submit(e => e.preventDefault());

    $.validate({
      form: this,
      errorMessageClass: 'error-block',
      scrollToTopOnError: false,
      onSuccess: function($currentForm) {
        const step = $currentForm.data('validation-step');
        switch(step) {
          case FIRST:
            nextStep($modalFirst, null);
            return false;
          case SECOND:
            nextStep($modalSecond, $modalFirst);
            return false;
          case THIRD:
            nextStep($modalThird, $modalSecond);
            return false;
        }
      }
    });

    //checkboxes
    const $checkboxes = $this.find('.js-validation-checkbox');
    const $submitButton = $this.find('.js-validation-submit');

    $checkboxes.on('change', (e) => {

      const valid = validateCheckboxes($checkboxes);

      if (valid) {
        $submitButton.prop('disabled', false);
      } else {
        $submitButton.prop('disabled', true);
      }
    });

  });

})();
