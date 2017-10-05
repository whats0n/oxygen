import { fancybox } from '@fancyapps/fancybox';

;(function() {
  const galleryItem = $('[data-fancybox]');
  galleryItem.fancybox({
    protect: true,
    image : {
      preload : 'auto',
    }
  });
})();
