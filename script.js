$(document).ready(function() {
    
    //starts slideshow
    setTimeout(function() {
       $('.js-dir0').fadeOut(1750, 'linear');
    }, 1750);
    fades(1);
    
    /* For the sticky navigation */
    $('.products').waypoint(function(direction) {
        if (direction == "down") {
            $('header').addClass('sticky');
        } else {
            $('header').removeClass('sticky');
        }
    }, {
       offset: '60px;'
    });
    
    /* Navigation scroll */
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
               scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
    
    /* Mobile navigation */
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        
        nav.slideToggle(200);
        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else {
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
    });
    
});

/* -------- Slider Code -------- */
function fades(n) {
    // n is the div number - currently 0-2
    var div = '.js-dir' + n;
    var oldDiv;

    $(div).fadeIn(1750, 'linear');
    oldDiv = div;
    setTimeout(function() {
        //n++;
        if(n <= 1) {
            n++;
        }
        else if (n == 2) {
            n = 0;
        }
        fades(n);
        $(oldDiv).fadeOut(1750, 'linear');
    }, 4000);
}