import { TOUCH } from '../_utils';
import { DOC, BODY } from '../_constants';
import Rellax from 'rellax';

;(function() {
  
  let fireFox = false;
  let detectFirefox = () => {
    var ua = navigator.userAgent;
    if (ua.search(/Firefox/) > 0) {
      BODY.addClass('is-firefox');
      fireFox = true;
    }
  };
  detectFirefox();
  
  let clouds = $( '.js-clouds' );
  if (!clouds.length) return;

  const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  let layers = [];
  let objects = [];
  let d = 0;
  let p = 400;
  let worldXAngle = 0;
  let worldYAngle = 0;
  let number = 1;

  clouds[0].style.webkitPerspective = p;
  clouds[0].style.MozPerspective = p;
  clouds[0].style.oPerspective = p;

  const generate = (world, cloudLenght, paralax) => {
    let cloudBase = +cloudLenght || 9;
    objects = [];

    if ( world.hasChildNodes() ) {
      while ( world.childNodes.length >= 1 ) {
        world.removeChild( world.firstChild );
      }
    }

    for( let j = 0; j < cloudBase; j++ ) {
      objects.push( createCloud(world, paralax) );
    }

  };
	
  function createCloud(world, paralax) {
    let div = document.createElement( 'div' );
    div.className = 'cloudBase-'+number+'';
    if (paralax) div.setAttribute('data-rellax-speed', randomInteger(-0.2, -0.2));
    div.setAttribute('data-rellax-zindex', 0);
    div.setAttribute('data-rellax-percentage', 0);
    number++;
    let z = randomInteger(150, 200);

    let t = 'translateZ( ' + z + 'px )';
    div.style.webkitTransform = t;
    div.style.MozTransform = t;
    div.style.oTransform = t;
    div.style.transform = t;
    world.appendChild( div );

    let cloudsRandom = Math.round( Math.random() * 5 );
   
    for( let j = 0; j < 10; j++ ) {
      let cloud = document.createElement( 'img' );
      cloud.style.opacity = 0;
      let r = Math.random();
      let src = './img/cloud.png';
      ( function( img ) { img.addEventListener( 'load', function() {
        img.style.opacity = 0.2;
      } ); } )( cloud );
      cloud.setAttribute( 'src', src );
      cloud.className = 'cloudLayer';

      let x = randomInteger(0, 700);
      let y = randomInteger(-150, 150);
      let z = 100 - ( Math.random() * 200 );
      let a = Math.random() * 360;
      let s = 2 + Math.random() * (1 - 3);
      x *= 0.2; y *= 0.2;
      
      cloud.data = {
        x: x,
        y: y,
        z: z,
        a: a,
        s: s,
        speed: 0.1 * Math.random()
      };
      let t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg )';
      cloud.style.webkitTransform = t;
      cloud.style.MozTransform = t;
      cloud.style.oTransform = t;
      cloud.style.transform = t;

      div.appendChild( cloud );
      layers.push( cloud );
    }

    return div;
  }

  function onMouseMove( e, world ) {

    let x = e.clientX || e.touches[ 0 ].clientX;
    let y = e.clientY || e.touches[ 0 ].clientY;

    worldYAngle = -( 0.5 - ( x / window.innerWidth ) ) * 35;
    worldXAngle = ( 0.5 - ( y / window.innerHeight ) ) * 35;
    updateView(world);
    event.preventDefault();

  }

  function updateView(world) {
    let t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
    world.style.webkitTransform = t;
    world.style.MozTransform = t;
    world.style.oTransform = t;
    world.style.transform = t;
  }
  
  clouds.each(function(i, el) {
    let world = $(el).find('.js-clouds-word')[0];
    let cloudLenght = $(el).data('clouds');
    let paralax = $(el).data('clouds-paralax');
    generate(world, cloudLenght, paralax);
    if (TOUCH()) return;
    window.addEventListener( 'mousemove', (e) => onMouseMove(e, world) );
  });

  var fps = { 
    startTime : 0, 
    frameNumber : 0, 
    getFPS : function() { 
      this.frameNumber++; 
      var d = new Date().getTime(), 
        currentTime = ( d - this.startTime ) / 1000, 
        result = Math.floor( ( this.frameNumber / currentTime ) ); 
      if( currentTime > 1 ) { 
        this.startTime = new Date().getTime(); this.frameNumber = 0; 
      } return result; 
    } 
  };

  var f = document.querySelector('#fps'); 
  let bbb = 0;
  function gameLoop() { 
    setTimeout( gameLoop,1000 / 60 ); 
    f.innerHTML = fps.getFPS()/2;
    bbb = fps.getFPS();
  }
  window.onload = gameLoop;
  $(document).ready(function() {
    
    setTimeout(function() {
      alert(bbb/2);
    }, 5000);
  });
  let frame;
  const update = () => {

    for( let j = 0; j < layers.length; j++ ) {
      let layer = layers[ j ];
      layer.data.a += layer.data.speed;
      let t = 'translateX( ' + layer.data.x + 'px ) translateY( ' + layer.data.y + 'px ) translateZ( ' + layer.data.z + 'px ) rotateY( ' + ( - worldYAngle ) + 'deg ) rotateX( ' + ( - worldXAngle ) + 'deg ) rotateZ( ' + layer.data.a + 'deg ) scale( ' + layer.data.s + ')';
      layer.style.webkitTransform = t;
      layer.style.MozTransform = t;
      layer.style.oTransform = t;
      layer.style.transform = t;
    }
    // if (TOUCH()) return;
    frame = requestAnimationFrame( update );
  };

  update();
  if (TOUCH()) return;
  let timeout;
  DOC.on('scroll', () => {
    cancelAnimationFrame(frame);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      update();
    }, 200);
  });

  // if (TOUCH()) return;
  // var rellax = new Rellax('[data-clouds-paralax] [class*="cloudBase-"]');
  
})();
