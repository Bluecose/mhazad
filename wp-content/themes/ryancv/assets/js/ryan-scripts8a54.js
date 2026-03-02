/*
*   Author: bslthemes
*   Author URL: http://themeforest.net/user/bslthemes
*/

( function( $ ) {
	'use strict';
	
	var elementor = 0;
	if ( window.location.href.indexOf('/?elementor-preview=') > -1 ) {
		elementor = 1;
	}
	
	/*
		Preloader
	*/
	$(window).on("load", function() {
		var preload = $('.preloader');
		preload.find('.spinner').fadeOut(function(){
			preload.fadeOut(function(){
				/*$('.grid-items').isotope( 'reloadItems' ).isotope();*/
			});
		});
		if ( $('.loader-curve').length ) {
			preload.find('.preload-text').fadeOut(100);
			if ( $('.preload-svg').length ) {
				preload_curve();
			}
		}
	});
	
	if ( $('.loader-curve').length ) {
		var preload_path = document.querySelector('.preload-path');
		var preload_y = 0;
		var preload_c = 0;
		if ( $('.preload-text').length ) {
			var $preload_characters = $('.preload-text');
			$preload_characters.html( $preload_characters.html().replace(/./g, "<span>$&</span>").replace(/\s/g, " "));
		}
	}
	function lerp(start, end, t){
		return start * (1 - t) + end * t;
	}
	function preload_curve(){
		preload_y = lerp(preload_y, 100, .055)
		preload_c = lerp(preload_c, 100, 0.075);
		preload_path.setAttribute('d', `M 0 ${preload_y} L 0 100 100 100 100 ${preload_y} C 50 ${preload_c}, ${50} ${preload_c}, 0 ${preload_y}` )
		requestAnimationFrame(preload_curve)
	}
	
	$(function() {
		'use strict';
	
		/*
			Vars
		*/
		var width = $(window).width();
		var height = $(window).height();
		var header_offset_top = 15;
		if(width <= 680) {
			header_offset_top = $('.header').height();
		}
		$(window).on('resize', function(){
			var width = $(window).width();
			if(width <= 680) {
				header_offset_top = $('.header').height();
			}

			/*
				Sticky Scroll Type
			*/
			if($('.body-style-scroll').length && width <= 1121){
				$('.sticky-scroll-menu').trigger("sticky_kit:detach");
				$('.sticky-scroll-vcard').trigger("sticky_kit:detach");
			}
		});

		/*
			Sticky Scroll Type
		*/
		if($('.body-style-scroll').length && width >= 1121){
			$('.sticky-scroll-menu').stick_in_parent();
			$('.sticky-scroll-vcard').stick_in_parent();
		}
	
		/*
			Header Menu Desktop
		*/
		var container = $('.container');
		var card_items = $('.card-inner');
		var animation_in = container.data('animation-in');
		var animation_out = container.data('animation-out');
		var menu_items = $('.top-menu li');
	
		if( $('.top-menu-onepage').length ) {
	
			$('.top-menu').on('click', 'a', function(){
	
				/* vars */
				var width = $(window).width();
				var id = $(this).attr('href');
				if(id=='') id = '#home';
				var card_item = $('#card-'+id.replace('#', ''));
				var h = parseFloat(card_item.offset().top);
				var menu_item = $(this).closest('li');
	
				if(id != '#home') {
					window.location.hash = id;
				} else {
					history.replaceState(null, null, ' ');
				}
	
				if( width >= 1121 ) {
					/* if desktop */
					if(!menu_item.hasClass('current-menu-item') && !$('body').hasClass('body-style-scroll')) {
						/* close card items */
						menu_items.removeClass('current-menu-item');
						container.find(card_items).removeClass('animated '+animation_in);
	
						if($(container).hasClass('opened')) {
							container.find(card_items).addClass('animated '+animation_out);
						}
	
						/* open card item */
						menu_item.addClass('current-menu-item');
						container.addClass('opened');
						container.find(card_item).removeClass('animated '+animation_out);
						container.find(card_item).addClass('animated '+animation_in);
	
						$(card_items).addClass('hidden');
	
						$(card_item).removeClass('hidden');
						$(card_item).addClass('active');
						
						/* refresh widgets */
						$('.elementor-element').each(function() { elementorFrontend.elementsHandler.runReadyTrigger( $( this ) ); });
	
						for ( var i = 0; i<=100; i+=100 ) {
							setTimeout(function(){
							$('.grid-items').isotope( 'reloadItems' ).isotope();
							}, i );
						}
	
						skillsDotted_resize();
					}
					if ($('body').hasClass('body-style-scroll')) {
						/* scroll to section */
						$('body,html').stop().animate({
							scrollTop: h
						}, 400);
					}
				}
				/* if mobile */
				if( width < 1121 ) {
					/* scroll to section */
					$('body,html').stop().animate({
						scrollTop: h - header_offset_top
					}, 400);
	
					$('.header').removeClass('hamburger-opened');
					$('.header .hamburger-menu-btn').removeClass('active');
				}
	
				return false;
			});
		}
		if(!$('body').hasClass('body-style-scroll')) {
			$('.anchor-link').on('click', function() {
				var id_el = $(this).find('a').attr('href');
				var id_url = $(id_el).position().top;
				$(this).closest('.card-wrap').stop().animate({ scrollTop: id_url });
				return false;
			});
		}
	
		$(window).on('resize', function(){
			var width = $(window).width();
			var height = $(window).height();
	
			if((width < 1121)) {
				$('.card-inner').removeClass('hidden');
				$('.card-inner').removeClass('fadeOutLeft');
				$('.card-inner').removeClass('rotateOutUpLeft');
				$('.card-inner').removeClass('rollOut');
				$('.card-inner').removeClass('jackOutTheBox');
				$('.card-inner').removeClass('fadeOut');
				$('.card-inner').removeClass('fadeOutUp');
				$('.card-inner').removeClass('animated');
			} else {
				if ( $('.top-menu li.current-menu-item a').length ) {
					var current_id = $('.top-menu li.current-menu-item a').attr('href');
					if ( current_id.startsWith('#') == true ) {
						var current_tab = $('#card-'+current_id.replace('#', ''));
						current_tab.addClass('current-menu-item');
					}
				}
			}
	
			/*
				Dotted Skills Line On Resize Window
			*/
			setTimeout(skillsDotted_resize, 750);
		});
	
		/*
			Dotted Skills Line On Resize Window
		*/
		function skillsDotted_resize() {
			var skills_dotted = $('.skills-list.dotted .progress');
			var skills_dotted_w = skills_dotted.width();
			if(skills_dotted.length){
				skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
			}
		}
	
		/*
			One Page Mode
		*/
		var url_hash = location.hash;
		var sectionElem = $('#card-'+url_hash.replace('#', ''));
		if(sectionElem.length && $('.top-menu-onepage').length){
			menu_items.removeClass('current-menu-item');
			$('.top-menu li a[href="'+url_hash+'"]').parent('li').addClass('current-menu-item');
	
			if(width >= 1121) {
				container.find(card_items).removeClass('animated '+animation_in);
				if($(container).hasClass('opened')) {
					container.find(card_items).addClass('animated '+animation_out);
				}
				container.addClass('opened');
				sectionElem.removeClass('animated '+animation_out);
				sectionElem.addClass('animated '+animation_in);
				$(card_items).addClass('hidden');
				sectionElem.removeClass('hidden');
				sectionElem.addClass('active');
			} else {
				/* scroll to section */
				$('body,html').stop().animate({
					scrollTop: parseFloat(sectionElem.offset().top) - header_offset_top
				}, 400);
			}
		}
		
		/*
			Mode Switcher
		*/
		var skin_dir = $('.mode-switch-btn').data( 'ui-dir' ) + '/assets/css/';
		var skin_ui = $('.mode-switch-btn').data( 'ui' );
		var skin = $.cookie('skin');
	
		if ( skin != undefined ) {
		if ( skin_ui == '1' ) {
			$('#mode-switch-radio').prop("checked", true);
		}
		if ( skin_ui == '0' ) {
			$('#mode-switch-radio').prop("checked", false);
		}
		}
	
		if ( skin_ui != undefined ) {
		if ( skin == '1' ) {
			if ( $('#ryancv-dark-css').length ){
				$("#ryancv-dark-css").attr("href", skin_dir+"dark.css");
			} else {
				$('head').append('<link rel="stylesheet" id="ryancv-dark-css" type="text/css" href="'+skin_dir+"dark.css"+'">');
			}
			$('#mode-switch-radio').prop("checked", true);
			$('.page_wrap').addClass('theme-style-dark');
			$('body').addClass('body-style-dark');
		}
		if ( skin == '0' ) {
			$("#ryancv-dark-css").attr("href", "");
			$('#mode-switch-radio').prop("checked", false);
			$('.page_wrap').removeClass('theme-style-dark');
			$('body').removeClass('body-style-dark');
		}
		}
	
		if ( $('.page_wrap').hasClass('switcher-ui-disabled') ) {
			$.removeCookie('skin', { path: '/' });
		}
	
		$('#mode-switch-radio').on('change', function() {
			if (this.checked) {
				$.cookie('skin', '1', { expires: 7, path: '/' });
				$('.page_wrap').addClass('theme-style-dark');
				$('body').addClass('body-style-dark');
				$('#mode-switch-radio').prop("checked", true);
				if ( $('#ryancv-dark-css').length ){
					$("#ryancv-dark-css").attr("href", skin_dir+"dark.css");
				} else {
					$('head').append('<link rel="stylesheet" id="ryancv-dark-css" type="text/css" href="'+skin_dir+"dark.css"+'">');
				}
			} else {
				$.cookie('skin', '0', { expires: 7, path: '/' });
				$('.page_wrap').removeClass('theme-style-dark');
				$('body').removeClass('body-style-dark');
				$('#mode-switch-radio').prop("checked", false);
				$("#ryancv-dark-css").attr("href", "");
			}
		});
	
		/*
			Hire Button
		*/
		$('.lnks').on('click', '.lnk[href*="#"]', function(){
			var lnk_url = $(this).attr('href');
			var lnk_idx = lnk_url.indexOf("#");
			var lnk_hash = lnk_idx != -1 ? lnk_url.substring(lnk_idx+1) : "";
	
			if($('.top-menu a[href="#'+lnk_hash+'"]').length) {
				$('.top-menu a[href="#'+lnk_hash+'"]').trigger('click');
			}
		});

		/*
			Custom Link Button
		*/
		if(!$('body').hasClass('body-style-scroll')) {
		$('body').on('click', '.custom-lnk[href*="#"], .custom-lnk .elementor-button[href*="#"]', function(){
			var lnk_url = $(this).attr('href');
			var lnk_idx = lnk_url.indexOf("#");
			var lnk_hash = lnk_idx != -1 ? lnk_url.substring(lnk_idx+1) : "";
	
			if($('.top-menu a[href="#'+lnk_hash+'"]').length) {
				$('.top-menu a[href="#'+lnk_hash+'"]').trigger('click');
			}
		});
		}
	
		/*
			Popup Menu Navigation
		*/
		$('.main-menu li.page_item_has_children').each(function(){
			$(this).find('> a').after('<span class="children_toggle"></span>');
		});
		$('.main-menu').on('click', '.children_toggle', function(){
			var main_menu_item = $(this).closest('.page_item_has_children');
			if(main_menu_item.hasClass('open')) {
				main_menu_item.removeClass('open');
				main_menu_item.find('> ul').slideUp(250);
			} else {
				main_menu_item.addClass('open');
				main_menu_item.find('> ul').slideDown(250);
			}
		});
	
		/*
			Smoothscroll
		*/
		if( ((width < 1121) && $('.top-menu-onepage').length) || ($('.top-menu-onepage').length && $('body').hasClass('body-style-scroll')) ) {
			$(window).on('scroll', function(){
				var scrollPos = $(window).scrollTop();
				$('.top-menu ul li a').each(function () {
					var currLink = $(this);
					var currHref = currLink.attr('href');
					if(currHref == '') currHref = '#home';
	
					if(currHref.charAt(0) == "#") {
						var refElement = $('#card-'+currHref.replace('#', ''));
						if (refElement.offset().top - header_offset_top - 2 <= scrollPos) {
							$('.top-menu ul li').removeClass("current-menu-item");
							currLink.closest('li').addClass("current-menu-item");
						}
					}
				});
			});
		}
		if( width <= 560 ) {
			$(window).on('scroll', function(){
				if($(window).scrollTop() > 46) {
					$('.header').addClass('fixed');
				}
				else {
					$('.header').removeClass('fixed');
				}
			})
		}
	
		/*
			Sidebar Show/Hide
		*/
		$('header, .profile').on('click', '.menu-btn', function(){
			$('.s_overlay').fadeIn();
			$('.content-sidebar').addClass('active');
			$('body,html').addClass('sidebar-open');
			return false;
		});
		$('.content-sidebar, .container').on('click', '.close, .s_overlay', function(){
			$('.s_overlay').fadeOut();
			$('.content-sidebar').removeClass('active');
			$('body,html').removeClass('sidebar-open');
		});
	
		/*
			Hamburger Show/Hide
		*/
		$('.header').on('click', '.hamburger-menu-btn', function(){
			var hm = $(this).closest('.header');
			if(hm.hasClass('hamburger-opened')) {
				hm.removeClass('hamburger-opened');
				$(this).removeClass('active');
			} else {
				hm.addClass('hamburger-opened');
				$(this).addClass('active');
			}
			return false;
		});
	
		/*
			Widget Title
		*/
		$('.widget-title').wrapInner('<span class="widget-title-span"></span>');
	
		/*
			Default Menu
		*/
		$('.lnk-view-menu').on('click', function(){
			var btn_text1 = $(this).find('.text').text();
			var btn_text2 = $(this).find('.text').data('text-open');
			if($('.profile').hasClass('default-menu-open')){
				$('.profile').removeClass('default-menu-open');
				$(this).find('.text').data('text-open', btn_text1);
				$(this).find('.text').text(btn_text2);
			} else {
				$('.profile').addClass('default-menu-open');
				$(this).find('.text').data('text-open', btn_text1);
				$(this).find('.text').text(btn_text2);
			}
	
			return false;
		});
	
		/*
			Typed
		*/
		$('.r-typed').each(function(){
			var $this = $(this)[0];
			var $string = $(this).prev('.typing-title')[0];
			var typed = new Typed($this, {
				stringsElement: $string,
				backDelay: 3500,
				typeSpeed: 80,
				backSpeed: 20,
				loop: true
			});
		});
	
		/*
			Initialize isotope works items
		*/
		var $container_works = $('.works-grid .grid-items');
		$container_works.imagesLoaded(function() {
			$container_works.isotope({
				itemSelector: '.grid-item'
			});
		});
		$('.works-grid .filter-button-group').on( 'click', '.f_btn', function() {
			var filterValue = $(this).find('input').val();
			$container_works.isotope({ filter: filterValue });
			$('.works-grid .filter-button-group .f_btn').removeClass('active');
			$(this).addClass('active');
		});
	
		/*
			Initialize isotope blog items
		*/
		var $container_blog = $('.blog-grid .grid-items');
		$container_blog.imagesLoaded(function() {
			$container_blog.isotope({
				itemSelector: '.grid-item'
			});
		});
		$('.blog-grid .filter-button-group').on( 'click', '.f_btn', function() {
			var filterValue = $(this).find('input').val();
			$container_blog.isotope({ filter: filterValue });
			$('.blog-grid .filter-button-group .f_btn').removeClass('active');
			$(this).addClass('active');
		});
	
		/*
			Gallery magnific popup
		*/
		if(!$('body').hasClass('elementor-page')){
		if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))){
			$('.gallery-item a').magnificPopup({
				gallery: {
					enabled: true
				},
				type: 'image',
				closeBtnInside: false,
				mainClass: 'mfp-fade'
			});
		}
		}
	
		/*
			Popups
		*/
		$('.has-popup-image').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'popup-box',
			image: {
				verticalFit: true
			}
		});
		$('.has-popup-video').magnificPopup({
			type: 'iframe',
			preloader: false,
			fixedContentPos: false,
			mainClass: 'popup-box',
			callbacks: {
				markupParse: function(template, values, item) {
					template.find('iframe').attr('allow', 'autoplay');
				}
			}
		});
		$('.has-popup-music').magnificPopup({
			type: 'iframe',
			preloader: false,
			fixedContentPos: false,
			mainClass: 'popup-box',
			callbacks: {
				markupParse: function(template, values, item) {
					template.find('iframe').attr('allow', 'autoplay');
				}
			}
		});
		$('.has-popup-gallery').on('click', function() {
			var gallery = $(this).attr('href');
	
			$(gallery).magnificPopup({
				delegate: 'a',
				type:'image',
				closeOnContentClick: false,
				mainClass: 'mfp-fade',
				removalDelay: 160,
				fixedContentPos: false,
				gallery: {
					enabled: true
				}
			}).magnificPopup('open');
	
			return false;
		});
	
		/*
			Remove Lines
		*/
		var serv_num = $('.service-items .service-item').length;
		if(serv_num%2 == 0){
			$('.service-items .service-item').eq(serv_num-1).parent().removeClass('border-line-h');
			$('.service-items .service-item').eq(serv_num-2).parent().removeClass('border-line-h');
		} else {
			$('.service-items .service-item').eq(serv_num-1).parent().removeClass('border-line-h');
		}
	
		/*
			Wrap First Title Word
		*/
		$('.content .title, .widget-title-span').each(function(index) {
			var title = $(this).text().split(' ');
			if(title.length>1){
				var firstWord = title[0];
				var replaceWord = '<span class="first-word">' + firstWord + '</span>';
				var newString = $(this).html().replace(firstWord, replaceWord);
				$(this).html(newString);
			} else {
				$(this).html('<span class="first-letter">'+ $(this).html() + '</span>');
			}
		});
	
		/*
			Active protected password card
		*/
		if($('body').hasClass('home') && $('.top-menu').hasClass('top-menu-onepage')){
			$('.post-password-form').on('submit', function(){
				$.cookie('submit-post-password', $(this).closest('.card-inner').attr('id'), { expires: 7, path: '/' });
				$(this).submit();
			});
			var post_password_cookie = $.cookie('submit-post-password');
			if(post_password_cookie!==undefined){
				$('a[href="#'+post_password_cookie+'"]').trigger('click');
				$.removeCookie('submit-post-password', { path: '/' });
			}
		}
	
		/*
			Tesimonials Carousel
		*/
		$('.revs-carousel:not(.revs-two-carousel) .swiper-container').each(function() {
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
				},
				on: {
					observerUpdate: function (swiper) {
						if (prop_autoplay && !swiper.autoplay.running) {
							swiper.params.autoplay = {
								delay: prop_delay
							};
							swiper.autoplay.start();
						}
					}
				}
			});
		});
	
		/*
			Tesimonials Column-2 Carousel
		*/
		$('.revs-two-carousel .swiper-container').each(function() {
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
				},
				on: {
					observerUpdate: function (swiper) {
						if (prop_two_autoplay && !swiper.autoplay.running) {
							swiper.params.autoplay = {
								delay: prop_two_delay
							};
							swiper.autoplay.start();
						}
					}
				}
			});
		});

		/*
			Tesimonials Two Carousel
		*/
		$('.ar-testimonial-carousel .swiper-container').each(function() {
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
				},
				on: {
					observerUpdate: function (swiper) {
						if (prop_ts_two_autoplay && !swiper.autoplay.running) {
							swiper.params.autoplay = {
								delay: prop_ts_two_delay
							};
							swiper.autoplay.start();
						}
					}
				}
			});
		});
	
		/*
			Resume Two Carousel
		*/
		$('.ar-resume-carousel .swiper-container').each(function() {
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
				},
				on: {
					observerUpdate: function (swiper) {
						if (t_prop_two_autoplay && !swiper.autoplay.running) {
							swiper.params.autoplay = {
								delay: t_prop_two_delay
							};
							swiper.autoplay.start();
						}
					}
				}
			});
		});

		/*
			Slideshow
		*/
		var slideshow_swiper = new Swiper('.ryan-slideshow', {
			slidesPerView: 1,
			effect: 'fade',
			parallax: true,
			autoplay: true,
			speed: 1400,
		});

		/*
			Subtitle Slider
		*/
		$('.subtitle-slider').each(function() {
			var subSwiper_el = $(this)[0];
			var subtitle_swiper = new Swiper(subSwiper_el, {
				direction: 'vertical',
				speed: 300,
				spaceBetween: 5,
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				autoplay: true,
				loop: true,
				pagination: false
			});
		});
	
		/*
			Clients Slider
		*/
		var clients_swiper = new Swiper('.clients-infinite', {
			slidesPerView: 2,
			spaceBetween: 30,
			speed: 5000,
			autoplay: true,
			autoplay: {
				delay: 0,
			},
			loop: true,
			freeMode: true,
			breakpoints: {
				992: {
					slidesPerView: 4,
				},
			},
		});
	
		/*
			Iframe margins
		*/
		$('.single-post-text, .post-box').each(function(){
			$(this).find('iframe').wrap('<div class="embed-container"></div>');
		});
	
		/*
			No Menu Items
		*/
		if(!$('.top-menu ul').length){
			$('.container').addClass('no-sticky-menu');
		}
	
		/*
			Dotted Skills Line
		*/
		function skills(){
			var skills_dotted = $('.skills-list.dotted .progress');
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
		var skills_circles = $('.skills-list.circles .progress');
		if(skills_circles.length){
			skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
		}
	
		/*
			Cart Popup
		*/
		$('.header .cart-btn .cart-icon').on('click', function(){
			if($(this).closest('.cart-btn').hasClass('opened')){
				$(this).closest('.cart-btn').removeClass('opened');
			} else {
				$(this).closest('.cart-btn').addClass('opened');
			}
	
			return false;
		});
	
		/* 
			X Icon
		*/
		if($('.fab.fa-twitter').length){
			$('.fab.fa-twitter').addClass('x-icon');
			$('.fab.fa-twitter').append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#323232" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>');
		}
	
		/*
			Started Typed Animation
		*/
		if($('.ar-words-wrapper').length){
			var words_i = 2;
			var words_index = $('.ar-words-wrapper .ar-word').length;
			$('.ar-words-wrapper .ar-word:nth-child(1)').removeClass("is-hidden");
			$('.ar-words-wrapper .ar-word:nth-child(1)').addClass("is-visible");
			setInterval(function(){
				$('.ar-words-wrapper .ar-word').removeClass("is-visible");
				$('.ar-words-wrapper .ar-word').addClass("is-hidden");
				$('.ar-words-wrapper .ar-word:nth-child('+words_i+')').removeClass("is-hidden");
				$('.ar-words-wrapper .ar-word:nth-child('+words_i+')').addClass("is-visible");
				if (words_i >= words_index) {
					words_i = 1;
				} else {
					words_i++;
				}
			}, 5000);
		}
	
		/*
			Cursor
		*/
		if( width >= 1121 ) {
			initCursor();
		}

		/*
			Woocommerce pages with Elementor Pro
		*/
		if($('.woocommerce.elementor-template-full-width').length && $('.woocommerce .container > .elementor').length){
			$('.woocommerce.woocommerce-shop .page > .container, .woocommerce.single-product .page > .container').append('<div class="card-inner animated active"><div class="card-wrap"></div></div>');
			$('.woocommerce .container > .elementor, .woocommerce .container > .woocommerce-notices-wrapper').appendTo('.card-inner.active .card-wrap');
		}

		/*
			Posts pages with Elementor Pro
		*/
		if($('.single-post.elementor-template-full-width').length && $('.single-post.elementor-template-full-width .container > .elementor').length){
			$('.single-post.elementor-template-full-width .page > .container').append('<div class="card-inner animated active"><div class="card-wrap"></div></div>');
			$('.single-post.elementor-template-full-width .container > .elementor').appendTo('.card-inner.active .card-wrap');
		}
	
	});
	
	function initCursor() {
		var mouseX=window.innerWidth/2, mouseY=window.innerHeight/2;
	
		var cursor = {
			el: $('.cursor'),
			x: window.innerWidth/2,
			y: window.innerHeight/2,
			w: 30,
			h: 30,
			update:function() {
				var l = this.x-this.w/2;
				var t = this.y-this.h/2;
				this.el.css({ 'transform':'translate3d('+l+'px,'+t+'px, 0)' });
			}
		}
	
		$(window).mousemove (function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});
	
		$('a, .swiper-pagination, .swiper-button-prev, .swiper-button-next, button, .button, .btn, .lnk').hover(function() {
			$('.cursor').addClass("cursor-zoom");
		}, function(){
			$('.cursor').removeClass("cursor-zoom");
		});
	
		setInterval(move,1000/60);
	
		function move() {
			cursor.x = lerp (cursor.x, mouseX, 0.1);
			cursor.y = lerp (cursor.y, mouseY, 0.1);
			cursor.update()
		}
	
		function lerp (start, end, amt) {
			return (1-amt)*start+amt*end
		}
	}
	
	} )( jQuery );
	