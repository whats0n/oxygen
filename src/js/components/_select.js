import select2 from 'select2';

export default (function() {

  const $select = $('.js-select');

  $select.each(function() {

    const $this = $(this);
    $this
      .find('select');
    $('select').select2({
      allowClear: true,
      minimumResultsForSearch: Infinity
    });
  });

})();
