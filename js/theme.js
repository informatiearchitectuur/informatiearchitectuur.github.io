var jsTheme =
{
	// init, something like a constructor
	init: function()
	{
		jsTheme.forms.init();
		jsTheme.blockLinks.init();
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
