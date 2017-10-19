import { TOUCH, SCROLL_TO } from './_utils';
import { BODY } from './_constants';
import './components';
import svg4everybody from 'svg4everybody';

svg4everybody();
if (!TOUCH()) BODY.addClass('no-touch');

// SCROLL_TO
const scrollTo = $('.js-scroll-to');
scrollTo.click(function() {
  var id = $(this).attr('href'),
    posTop = $(id).offset().top;
  SCROLL_TO(posTop);
  return false;
});
