import '../lib/_module-loader';
import '../lib/_utils';
import '../lib/_toggleDisabled';
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
    let valid = true;

    $checkboxes.each(function() {
      if (!$(this).prop('checked')) valid = false;
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

  const reportStep = (step) => {
    switch(step) {
      case FIRST:
        gtag('config', 'UA-107870302-1',
          {
            'page_title': 'step1_confirm',
            'page_location': 'http://oxygen.trade/step1_confirm',
            'page_path': '/step1_confirm'
          }
        );
        break;

      case SECOND:
        gtag('config', 'UA-107870302-1',
          {
            'page_title': 'step2_details',
            'page_location': 'http://oxygen.trade/step2_details',
            'page_path': '/step2_details'
          }
        );
        break;

      case THIRD:
        gtag('config', 'UA-107870302-1',
          {
            'page_title': 'step3_success',
            'page_location': 'http://oxygen.trade/step3_success',
            'page_path': '/step3_success'
          }
        );
        break;
    }
  };

  //functionality
  $form.each(function() {
    const $this = $(this);
    const config = {
      form: $this,
      errorMessageClass: 'error-block',
      scrollToTopOnError: false,
      onSuccess: function($currentForm) {
        const step = $currentForm.data('validation-step');
        reportStep(step);
        switch(step) {
          case FIRST:
            const $emailFieldFirst = $currentForm.find('.js-validation-email-first');
            const $emailFieldSecond = $('.js-validation-email-second');

            const emailValue = $emailFieldFirst.val();

            $emailFieldSecond.val(emailValue);
            setTimeout(() => {
              $emailFieldSecond.trigger('change');
            }, 400);

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
    };

    if ($this.closest('.js-modal-second').length) {
      config.modules = 'toggleDisabled';
      config.disabledFormFilter = $this;
    };


    $this.submit(e => e.preventDefault());

    $.validate(config);

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
