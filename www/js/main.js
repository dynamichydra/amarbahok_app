$(function() {
    'use strict';

    // preloader
    $(".preloader").fadeOut();

    // sidebar
    $('.sidebar').sideNav({
        edge: 'left'
    });

    // sidebar search
    $('.sidebar-search').sideNav({
        edge: 'right'
    });

    // sidebar search
    $('.sidebar-cart').sideNav({
        edge: 'right'
    });


    // navbar on scroll
    /*$(window).on('scroll', function() {

        if ($(document).scrollTop() > 50) {

            $(".navbar").css({
                "box-shadow": "rgba(0, 0, 0, 0.18) 0px 0px 16px"
            });

        } else {

            $(".navbar").css({
                "box-shadow": "none"
            });

        }

    });*/

    // slider
    

    // product-slide
    $(".offer-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 1,
        dots: false
    });

     // Girls
    $(".girl-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 30,
        items: 4,
        dots: false
    });

    // Trending
    $(".trending-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 1,
        dots: false
    });

    // product-slide
    $(".product-slide-two").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 2,
        dots: false
    });

    // product-d-slide
    $(".product-d-slide").owlCarousel({
        items: 1,
        navigation: true,
        slideSpeed: 1000,
        dots: true,
        paginationSpeed: 400,
        loop: false,
        margin: 10,
    });

    // More
    $(".more-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 2,
        dots: false
    });

    // tabs
    $('ul.tabs').tabs();

    // collapse
    $('.collapsible').collapsible();

    // testimonial
    $(".testimonial").owlCarousel({
        items: 1,
        loop: false
    })

});

//cart
jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });

    