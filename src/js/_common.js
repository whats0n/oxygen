import svg4everybody from 'svg4everybody';
import { TOUCH } from './_utils';
import { BODY } from './_constants';
import './components';

svg4everybody();
if (!TOUCH()) BODY.addClass('no-touch');
