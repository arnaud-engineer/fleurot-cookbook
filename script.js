/*  =========================================================================
	 DEMO
	========================================================================= */

	/*  ----------------------------------------
		 DEMO
		---------------------------------------- */


function startFocus(t)
{
	document.getElementsByTagName("body")[0].classList.add("focused");

	
	var img_src = t.getAttribute("src");
	var imgHTML = '<img src="' + img_src + '"/>';
	document.getElementsByClassName("focus-element")[0].innerHTML = imgHTML;
	

	//t.outerHTML = t.outerHTML + t.outerHTML;
	//t.classList.add("foc");

	//document.getElementsByTagName("focus")[0].setAttribute("onclick", "leaveFocus(" + t + ");");
	//document.getElementsByTagName("focus-background")[0].setAttribute("onclick", "leaveFocus(" + t + ");");
	//document.getElementsByTagName("focus-element")[0].setAttribute("onclick", "leaveFocus(" + t + ");");
}

function leaveFocus()
{
	document.getElementsByTagName("body")[0].classList.remove("focused");

	//document.getElementsByClassName("foc")[0].classList.remove("foc");

	
	document.getElementsByClassName("focus-element")[0].innerHTML = "";
	
}






		/*  ---------------
			 DEMO
			--------------- */

var lastScrollTop = 0;
var scrollDown = true; // at page loading, we can only scroll down
var lastReferenceScrollTop = 0;

function scrollFunction()
{

	//console.log("(" + document.documentElement.scrollTop + ") - (" + lastScrollTop + ")" + " -> " + lastReferenceScrollTop);

	if (document.documentElement.scrollTop < 150) {
		document.getElementsByTagName("header")[0].classList.remove("hidden");
		document.getElementsByTagName("header")[0].classList.remove("scroll");
	}
	else if (scrollDown === true && document.documentElement.scrollTop - 150 > lastReferenceScrollTop) {
		document.getElementsByTagName("header")[0].classList.add("hidden");
		document.getElementsByTagName("header")[0].classList.remove("scroll");
	}
	else if (scrollDown === false && document.documentElement.scrollTop + 50 < lastReferenceScrollTop)  {
		document.getElementsByTagName("header")[0].classList.remove("hidden");
		document.getElementsByTagName("header")[0].classList.add("scroll");
	} 

	// VARIABLES UPDATE

	if(lastScrollTop < document.documentElement.scrollTop) {
		if(scrollDown === false) {
			lastReferenceScrollTop = document.documentElement.scrollTop;
		}
		scrollDown = true;
	}
	else {
		if(scrollDown === true) {
			lastReferenceScrollTop = document.documentElement.scrollTop;
		}
		scrollDown = false;
	}

	lastScrollTop = document.documentElement.scrollTop;
	
}

document.addEventListener('DOMContentLoaded', function(event)
{
	scrollFunction();

		var offsetStart = 0;
var offsetEnd = 0;
	// On scroll
	window.onscroll = function() {
		scrollFunction();
		document.documentElement.style.setProperty('--scroll', ( window.pageYOffset - offsetStart ) / ( document.body.offsetHeight - offsetStart - offsetEnd - window.innerHeight ));
	};





	var lRecipes = document.getElementsByClassName("recipe-steps");
	for(var i=0 ; i < lRecipes.length ; i++)
	{
		var lImg = lRecipes[i].getElementsByTagName("img");
		for(var j=0 ; j < lImg.length ; j++)
		{
			lImg[j].setAttribute("onclick", "startFocus(this);");
		}
	}


/*
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', ( window.pageYOffset - offsetStart ) / ( document.body.offsetHeight - offsetStart - offsetEnd - window.innerHeight ));
}, false);*/
});