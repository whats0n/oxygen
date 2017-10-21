import { OPEN, BODY } from '../_constants';
import { SCROLL_WIDTH } from './_scrollWidth';
import { debounce } from 'throttle-debounce';

export default (function() {
  const $modalClose = $('.js-modal-close');
  const $modalOpen = $('.js-modal-open');
  const $modal = $('.js-modal');
  const $emailFirst = $('.js-validation-email-first');
  const $emailSecond = $('.js-validation-email-second');
  const $amountVal = $('#step_3-amount-value');
  const $amountType = $('#step_3-amount-value-type');

  const $calcAmountOXG = $('#js-span-oxg-value');
  const $calcAmountUSD = $('#js-span-usd-value');

  const closeAndClear = $currentModal => {
    $currentModal.removeClass(OPEN);

    const $form = $modal.find('form');

    if (!$form.length) return;
    setTimeout(() => {
      BODY.css({
        'paddingRight': 0,
        'position': 'relative'
      });
    }, 100);
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

  const updateCalculated = () => {
    let val = $amountVal[0].value;
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/rate.php',
      success: function(data) {
        var usdRate = data.USD || 10;
        var ethRate = data.ETH || 3300;
        var btcRate = data.BTC || 56000;
        var amountTypeVal = $amountType[0].value;

        var actualOXGValue;
        if (amountTypeVal === 'USD') {
          actualOXGValue = val * usdRate;
        } else if (amountTypeVal === 'BTC') {
          actualOXGValue = val * btcRate;
        } else if (amountTypeVal === 'ETH') {
          actualOXGValue = val * ethRate;
        }

        $calcAmountOXG.text(Math.round(actualOXGValue * 100) / 100 + ' OXG');
        $calcAmountUSD.text(Math.round(actualOXGValue / usdRate * 100) / 100 + ' USD');
      }
    });
  };

  $amountVal.on('keydown', debounce(200, updateCalculated));
  $amountType.on('change', debounce(200, updateCalculated));

  $modalClose.on('click', function(e) {
    e.preventDefault();
    const $currentModal = $(this).closest('.js-modal');
    closeAndClear($currentModal);
  });

  $modalOpen.on('click', function(e) {
    e.preventDefault();
    const modalTarget = $(this).data('modal-target');
    BODY.css({
      'paddingRight': SCROLL_WIDTH(),
      'position': 'fixed'
    });
    $modal
      .filter(`[data-modal="${modalTarget}"]`)
      .addClass(OPEN);

    setEmailValue();

    gtag('config', 'UA-107870302-1',
      {
        'page_title': 'step1_confirm',
        'page_location': 'http://oxygen.trade/step1_confirm',
        'page_path': '/step1_confirm'
      }
    );

  });

  $modal.click(function(e) {
  	const $target = $(e.target);
  	if ($target.closest('.js-modal-container').length) return;
    closeAndClear($(this));
  });

})();
