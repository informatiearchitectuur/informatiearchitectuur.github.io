var jsTheme =
{
	// init, something like a constructor
	init: function()
	{
		jsTheme.mobileNav.init();
		jsTheme.forms.init();
		jsTheme.blockLinks.init();
	}

};

jsTheme.mobileNav =
{
	init: function()
	{
		jsTheme.mobileNav.enableMobileNav();
		jsTheme.mobileNav.buildMobileNav();
	},

	// CSS is based on the class .mobile-nav
	//
	enableMobileNav: function()
	{
		$("html").addClass("mobile-nav");
	},

	// build mobile nav
	buildMobileNav: function()
	{
		var navHolder = $('.header');

		navHolder.prepend('<span class="main-nav-trigger">menu</span>');

		var trigger = $('.main-nav-trigger');
		var nav = $('.main-nav');

		trigger.on('click', function() {
			nav.toggleClass("is-visible");
			$(this).toggleClass("trigger-active");
		});
	}
};

jsTheme.forms =
{
	init: function()
	{
		$('.alert-box').on('click', function(e)
		{
			e.preventDefault();
			$(this).closest('.alert-box').fadeOut(300);
		});
	}

};

jsTheme.blockLinks =
{
	init: function()
	{
		var $block = $('.js-link-block');
		var $blockLink = $('.js-block-link');
		var $noLink = $('.js-block-no-link');

		$block.on('click', function(e) {
			var link = $(this).find($blockLink).attr('href');
			window.location = link;
		});

		$noLink.on('click', function(e) {
			e.stopPropagation();
		});
	}
};

$(jsTheme.init);
