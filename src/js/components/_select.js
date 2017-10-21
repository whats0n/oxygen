import select2 from 'select2';

export default (function() {

  const $select = $('.js-select');

  $select.each(function() {

    const $this = $(this);
    $this
      .find('select')
      .select2({
      	dropdownParent: $this,
      	minimumResultsForSearch: Infinity
      });

  });

})();
