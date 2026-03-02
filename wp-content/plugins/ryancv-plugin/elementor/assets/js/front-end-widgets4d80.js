(function ($) {
	"use strict";

	/* Init Elementor Front Scripts */
	$(window).on('elementor/frontend/init', function () {

		// Widgets
		elementorFrontend.hooks.addAction( 'frontend/element_ready/ryancv-testimonials.default', function() {

		} );

		elementorFrontend.hooks.addAction( 'frontend/element_ready/ryancv-skills.default', function() {
			
			/*
				Dotted Skills Line
			*/
			function skills(){
				var skills_dotted = $('.elementor-editor-active .skills-list.dotted .progress');
				var skills_dotted_w = skills_dotted.width();
				if(skills_dotted.length){
					skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
					skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
					skills_dotted.find('.percentage .da').css({'width':skills_dotted_w});
				}
			}
			setTimeout(skills, 1000);

			/*
				Circle Skills Line
			*/
			var skills_circles = $('.elementor-editor-active .skills-list.circles .progress');
			if(skills_circles.length){
				skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
			}

		} );

		// Global
		elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {

			/*
				Tesimonials Carousel
			*/
			$('.elementor-editor-active .revs-carousel:not(.revs-two-carousel) .swiper-container').each(function() {
				var rv = $(this);
				var rv_el = $(this)[0];
				var prop_loop = rv.data('swiper-loop');
				var prop_delay = rv.data('swiper-delay');
				var prop_autoplay = rv.data('swiper-autoplay');
				var objAutoplay = 0;
		
				if ( prop_autoplay ) {
					objAutoplay = {
						disableOnInteraction: false,
						delay: prop_delay
					};
				}
		
				var revs_slider_init = new Swiper(rv_el, {
					spaceBetween: 30,
					slidesPerView: 1,
					observer: true,
					observeParents: true,
					autoplay: objAutoplay,
					loop: prop_loop,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				});
			});

			/*
				Tesimonials Column-2 Carousel
			*/
			$('.elementor-editor-active .revs-two-carousel .swiper-container').each(function() {
				var rv_two = $(this);
				var rv_two_el = $(this)[0];
				var prop_two_loop = rv_two.data('swiper-loop');
				var prop_two_delay = rv_two.data('swiper-delay');
				var prop_two_autoplay = rv_two.data('swiper-autoplay');
				var prop_two_count = rv_two.data('swiper-count');
				var objTwoAutoplay = 0;
				var objTwoCount = 2;
		
				if ( prop_two_autoplay ) {
					objTwoAutoplay = {
						disableOnInteraction: false,
						delay: prop_two_delay
					};
				}
		
				if ( prop_two_count == 1 ) {
					objTwoCount = 1;
				}
		
				var revs_slider_two_init = new Swiper(rv_two_el, {
					spaceBetween: 30,
					slidesPerView: objTwoCount,
					observer: true,
					observeParents: true,
					autoplay: objTwoAutoplay,
					loop: prop_two_loop,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					breakpoints: {
						0: {
						slidesPerView: 1
						},
						1120: {
						slidesPerView: objTwoCount
						}
					}
				});
			});

			/*
				Tesimonials Two Carousel
			*/
			$('.elementor-editor-active .ar-testimonial-carousel .swiper-container').each(function() {
				var ts_two = $(this);
				var ts_two_el = $(this)[0];
				var prop_ts_two_loop = ts_two.data('swiper-loop');
				var prop_ts_two_delay = ts_two.data('swiper-delay');
				var prop_ts_two_autoplay = ts_two.data('swiper-autoplay');
				var ts_objTwoAutoplay = 0;
		
				if ( prop_ts_two_autoplay ) {
					ts_objTwoAutoplay = {
						disableOnInteraction: false,
						delay: prop_ts_two_delay
					};
				}
		
				var ts_slider_two_init = new Swiper(ts_two_el, {
					spaceBetween: 30,
					slidesPerView: 2,
					centeredSlides: true,
					observer: true,
					observeParents: true,
					autoplay: ts_objTwoAutoplay,
					loop: prop_ts_two_loop,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					breakpoints: {
						0: {
							slidesPerView: 1
						},
						1120: {
							slidesPerView: 2
						}
					}
				});
			});
		
			/*
				Resume Two Carousel
			*/
			$('.elementor-editor-active .ar-resume-carousel .swiper-container').each(function() {
				var t_two = $(this);
				var t_two_el = $(this)[0];
				var t_prop_two_loop = t_two.data('swiper-loop');
				var t_prop_two_delay = t_two.data('swiper-delay');
				var t_prop_two_autoplay = t_two.data('swiper-autoplay');
				var t_prop_two_count = t_two.data('swiper-count');
				var t_objTwoAutoplay = 0;
				var t_objTwoCount = 2;
		
				if ( t_prop_two_autoplay ) {
					t_objTwoAutoplay = {
						disableOnInteraction: false,
						delay: t_prop_two_delay
					};
				}
		
				if ( t_prop_two_count == 1 ) {
					t_objTwoCount = 1;
				}
		
				var t_carousel_two_init = new Swiper(t_two_el, {
					spaceBetween: 60,
					slidesPerView: t_objTwoCount,
					observer: true,
					observeParents: true,
					autoplay: t_objTwoAutoplay,
					loop: t_prop_two_loop,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					breakpoints: {
						0: {
						slidesPerView: 1
						},
						1120: {
						slidesPerView: t_objTwoCount
						}
					}
				});
			});

			/*
				Started Typed Animation
			*/
			if($('.elementor-editor-active .ar-words-wrapper').length){
				$('.ar-words-wrapper .ar-word').removeClass("is-visible");
				$('.ar-words-wrapper .ar-word').addClass("is-hidden");
				$('.ar-words-wrapper .ar-word:nth-child(1)').removeClass("is-hidden");
				$('.ar-words-wrapper .ar-word:nth-child(1)').addClass("is-visible");
			}

		} );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', function( $scope ) {

		} );
	});
})(jQuery);
