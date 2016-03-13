/**
 * Add a click listener to the button
 */
// get the button that starts the animation in a global variable
window.startButton = document.getElementById("startAnimation");
// add an event listener to the Start button
if (startButton.addEventListener) {
	startButton.addEventListener("click", startAnimation, false);
} else if (startButton.attachEvent) {
	startButton.attachEvent("click", startAnimation);
}
// delete the global startButton variable
delete window.startButton;

/**
 * Run the animation automatically when the the viewer scrolls to the button
 */
// create an Immediately-Invoked Function Expression (IIFE)
(function () {
// declare all the variables
var windowHeight, buttonHeight, distanceFromBottom, lastScrollPosition,
    currentScrollPosition, buttonOffset, windowOffset;
// get the window's height in a variable
windowHeight = document.documentElement.clientHeight || $(window).height();
// get the button's full height in a variable
buttonHeight = $("#startAnimation").outerHeight();
// determine when the button scrolled 1/4 into the window (this is the position
// of the topmost side of the button in relation to the bottom of the window)
distanceFromBottom = (windowHeight / 4) - (buttonHeight / 2);
// get the scroll position. Used for detecting the scroll direction
lastScrollPosition = $(this).scrollTop();
// attach a function to the scroll event
$(window).on("scroll", function () {
	// run it only if the button doesn't have the class "btnActive"
	if (!($("#startAnimation").hasClass("btnActive"))) {
		// get the current scroll position in another variable
		currentScrollPosition = $(this).scrollTop();
		// get the button's position from the top of the page
		buttonOffset = $("#startAnimation").offset().top;
		// get the scroll distance
		windowOffset = $(window).scrollTop();
		// this is how can be detected if it was scrolled down
		if (currentScrollPosition > lastScrollPosition) {
			// if the button is somewhere between 1/4 to the bottom of the page
			// and 100 pixels HIGHER (I need to set a range instead of a fixed
			// point because on fast scrolls the browser may not be able to
			// detect when the button is in that position)
			if ((buttonOffset + buttonHeight - windowOffset) < (windowHeight - distanceFromBottom)
			    && (buttonOffset + buttonHeight - windowOffset) > (windowHeight - distanceFromBottom - 100)) {
				// start the animation
				startAnimation();
			}
		// this is how can be detected if it was scrolled up
		} else if (currentScrollPosition < lastScrollPosition) {
			// if the button is somewhere between 1/4 to the top of the page
			// and 100 pixels LOWER (I need to set a range instead of a fixed
			// point because on fast scrolls the browser may not be able to
			// detect when the button is in that position)
			if ((buttonOffset + buttonHeight - windowOffset) > (windowHeight - (windowHeight - distanceFromBottom))
			    && (buttonOffset + buttonHeight - windowOffset) < (windowHeight - (windowHeight - distanceFromBottom) + 100)) {
				// start the animation
				startAnimation();
			}
		}
		// assign the currentScrollPosition value to lastScrollPosition
		lastScrollPosition = currentScrollPosition;
	}
});
})();

/**
 * Create the animation
 */
