export default (function() {
  var layers = document.querySelectorAll('.oxy');
  var coef = [100, 300, 700];

  document.addEventListener('mousemove', function(e) {
	  var x = e.clientX;
	  var y = e.clientY;

	  for(var i = 0; i < layers.length; i++) {
	    layers[i].style.transform = 'translate(' + (x / coef[i]) +'px, ' + (y / coef[i]) + 'px)';
	  }
  });
})();
