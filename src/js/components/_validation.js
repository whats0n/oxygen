import { validate } from 'jquery-form-validator';
import { OPEN } from '../_constants';

export default (function() {

  const $form = $('.js-validation');
  const $modalFirst = $('.js-modal-first');
  const $modalSecond = $('.js-modal-second');
  const $modalThird = $('.js-modal-third');

  //steps
  const FIRST = 'first';
  const SECOND = 'second';
  const THIRD = 'third';
  const DATA = {
    first: null,
    second: null,
    third: null,
    result: null
  };

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

  const sendMessage = props => {
    console.log(props.data);
    $.ajax({
      type: 'POST',
      // url: 'http://www.whats0n.pro/send.php',
      url: './send.php',
      data: props.data, // serializes the form's elements.
      success: function(data) {
        nextStep($modalThird, $modalSecond);
      }
    });
  };

  //functionality
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
            DATA.first = $currentForm.serialize();
            return false;
          case SECOND:
            nextStep($modalSecond, $modalFirst);
            DATA.second = $currentForm.serialize();
            return false;
          case THIRD:
            nextStep($modalThird, $modalSecond);
            DATA.third = $currentForm.serialize();
            DATA.result = `${DATA.first}&${DATA.second}&${DATA.third}`;
            sendMessage({
              data: DATA.result
            });
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