function startAnimation () {
	var filesForTheCompiler, regularFiles, folderIcon, portableAppIcon,
	    animationScene, startButton, newAppDir, AppDirHeading,
	    progressContainer, progressMessage, progressBar,
	    fallbackProgressBarContainer, fallbackProgressBar, leftIcons,
	    rightIcons, middleIcon, tlLeft, tlRight, tlCenter;
	// put all the files that go into the compiler into an array
	filesForTheCompiler = ["http://work.alinpasol.com/appimage.org_assets/img/c-source-code.png",
	                       "http://work.alinpasol.com/appimage.org_assets/img/vala-file.png"];
	// put all the other files into an array
	regularFiles = ["http://work.alinpasol.com/appimage.org_assets/img/generic-text-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/binary-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/script-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/font-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/contributors.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/markup-language-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/database.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/python-source-code.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/perl-source-code.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/office-document.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/generic-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/audio-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/generic-compressed-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/java-source-code.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/changelog-file.png",
	                "http://work.alinpasol.com/appimage.org_assets/img/jar-file.png"];
	// the folder icon
	folderIcon = "http://work.alinpasol.com/appimage.org_assets/img/directory.png";
	// the resulting app's icon (with a random query string so it doesn't get cached)
	portableAppIcon = "images/logo3.svg" + '?random=' + Math.random();
	// select the animation container
	animationScene = document.getElementById("appBuildAnimationScene");
	// select the button that starts the animation
	startButton = document.getElementById("startAnimation");
	// create a global variable that will show how many initial tweens finished
	window.initialAnimationsReady = 0;

	/**
	 * Disable the button until the animation ends
	 */
	// remove the click listener from the Start button
	if (startButton.removeEventListener) {
		startButton.removeEventListener("click", startAnimation, false);
	} else if (startButton.detachEvent) {
		startButton.detachEvent("click", startAnimation);
	}
	// give it a class to keep the button "pressed"
	startButton.setAttribute("class", "btnActive");

	/**
	 * Create the AppDir <div>
	 */
	// create a <div>
	newAppDir = document.createElement("div");
	// set an "id"
	newAppDir.setAttribute ("id", "AppDir");
	// create a <heading> to be used as title
	AppDirHeading = document.createElement("h2");
	// add text to the <heading>
	AppDirHeading.innerHTML = "AppDir";
	// append the <heading> to the AppDir <div>
	newAppDir.appendChild(AppDirHeading);
	// create a <div> to hold the progress bar(s)
	progressContainer = document.createElement("div");
	// give it an "id"
	progressContainer.setAttribute("id", "progress-container");
	// create a <p> element for the progress message
	progressMessage = document.createElement("p");
	// give it an "id"
	progressMessage.setAttribute("id", "progress-status");
	// add an initial width of 0%
	progressMessage.style.width = "0%";
	// add an initial opacity of 0%
	progressMessage.style.opacity = "0";
	// add a "data-value" attribute
	progressMessage.setAttribute("data-value", "0");
	// add text to it
	progressMessage.innerHTML = "Processing...";
	// append the progress message to the AppDir <div>
	progressContainer.appendChild(progressMessage);
	// create a <progress> element
	progressBar = document.createElement("progress");
	// add a maximum value
	progressBar.setAttribute("max", 100);
	// add a value
	progressBar.setAttribute("value", 0);
	// create a container for the fallback progress bar
	fallbackProgressBarContainer = document.createElement("span");
	// add an "id"
	fallbackProgressBarContainer.setAttribute("id", "fallback-progress-bar");
	// create a <span> element
	fallbackProgressBar = document.createElement("span");
	// add a width
	fallbackProgressBar.style.width = "0%";
	// add the progress value to the fallback progress bar
	fallbackProgressBar.innerHTML = "0%";
	// append the fallback progress bar to the container
	fallbackProgressBarContainer.appendChild(fallbackProgressBar);
	// append the container to the <progress> element
	progressBar.appendChild(fallbackProgressBarContainer);
	// append the <progress> to the AppDir <div>
	progressContainer.appendChild(progressBar);
	// append the <div> to the AppDir <div>
	newAppDir.appendChild(progressContainer);
	// append the AppDir <div> to the scene
	animationScene.appendChild(newAppDir);

	/**
	 * Create a (re)sizing function
	 */
	// initialize the function below
	resizeAppDir("init");
	// resize the AppDir <div>
	function resizeAppDir (param) {
		// if the function is run for the first time (with the parameter "init")
		if (param === "init") {
			// declare the global variables used in the resizing function
			window.AppDir = document.getElementById("AppDir");
			window.windowWidth,
			window.AppDirWidth,
			window.leftOffset,
			window.AppDirHeight,
			window.bottomOffset,
			window.imageWidth;
		}
		var fileIcons, i;
		// get the window's width in a variable
		windowWidth = document.documentElement.clientWidth ||
		              document.body.clientWidth || $(window).width();
		// if the browser window is below 1001 pixels
		if (windowWidth <= 299) {
			// make the <div>'s width the same as the window's width
			AppDirWidth = windowWidth;
		}
		// if the browser window is 300-1000 pixels
		else if (windowWidth >= 300 && windowWidth <= 1000) {
			// set a variable width
			AppDirWidth = 300 + ((windowWidth - 300) / 3);
		} else {
			// otherwise set a fixed width
			AppDirWidth = 300 + ((1001 - 300) / 3);
		}
		// update the width
		AppDir.style.width = AppDirWidth + "px";
		// calculate a left offset
		leftOffset = (windowWidth - $(AppDir).outerWidth()) / 2;
		// position the <div> in the center by adding a left offset
		AppDir.style.left = leftOffset + "px";
		// calculate the height as 50% of the width
		AppDirHeight = AppDirWidth * 0.50;
		// add a height
		AppDir.style.height = AppDirHeight + "px";
		// if the function is run for the first time (with the parameter "init")
		if (param === "init") {
			// hide it by setting a bottom offset
			AppDir.style.bottom = "-" + AppDirHeight + "px";
		}
		// calculate the icons' width
		imageWidth = AppDirWidth * 200 / (300 + ((1001 - 300) / 3));
		// select the icons
		fileIcons = document.querySelectorAll(".fileIcon");
		// loop through the resulting array
		for (i = 0; i < fileIcons.length; i++) {
			// update the width
			fileIcons[i].style.width = imageWidth + "px";
			// change the left margin
			fileIcons[i].style.marginLeft = parseInt("-" + imageWidth/2)+"px";
			// change the right margin
			fileIcons[i].style.marginRight = parseInt("-" + imageWidth/2)+"px";
		}
		// run it each time the window is resized, without any parameters
		if (window.addEventListener) {
			window.addEventListener("resize", resizeAppDir, false);
		} else if (window.attachEvent) {
			window.attachEvent("resize", resizeAppDir);
		}
	}

	/**
	 * Create the icons
	 */
	// create the <img> elements with the file icons
	createFileIcons(filesForTheCompiler);
	createFileIcons(regularFiles);
	createFileIcons(folderIcon);
	// a function that takes the variables with URLs and creates the icons
	function createFileIcons(param) {
		var i, fileIcon;
		// create a function that returns the type of a variable
		function checkType(obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		}
		// use a switch statement to differentiate between arrays and strings
		switch(checkType(param)){
		// in case of an array, place the icons left and right
		case "array":
			// loop through the array with file icons
			for (i = 0; i < param.length; i++) {
				// create an <img> element
				fileIcon = document.createElement("img");
				// add an "src" attribute
				fileIcon.setAttribute("src", param[i]);
				// add a width
				fileIcon.style.width = imageWidth + "px";
				// if "i" is an even number...
				if (i % 2 == 0) {
					// place the image on the left
					fileIcon.setAttribute("class", "fileIcon left");
				// otherwise...
				} else {
					// place the image on the right
					fileIcon.setAttribute("class", "fileIcon right");
				}
				// add a "margin-left" as half the width
				fileIcon.style.marginLeft = parseInt("-" + imageWidth / 2) +"px";
				// add a "margin-right" as half the width
				fileIcon.style.marginRight = parseInt("-" + imageWidth / 2) +"px";
				// append the image to the container element
				animationScene.appendChild(fileIcon);
			}
		break;
		// in case of a string (the folder icon), place the icon in the center
		case "string":
			// create an <img> element
			fileIcon = document.createElement("img");
			// set the "src" attribute
			fileIcon.setAttribute("src", param);
			// add a class
			fileIcon.setAttribute("class", "fileIcon middle");
			// add a width
			fileIcon.style.width = imageWidth + "px";
			// add a "margin-left" as half the width
			fileIcon.style.marginLeft = parseInt("-" + imageWidth / 2) +"px";
			// add a "margin-right" as half the width
			fileIcon.style.marginRight = parseInt("-" + imageWidth / 2) +"px";
			// append the image to the container element
			animationScene.appendChild(fileIcon);
		break;
		}
	}

	/**
	 * Create the initial animations
	 */
	// get all the icons on the left
	leftIcons = document.querySelectorAll(".fileIcon.left");
	// get all the icons on the right
	rightIcons = document.querySelectorAll(".fileIcon.right");
	// get the middle icon
	middleIcon = document.querySelectorAll(".fileIcon.middle")[0];
	// create the left TimelineMax instance
	tlLeft = new TimelineMax({paused:true});
	// create the right TimelineMax instance
	tlRight = new TimelineMax({paused:true});
	// animate the icons one by one, every 2 seconds
	tlLeft.staggerTo(leftIcons, 13, {bottom:"5%", left:"50%", rotation:360,
	                 ease: Power2.easeIn}, 2);
	// add a callback function to the left animation
	tlLeft.eventCallback("onComplete", removeFileIcons);
	// animate the icons one by one, every 2 seconds
	tlRight.staggerTo(rightIcons, 13, {bottom:"5%", right:"50%", rotation:-360,
	                  ease: Power2.easeIn}, 2);
	// add a callback function to the right animation
	tlRight.eventCallback("onComplete", removeFileIcons);
	// set the the 3D effect's intensity of the folder icon's spin
	TweenMax.set(middleIcon, {transformPerspective:500});
	// animate the folder image with a delay of 5 seconds
	tlCenter = TweenMax.to(middleIcon, 13, {bottom:"5%", left:"50%",
	                       rotationX:-360, ease: Power2.easeIn, delay:5});
	// add a callback function to the middle animation
	tlCenter.eventCallback("onComplete", removeFileIcons);
	// play the left instance
	tlLeft.play();
	// play the right instance
	tlRight.play();
	// animate the AppDir div
	TweenMax.to(AppDir, 7, {bottom:"5%"});

	/**
	 * Create a callback function for the 3 initial tweens
	 */
	// declare a function that is ran when tlLeft, tlCenter or tlRight ends
	function removeFileIcons() {
		// increment initialAnimationsReady with 1 since one more tween ended
		initialAnimationsReady += 1;
		// if not all 3 animations finished stop and return
		if (initialAnimationsReady < 3) return;
		// if all the initial animations finished reset the variable
		window.initialAnimationsReady = 0;
		// remove all the icons
		$(".fileIcon").remove();
		// animate the progress bar(s)
		compileAppImage();
	}

	/**
	 * Animate the progress bar(s)
	 */
	function compileAppImage() {
		// animate the progress status paragraph
		TweenMax.to(document.getElementById("progress-status"), 5,
		            {width:"100%", opacity:"1"});
		// animate the <progress> element's value
		TweenMax.to(document.querySelector("#AppDir progress"), 5,
		            {value:"100"});
		// create an IIFE
		(function() {
			// create an object with one propriety
			var progressStatus = { var: 0 };
			// create a tween that changes the propriety's value to 100
			TweenMax.to(progressStatus, 5, {var: 100,
				// create a function that is run while the tween is running
				onUpdate: function () {
					// update the "data-value" attribute with an integer
					document.getElementById("progress-status").setAttribute(
					         "data-value", Math.ceil(progressStatus.var));
					// do the same with the fallback progress bar's inner text
					document.querySelector("#fallback-progress-bar span").
					         innerHTML = Math.ceil(progressStatus.var)+"%";
				}
			});
		})();
		// animate the fallback progress bar
		TweenMax.to(document.querySelector("#fallback-progress-bar span"),
		            5, {width:"100%", onComplete:raiseDiv});
	}

	/**
	 * Create a callback function to raise the div
	 */
	function raiseDiv() {
		// raise the AppDir div
		TweenMax.to(document.getElementById("AppDir"), 5,
		            {bottom:"80%", onComplete:createNewApp});
	}

	/**
	 * Create the new app
	 */
	function createNewApp() {
		var newApp;
		// create a new <img> element
		newApp = document.createElement("img");
		// add an "id" attribute
		newApp.setAttribute("id", "newApp");
		// add an "src" attribute
		newApp.setAttribute("src", portableAppIcon);
		// add a bottom offset
		newApp.style.bottom = "100%";
		// make it invisible, temporarily
		newApp.style.height = "0px";
		// add a few event listeners
		if (window.addEventListener) {
			newApp.addEventListener("load", function() {
			// ...flip the  AppDir <div>
			TweenMax.to(document.getElementById("AppDir"),
			            1, {rotation:"-=180", onComplete:showNewApp});
			}, false);
			newApp.addEventListener("click", finishAnimation, false);
			window.addEventListener("resize", positionNewApp, false);
		} else if (window.attachEvent) {
			newApp.attachEvent("onload", function() {
			// ...flip the  AppDir <div>
			TweenMax.to(document.getElementById("AppDir"),
			            1, {rotation:"-=180", onComplete:showNewApp});
			});
			newApp.attachEvent("click", finishAnimation);
			window.attachEvent("resize", positionNewApp);
		}
		// append the <img> element
		document.getElementById("appBuildAnimationScene").appendChild(newApp);
	}

	/**
	 * Show the new app's icon
	 */
	function showNewApp() {
		// position the app
		positionNewApp();
		// add a bottom offset
		document.getElementById("newApp").style.bottom = "80%";
		// drop the new app
		TweenMax.to(document.getElementById("newApp"), 3, {bottom:0,
		            ease:Bounce.easeOut});
		// and then fade out the AppDir div
		TweenMax.to(document.getElementById("AppDir"), 5,
		            {bottom:"+=20%", opacity:"0", delay:0.5});
	}

	/**
	 * Create a function that (re)positions the new app's icon
	 */
	function positionNewApp() {
		var containerHeight, imageWidth, leftOffset;
		// get the AppDir's height
		containerHeight = $("#AppDir").outerHeight();
		// give the app a height
		document.getElementById("newApp").style.height = containerHeight + "px";
		// get the app's width
		imageWidth = $("#newApp").outerWidth();
		// calculate an offset
		leftOffset = ((document.documentElement.clientWidth ||
		               document.body.clientWidth ||
		               $(window).width()) - imageWidth) / 2;
		// set an offset
		document.getElementById("newApp").style.left = leftOffset + "px";
	}

	function finishAnimation() {
		// get the new app's icon
		var newApp = document.getElementById("newApp");
		// set the the 3D effect's intensity of the app icon's tilt
		TweenMax.set(newApp, {transformPerspective:600});
		// tilt the icon
		TweenMax.to(newApp, 2, {rotationX:90,
		            transformOrigin:"center bottom -10", bottom:"-10px",
		            opacity:"0", onComplete:wrapThingsUp});
	}

	/**
	 * Remove the event listeners, remove the elements and enable the button
	 */
	function wrapThingsUp() {
		if (window.removeEventListener) {
			window.removeEventListener("resize", resizeAppDir, false);
		} else if (window.detachEvent) {
			window.detachEvent("resize", resizeAppDir);
		}
		if (window.removeEventListener) {
			window.removeEventListener("resize", positionNewApp, false);
		} else if (window.detachEvent) {
			window.detachEvent("resize", positionNewApp);
		}
		if (newApp.removeEventListener) {
			newApp.removeEventListener("load", showNewApp, false);
			newApp.removeEventListener("click", finishAnimation, false);
		} else if (newApp.detachEvent) {
			newApp.detachEvent("onload", showNewApp);
			newApp.detachEvent("click", finishAnimation);
		}
		// remove the AppDir <div>
		$("#AppDir").remove();
		// remove the app icon
		$("#newApp").remove();

		/**
		 * Enable the button
		 */
		// add an click listener to the Start button
		if (startButton.addEventListener) {
			startButton.addEventListener("click", startAnimation, false);
		} else if (startButton.attachEvent) {
			startButton.attachEvent("click", startAnimation);
		}
		// remove the class that makes it look "pressed"
		startButton.removeAttribute("class", "btnActive");
	}
}
