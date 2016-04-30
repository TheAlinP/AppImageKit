
/* JSLint options */
/*jslint browser:true, devel:true, for:true*/
/*global window, $, TimelineMax, Power1, Bounce, TweenMax, AppDirWidth,
 fileIcons, imageWidth, windowWidth, AppDir, leftOffset, AppDirHeight,
 AppDirHeading, Power2, initialAnimationsReady, compile, Power0, tlLeft,
 tlRight*/
/* The use of JSLint is optional */


/**
 * Create the animation function
 */
function startAnimation() {
    "use strict";
    // put all the files that go into the compiler into an array
    var filesForTheCompiler = ["images/icons/text-x-c.svg",
            "images/icons/text-x-vala.svg"];
    // put all the other files into an array
    var regularFiles = ["images/icons/text-x-generic.svg",
            "images/icons/text-x-readme.svg",
            "images/icons/text-x-script.svg",
            "images/icons/font-x-generic.svg",
            "images/icons/authors.svg",
            "images/icons/text-html.svg",
            "images/icons/text-x-sql.svg",
            "images/icons/text-x-python.svg",
            "images/icons/text-x-perl.svg",
            "images/icons/image-x-generic.svg",
            "images/icons/text-x-preview.svg",
            "images/icons/text-x-ruby.svg",
            "images/icons/package-x-generic.svg",
            "images/icons/text-x-java-source.svg",
            "images/icons/text-x-changelog.svg",
            "images/icons/application-x-jar.svg"];
    var portableAppIcon = "images/logo3.svg";
    // select the animation container
    var animationScene = document.getElementById("appBuildAnimationScene");

    /**
     * Disable the button until the animation ends
     */
    // remove the click listener from the Start button
    $("#startAnimation").off("click", startAnimation);
    // give it a class to keep the button "pressed"
    $("#startAnimation").toggleClass("btnActive");

    /**
     * Reposition the new app's icon
     */
    function positionNewApp() {
        // get the AppDir's height
        var containerHeight = $("#AppDir-front-side").outerHeight();
        // give the app icon a height. The folder image is 75% of its container;
        // the SVG image has a padding, therefore in order to make the AppImage
        // look as large as the folder's front side its height must be
        // multiplied by 1.2345679012345678
        document.getElementById("newApp").style.height = containerHeight * 0.75 * 1.23 + "px";
        // get the app icon's width
        var imageWidth = $("#newApp").outerWidth();
        // calculate an offset
        var leftOffset = ((document.documentElement.clientWidth) - imageWidth) / 2;
        // set an offset
        document.getElementById("newApp").style.left = leftOffset + "px";
    }

    /**
     * Resize the file icons
     */
    function resizeFileIcons(param) {
        var i;
        // if the function is run for the first time (with the parameter "init")
        if (param === "init") {
            // select the icons
            window.fileIcons = document.querySelectorAll(".fileIcon");
        }
        // calculate the icons' width
        window.imageWidth = AppDirWidth * 150 / (250 + ((1001 - 250) / 10));
        // loop through the resulting array
        for (i = 0; i < fileIcons.length; i += 1) {
            // update the width
            fileIcons[i].style.width = imageWidth + "px";
            // change the left margin
            fileIcons[i].style.marginLeft = parseInt("-" + imageWidth / 2) + "px";
            // change the right margin
            fileIcons[i].style.marginRight = parseInt("-" + imageWidth / 2) + "px";
        }

        // change the width of the C and Vala files
        for (i = 0; i < document.querySelectorAll("#c-file, #vala-file").length; i += 1) {
            document.querySelectorAll("#c-file, #vala-file")[i].style.width = imageWidth + "px";
        }
        // set a max-height for the files that get compiled. The files don't
        // have equal W/H ratios, so by setting only the width one of them
        // becomes higher than the other
        //$("#c-file-container img, #vala-file-container img").css("maxHeight", "187px");
        for (i = 0; i < document.querySelectorAll("#vala-file-container img").length; i += 1) {
            document.querySelectorAll("#vala-file-container img")[i].style.maxHeight = document.getElementById("c-file").height + "px";
        }
    }

    /**
     * Resize the AppDir
     */
    // resize the AppDir <div>
    function resizeAppDir(param) {
        var i;
        // if the function is run for the first time (with the parameter "init")
        if (param === "init") {
            // put the AppDir <div> halves in a global variable
            window.AppDir = document.querySelectorAll(".AppDir");
            // put the header in a global variable
            window.AppDirHeading = document.querySelector("#AppDir-front-side h2");
        }
        // get the browser window's width in a variable
        window.windowWidth = document.documentElement.clientWidth;
        // change AppDir's width depending on the window's width
        // if the window is 250 pixels or less...
        if (windowWidth <= 250) {
            // make the <div>'s width the same as the window's width
            window.AppDirWidth = windowWidth;
            // if the browser window is 251-1000 pixels
        } else if (windowWidth > 250 && windowWidth <= 1000) {
            // set the AppDir as 250px + 1/10 of the additional space
            window.AppDirWidth = 250 + ((windowWidth - 250) / 10);
            // but if the window is 1001 pixels or wider
        } else {
            // set a fixed width - the result of 250 + ((1001 - 250) / 10)
            window.AppDirWidth = 325.1;
        }
        // calculate the height as 79.44023324536968% of the width (icon H / W)
        window.AppDirHeight = AppDirWidth * 0.795;
        // calculate a left offset
        window.leftOffset = (windowWidth - AppDirWidth) / 2;
        for (i = 0; i < AppDir.length; i += 1) {
            // update the width
            AppDir[i].style.width = AppDirWidth + "px";
            // add a height
            AppDir[i].style.height = AppDirHeight + "px";
            // if the function is run for the first time (with the parameter "init")
            if (param === "init") {
            // hide it by setting a bottom offset
                AppDir[i].style.bottom = "-" + AppDirHeight + "px";
            }
        }
        // position the back side in the center by adding a left offset
        AppDir[0].style.left = leftOffset + "px";
        // position the front side in the center by adding a right offset
        AppDir[1].style.right = leftOffset + "px";
        // update the heading's top margin to keep it centered
        AppDirHeading.style.marginTop = (AppDirHeight - $(AppDirHeading).outerHeight()) / 2 + "px";
    }

    /**
     * Finish the animation
     */
    function finishAnimation() {
        // get the new app's icon
        var newApp = document.getElementById("newApp");
        // set the the 3D effect's intensity of the app icon's tilt
        TweenMax.set(newApp, {transformPerspective: 600});
        // tilt the icon
        TweenMax.to(newApp, 2, {rotationX: 90,
                transformOrigin: "center bottom -10", bottom: "-10px",
                opacity: "0", onComplete: function () {
           /**
            * Remove the event listeners and remove the elements
            */
            // remove some event listeners
            $(window).off("resize", resizeAppDir);
            $(window).off("resize", positionNewApp);
            $(newApp).off("click", finishAnimation);
            // clear out the appBuildAnimationScene <div>
            $("#appBuildAnimationScene").children().remove();
            // remove some global variables
            delete window.AppDir;
            delete window.AppDirHeading;
            delete window.AppDirHeight;
            delete window.AppDirWidth;
            delete window.leftOffset;
            delete window.windowWidth;

            /**
             * Enable the button
             */
            // add an click listener to the Start button
            $("#startAnimation").on("click", startAnimation);
            // remove the class that makes it look "pressed"
            $("#startAnimation").toggleClass("btnActive");
        }});
    }

    /**
     * Continue the animation
     */
    function continueAnimation() {
        // create a new <img> element
        var newApp = document.createElement("img");
        // add an "id" attribute
        newApp.setAttribute("id", "newApp");
        // add an "src" attribute
        newApp.setAttribute("src", portableAppIcon);
        // add a bottom offset
        newApp.style.bottom = "100%";
        // make it invisible, temporarily
        newApp.style.height = "0px";
        // run a function when the image is loaded (only once), then detach it
        $(newApp).one("load", function () {
            // create a new TimelineMax instance
            var TLM = new TimelineMax();
            // raise the AppDir <div>
            TLM.to(document.querySelectorAll(".AppDir"), 3, {bottom: "80%"})
            // lower the AppDir <div>
                .to(document.querySelectorAll(".AppDir"),
                        1, {bottom: "0", ease: Power2.easeIn, onComplete: function () {
                    // position the app
                    positionNewApp();
                    // add a bottom offset
                    document.getElementById("newApp").style.bottom = "0";
                    // bounce the new app
                    var showTheApp = new TimelineMax();
                    showTheApp.to(document.getElementById("newApp"), 3,
                            {bottom: "80%", ease: Power1.easeOut})
                        .to(document.getElementById("newApp"), 5, {bottom: "0",
                                ease: Bounce.easeOut});
                    // ...and fade out the AppDir <div>
                    var splitTheDirectory = new TimelineMax();
                    // animate the back side
                    splitTheDirectory.to(document.getElementById("AppDir-back-side"),
                            5, {bottom: "+=60%", left: "10%", opacity: "0", display: "none", rotation: -90})
                    // animate the front side
                        .to(document.getElementById("AppDir-front-side"),
                                5, {bottom: "+=60%", right: "10%", opacity: "0", display: "none", rotation: 90}, "-=5");
                }});
        });
        // run finishAnimation() when clicked then detach it
        $(newApp).one("click", finishAnimation);
        // run positionNewApp() on window resize
        $(window).on("resize", positionNewApp);
        // append the <img> element
        document.getElementById("appBuildAnimationScene").appendChild(newApp);
    }

    /**
     * A callback function for the 2 initial tweens
     */
    // declare a function that is ran when tlLeft and tlRight ends
    function removeFileIcons() {
        // if there is no initialAnimationsReady variable
        if (!window.initialAnimationsReady) {
            // create a global variable showing that one tween finished
            window.initialAnimationsReady = 1;
            // return, since there's nothing else to do
            return;
        }
        // increment initialAnimationsReady with 1 since one more tween ended
        window.initialAnimationsReady += 1;
        // if only 2 animations finished stop and return
        if (initialAnimationsReady < 2) {
            return;
        }
        // detach the file icons' resizing function
        $(window).off("resize", resizeFileIcons);
        // remove all the icons
        $(".fileIcon").remove();
        $("#c-file-container, #vala-file-container").remove();
        // delete some global variables
        delete window.fileIcons;
        delete window.imageWidth;
        delete window.initialAnimationsReady;
        delete window.compile;
        delete window.tlLeft;
        delete window.tlRight;
        // continue the animation
        continueAnimation();
    }

    /**
     * Create the initial animations
     */
    function animateIcons() {
        // resize the file icons
        resizeFileIcons("init");
        // get all the icons on the left
        var leftIcons = document.querySelectorAll(".fileIcon.left");
        // get all the icons on the right
        var rightIcons = document.querySelectorAll(".fileIcon.right");
        //create a TimelineMax instance for the files that will be "compiled"
        window.compile = new TimelineMax({paused: true});
        // create the left TimelineMax instance
        window.tlLeft = new TimelineMax({paused: true});
        // create the right TimelineMax instance
        window.tlRight = new TimelineMax({paused: true});
        /* "compile" the C and Vala files */
        // move the 2 containers to the bottom of the page
        compile.to(document.querySelectorAll("#c-file-container, #vala-file-container"), 10, {bottom: "1%", ease: Power2.easeIn})
            // in the same time, move the C container to the center of the page
            .to(document.getElementById("c-file-container"), 7, {right: "50%", rotation: 360, ease: Power2.easeIn}, "-=10")
            // in the same time, move the Vala container to the center of the page
            .to(document.getElementById("vala-file-container"), 7, {left: "50%", rotation: -360, ease: Power2.easeIn}, "-=10")
            // after the containers reach the center of the page move the C file to the left
            .to(document.getElementById("c-file"), 1, {left: "100%", ease: Power0.easeNone}, "-=3")
            // in the same time, move the Vala file to the right
            .to(document.getElementById("vala-file"), 1, {right: "100%", ease: Power0.easeNone}, "-=3")
            // in the same time, reveal the left half of the compiled code
            .to(document.querySelector("#c-file-container .compiled-code"), 1, {left: "50%", ease: Power0.easeNone}, "-=3")
            // in the same time, reveal the right half of the compiled code
            .to(document.querySelector("#vala-file-container .compiled-code"), 1, {right: "50%", ease: Power0.easeNone}, "-=3");
        // animate the icons one by one, every 1.5 seconds with a delay of 3 seconds
        tlLeft.staggerTo(leftIcons, 8, {bottom: "1%", left: "50%",
                rotation: 360, ease: Power2.easeIn, delay: 3}, 1.5);
        // add a callback function to the left animation
        tlLeft.eventCallback("onComplete", removeFileIcons);
        // animate the icons one by one, every 1.5 seconds with a delay of 3 seconds
        tlRight.staggerTo(rightIcons, 8, {bottom: "1%", right: "50%",
                rotation: -360, ease: Power2.easeIn}, 1.5, "+=3");
        // add a callback function to the right animation
        tlRight.eventCallback("onComplete", removeFileIcons);
        // start "compiling"
        compile.play();
        // play the left instance
        tlLeft.play();
        // play the right instance
        tlRight.play();
        // raise the AppDir <div> up to the bottom of the window (you read it right)
        TweenMax.to(AppDir, 7, {bottom: "1%"});
    }

    /**
     * Create the icons that get "compiled"
     */
    function createCandValaFiles() {
        // create a container that should hold the C icon
        var cFileContainer = document.createElement("div");
        // set an "id"
        cFileContainer.setAttribute("id", "c-file-container");
        // set a "class"
        cFileContainer.setAttribute("class", "compiled-file");
        // hide it by placing it to the left of the page
        cFileContainer.style.right = "100%";
        // place it above the viewing area
        cFileContainer.style.bottom = "100%";
        // create an <img> element
        var cFile = document.createElement("img");
        // set an "src" attribute
        cFile.setAttribute("src", filesForTheCompiler[0]);
        // set an "id"
        cFile.setAttribute("id", "c-file");
        // animate the icons when the C icon is loaded
        $(cFile).one("load", animateIcons);
        // append the C icon to the container element
        cFileContainer.appendChild(cFile);
        // create an <img> element with the left half of the compiled code
        var compiledCodeLeftHalf = document.createElement("img");
        // set an "src" attribute
        compiledCodeLeftHalf.setAttribute("src", "images/icons/multipart-encrypted.svg");
        // set a "class"
        compiledCodeLeftHalf.setAttribute("class", "compiled-code");
        // hide it by placing it 100% to the left
        compiledCodeLeftHalf.style.left = "100%";
        // append the image with the compiled code to the container
        cFileContainer.appendChild(compiledCodeLeftHalf);
        // append the C container to the animation scene
        animationScene.appendChild(cFileContainer);
        // create a container that should hold the Vala icon
        var valaFileContainer = document.createElement("div");
        // set an "id"
        valaFileContainer.setAttribute("id", "vala-file-container");
        // set a "class"
        valaFileContainer.setAttribute("class", "compiled-file");
        // hide it by placing it to the right of the page
        valaFileContainer.style.left = "100%";
        // place it above the viewing area
        valaFileContainer.style.bottom = "100%";
        // create an <img> element
        var valaFile = document.createElement("img");
        // set an "src" attribute
        valaFile.setAttribute("src", filesForTheCompiler[1]);
        // set an "id"
        valaFile.setAttribute("id", "vala-file");
        // append the Vala icon to the container element
        valaFileContainer.appendChild(valaFile);
        // create an <img> element with the compiled code
        var compiledCodeRightHalf = document.createElement("img");
        // set an "src" attribute
        compiledCodeRightHalf.setAttribute("src", "images/icons/multipart-encrypted.svg");
        // set a "class"
        compiledCodeRightHalf.setAttribute("class", "compiled-code");
        // hide it by placing it 100% to the left
        compiledCodeRightHalf.style.right = "100%";
        // append the image with the compiled code to the container
        valaFileContainer.appendChild(compiledCodeRightHalf);
        // append the Vala container to the animation scene
        animationScene.appendChild(valaFileContainer);
        // resize the file icons each time the window is resized
        $(window).on("resize", resizeFileIcons);
    }

    /**
     * Create the regular icons
     */
    // a function that takes the variables with URLs and creates the icons
    function createFileIcons(param) {
        var i;
        var fileIcon;
        // calculate the icon's width
        window.imageWidth = AppDirWidth * 150 / (250 + ((1001 - 250) / 10));
        // loop through the array with file icons
        for (i = 0; i < param.length; i += 1) {
            // create an <img> element
            fileIcon = document.createElement("img");
            // add an "src" attribute
            fileIcon.setAttribute("src", param[i]);
            // add a width
            fileIcon.style.width = imageWidth + "px";
            // if "i" is an even number...
            if (i % 2 === 0) {
                // place the image on the left
                fileIcon.setAttribute("class", "fileIcon left");
            // otherwise...
            } else {
                // place the image on the right
                fileIcon.setAttribute("class", "fileIcon right");
            }
            // add a "margin-left" as half the width
            fileIcon.style.marginLeft = parseInt("-" + imageWidth / 2) + "px";
            // add a "margin-right" as half the width
            fileIcon.style.marginRight = parseInt("-" + imageWidth / 2) + "px";
            // append the image to the container element
            animationScene.appendChild(fileIcon);
        }
    }

    /**
     * Create the AppDir <div>
     */
    function createAppDir() {
        // create a <div> that poses as the back side
        var AppDirBackSide = document.createElement("div");
        // set an "id"
        AppDirBackSide.setAttribute("id", "AppDir-back-side");
        // set a "class"
        AppDirBackSide.setAttribute("class", "AppDir");
        // append the back side to the animation scene
        animationScene.appendChild(AppDirBackSide);
        // create a <div> that poses as the front side
        var AppDirFrontSide = document.createElement("div");
        // set an "id"
        AppDirFrontSide.setAttribute("id", "AppDir-front-side");
        // set a "class"
        AppDirFrontSide.setAttribute("class", "AppDir");
        // create a <heading> to be used as title
        var AppDirTitle = document.createElement("h2");
        // add text to the <heading>
        AppDirTitle.innerHTML = "AppDir";
        // append the <heading> to the front side <div>
        AppDirFrontSide.appendChild(AppDirTitle);
        // append the front side to the scene
        animationScene.appendChild(AppDirFrontSide);
        // resize the AppDir <div>
        resizeAppDir("init");
        // resize the AppDir on window resize
        $(window).on("resize", resizeAppDir);
    }

    // create the AppDir <div>
    createAppDir();
    // create <img> elements with the regular icons
    createFileIcons(regularFiles);
    // create <img> elements with the C and Vala files
    createCandValaFiles();
}

