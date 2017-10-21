import { WIN, BODY, FIXED, ACTIVE } from '../_constants';
import { TOUCH, SCROLL_TO } from '../_utils';
import PerfectScrollbar from 'perfect-scrollbar';

;(function() {
  let sidebar = $('.js-sidebar');
  if (!sidebar.length) return;
  let sidebarTop = $('.js-sidebar').offset().top;
  let sidebarHeight = $('.js-sidebar-wrap').outerHeight();
  let footerTop = $('.footer').offset().top;
  
  WIN.scroll( function(event) {
  	if (WIN.width() <= 1040) return;
    let scrollPosition = $(this).scrollTop();

    (scrollPosition >= sidebarTop) 
      ? sidebar.addClass(FIXED)
      : sidebar.removeClass(FIXED);

    let sidebarBottom = scrollPosition+WIN.height();

    (sidebarBottom >= footerTop)
      ? sidebar.addClass('is-absolute')
      : sidebar.removeClass('is-absolute');
  });

  // SCROLL_TO
  const links = $('.js-sidebar-link');
  const linksParents = $('.js-sidebar-link').parents('.js-sidebar-box');
  const boxes = $('.js-faq-box');
  const sidebarBlocks = $('.js-sidebar-block');

  links.click(function() {
  	let thatLink = $(this);
  	let parent = thatLink.parents('.js-sidebar-box');
    let block = parent.find('.js-sidebar-block');
    let id = $(this).attr('href');
    let posTop = $(id).offset().top;
    let box = $(id);


    let accordion = () => {
      if (!parent.hasClass(ACTIVE)) {
        linksParents.removeClass(ACTIVE);
        parent.addClass(ACTIVE);
        sidebarBlocks.slideUp();
        block.slideDown();
      }
      else {
        parent.removeClass(ACTIVE);
        sidebarBlocks.slideUp();
      }
    };
	
    if (WIN.width() <= 1040) {
      accordion();
    } else {
      SCROLL_TO(posTop);
      linksParents.removeClass(ACTIVE);
      parent.addClass(ACTIVE);

      boxes.removeClass(ACTIVE);
      box.addClass(ACTIVE);
    }

    return false;
  });
  
  if (WIN.width() <= 1040) return;
  const ps = new PerfectScrollbar('.js-sidebar-wrap');
})();
