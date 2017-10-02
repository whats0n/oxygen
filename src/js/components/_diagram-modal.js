import { OPEN, ACTIVE } from '../_constants';

export default (function() {

  const $modalOpen = $('.js-diagram-modal-open');
  const $modalOverlay = $('.js-diagram-modal-overlay');



  $modalOpen.each(function() {
    const $this = $(this);
    const $modalTarget = $this.find('.js-diagram-modal-target');
    const $modalWindow = $this.find('.js-diagram-modal-window');

    $this.hover(function() {
      if (window.matchMedia(`(max-width: ${1280}px)`).matches) return;
      $this.addClass(ACTIVE);
      $modalOverlay.addClass(OPEN);
    }, function() {
      if (window.matchMedia(`(max-width: ${1280}px)`).matches) return;
      $this.removeClass(ACTIVE);
      $modalOverlay.removeClass(OPEN);
    });

  	// $modalTarget.on('mousemove', function(e) {
      
    //    	if (window.matchMedia(`(max-width: ${1280}px)`).matches) return;

  	// 	const offset = $modalTarget.offset();
  	// 	const offsetTop = offset.top;
  	// 	const offsetLeft = offset.left;

  	// 	const scrollTop = $(window).scrollTop();
  	// 	const scrollLeft = $(window).scrollLeft();

  	// 	const mouseY = e.clientY;
  	// 	const mouseX = e.clientX;

  	// 	console.log(offsetTop, offsetLeft);
  	// 	console.log(mouseY, mouseX);

  	// 	const top = mouseY - (offsetTop - scrollTop);
  	// 	const left = mouseX - (offsetLeft - scrollLeft);

  	// 	console.log(scrollTop);
  	// 	console.log(scrollLeft);

  	// 	$modalWindow.css({
  	// 		top: `${top}px`,
  	// 		left: `${left}px`
  	// 	});

  	// });
  
  });


})();