/**
 * Run the animation automatically when the the viewer scrolls to the button
 */
// create an IIFE
(function () {
    "use strict";
    // get the window's height in a variable
    var windowHeight = document.documentElement.clientHeight;
    // get the button's full height in a variable
    var buttonHeight = $("#startAnimation").outerHeight();
    // determine when the button scrolled 1/4 into the window (this is the position
    // of the topmost side of the button in relation to the bottom of the window)
    var distanceFromBottom = (windowHeight / 4) - (buttonHeight / 2);
    // get the scroll position. Used for detecting the scroll direction
    var lastScrollPosition = $(window).scrollTop();
    // attach a function to the scroll event
    $(window).on("scroll", function () {
        // run it only if the button doesn't have the class "btnActive"
        if (!($("#startAnimation").hasClass("btnActive"))) {
            // get the current scroll position in another variable
            var currentScrollPosition = $(window).scrollTop();
            // get the button's position from the top of the page
            var buttonOffset = $("#startAnimation").offset().top;
            // get the scroll distance
            var windowOffset = $(window).scrollTop();
            // if it was scrolled down...
            if (currentScrollPosition > lastScrollPosition) {
                // if the button is somewhere between 1/4 to the bottom of the page
                // and 100 pixels HIGHER (I need to set a range instead of a fixed
                // point because on fast scrolls some browsers may not be able to
                // detect when the button is in that position)
                if ((buttonOffset + buttonHeight - windowOffset) < (windowHeight - distanceFromBottom)
                        && (buttonOffset + buttonHeight - windowOffset) > (windowHeight - distanceFromBottom - 100)) {
                    // start the animation
                    startAnimation();
                }
            // if it was scrolled up...
            } else if (currentScrollPosition < lastScrollPosition) {
                // if the button is somewhere between 1/4 to the top of the page
                // and 100 pixels LOWER (I need to set a range instead of a fixed
                // point because on fast scrolls some browsers may not be able to
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
}());

/**
 * Add a click listener to the button
 */
$("#startAnimation").on("click", startAnimation);
