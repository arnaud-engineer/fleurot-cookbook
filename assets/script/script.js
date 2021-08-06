/*  =========================================================================
	 FUNCTIONS
	========================================================================= */

	/*  ----------------------------------------
		 IMAGE FOCUS
		---------------------------------------- */

		/* DISPLAY THE CLICKED IMG IN A FULLSCREEN MODAL WINDOW */
		function startFocus(clickedImg)
		{
			// Switch to focus mode (display the modal and prevent scroll out of it through CSS)
			document.getElementsByTagName("body")[0].classList.add("focused");

			// Add the img in the modal
			var img_src = clickedImg.getAttribute("src");
			var imgHTML = '<img src="' + img_src + '"/>';
			document.getElementsByClassName("focus-element")[0].innerHTML = imgHTML;
		}

		/* HIDE THE MODAL WINDOW */
		function leaveFocus()
		{
			// Exit focus mode (hide the modal, bring back the scroll)
			document.getElementsByTagName("body")[0].classList.remove("focused");
			// Remove the modal content		
			document.getElementsByClassName("focus-element")[0].innerHTML = "";
		}


	/*  ----------------------------------------
		 SCROLLED HEADER HANDLER
		---------------------------------------- */

	/* GLOBAL VARIABLES */

	var scrollDown = true; // scroll direction : down (true) or up (false)
	var lastScrollTop = 0; // current absolute scroll position in the page
	var lastReferenceScrollTop = 0; // absolute scroll position in the page at the last scroll direction change (up to down or up to down) 

	/* HEADER DISPLAY UPDATE DEPENDING ON THE SCROLL */

	function scrollFunction()
	{
	// 1. DISPLAY UPDATE

		// AT THE TOP OF THE PAGE : normal display
		if (document.documentElement.scrollTop < 150) {
			document.getElementsByTagName("header")[0].classList.remove("hidden");
			document.getElementsByTagName("header")[0].classList.remove("scroll");
		}
		// WHEN SCROLLING DOWN : hidden
		else if (scrollDown === true && document.documentElement.scrollTop - 150 > lastReferenceScrollTop) {
			document.getElementsByTagName("header")[0].classList.add("hidden");
			document.getElementsByTagName("header")[0].classList.remove("scroll");
		}
		// WHEN SCROLLING UP : scroll display (smaller than the normal one)
		else if (scrollDown === false && document.documentElement.scrollTop + 50 < lastReferenceScrollTop)  {
			document.getElementsByTagName("header")[0].classList.remove("hidden");
			document.getElementsByTagName("header")[0].classList.add("scroll");
		} 

	// 2. CURRENT SCROLL SITUATION UPDATE

		// IF SCROLL DIRECTION CHANGE : UP TO DOWN
		if(lastScrollTop < document.documentElement.scrollTop) {
			if(scrollDown === false) {
				lastReferenceScrollTop = document.documentElement.scrollTop;
			}
			scrollDown = true;
		}
		// IF SCROLL DIRECTION CHANGE : DOWN TO UP
		else {
			if(scrollDown === true) {
				lastReferenceScrollTop = document.documentElement.scrollTop;
			}
			scrollDown = false;
		}
		// GET CURRENT ABSOLUTE SCROLL POSITION IN THE PAGE
		lastScrollTop = document.documentElement.scrollTop;
	}


/*  =========================================================================
	 MAIN
	========================================================================= */

	document.addEventListener('DOMContentLoaded', function(event)
	{
		// SCROLL HANDLING
		scrollFunction(); // First header display
		var offsetStart = 0; // First background move
		var offsetEnd = 0;

		window.onscroll = function()
		{
			// Update header display
			scrollFunction();
			// ANIMATION : Update the background image vertical position depending on the scroll
			document.documentElement.style.setProperty('--scroll', ( window.pageYOffset - offsetStart ) / ( document.body.offsetHeight - offsetStart - offsetEnd - window.innerHeight ));
		};


		// ADD FOCUS OPTIONS ON IMAGES

		// For each article content
		var lRecipes = document.getElementsByClassName("recipe-steps");
		for(var i=0 ; i < lRecipes.length ; i++)
		{
			// For each image
			var lImg = lRecipes[i].getElementsByTagName("img");
			for(var j=0 ; j < lImg.length ; j++)
			{
				// Set as focusable
				lImg[j].setAttribute("onclick", "startFocus(this);");
			}
		}
	});