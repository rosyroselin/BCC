//Login Page Animation
 // You can change the speed and amount of cards here
var cardAmount = 6;
var flipSpeed = 3000;

// Preload all images to prevent blank cards
// because they're switched with CSS classes
(function preload(imageArray) {
    $(imageArray).each(function(){
        $('<img/>')[0].src = this;
    });
})(['../images/4.png',
	'../images/5.png',
	'../images/1.png',
	'../images/6.png',
	'../images/7.png',
	'../images/4.png',]);

// 3D flip slideshow
(function bfCards(elements, speed) {
	var cards = $('.cards');
	var container = cards.children('.cards__container');
	var front = container.children('.cards__front');
	var back = container.children('.cards__back');

	function swapArticleClass(element, newClass) {
		element.removeClass(function(index, css) {
			return (css.match(/(^|\s)card-\S+/g) || []).join(' ');
		});

		element.addClass(newClass);
	}

	var onTick = function(i) {
		setTimeout(function() {
			var nextClass;
			var currentClass = 'card-' + i;

			if (currentClass === elements)  {
				nextClass = 'card-' + (i + 1);
			} else {
				nextClass = 'card-1';
			}

			if (i % 2 === 0) {
				cards.addClass('is-flipped');
				swapArticleClass(back, currentClass);
				setTimeout(function() {
					swapArticleClass(front, nextClass);
				}, speed / 2);
			} else {
				cards.removeClass('is-flipped');
				swapArticleClass(front, currentClass);
				setTimeout(function() {
					swapArticleClass(back, nextClass);
				}, speed / 2);
			}
		}, speed * i);
	};

	function cycle() {
		for (var i = 1; i <= elements; i++) {
			onTick(i);
		}
	};

	cycle();
	setInterval(cycle, speed * elements);
})(cardAmount, flipSpeed);
 
 
 
 
 // tabbed content
    $(".tab_content").hide('slow');
    $(".tab_content:first").show('slow');

  /* if in tab mode */
    $("ul.tabs li").click(function() {
		
      $(".tab_content").hide('slow');
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();		
		
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

	  $(".tab_drawer_heading").removeClass("d_active");
	  $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
	  
    });
	/* if in drawer mode */
	$(".tab_drawer_heading").click(function() {
      
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
	  
	  $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
	  
	  $("ul.tabs li").removeClass("active");
	  $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
	
	
	/* Extra class "tab_last" 
	   to add border to right side
	   of last tab */
	$('ul.tabs li').last().addClass("tab_last");
	
	
//Form Switch Login Page

$($('input[name=group1]')).on('change', function (event) {
	if ($('input[name=group1]:checked').val() === "yes") {
		currentAcc = "Y";
		$("#internetDiv").show('slow');
		$("#notExistDiv").hide('slow');
	} else {
		currentAcc = "N";
		$("#internetDiv").hide('slow');
		internetBank = "";
	}
	setCustFlag();
});
$($('input[name=group2]')).on('change', function (event) {
	if ($('input[name=group2]:checked').val() === "yes") {
		internetBank = "Y";
	} else {
		internetBank = "N";
	}
	setCustFlag();
});

function setCustFlag() {
    debugger;
    if (currentAcc === "Y" && internetBank === "Y") {
        debugger;
        custFlag = "ERV";
        $("#existingDiv").show('slow');
        $("#existingDiv").attr("disabled", false);
        $("#notExistDiv").hide('slow');
        $(".idBtnClass").hide();
        $("#authenticateNetBank").show();
        $('#authorization').prop("checked", false);
        $("#captchaDebitDiv").show();
        generateCaptchadebit();
//            generateCaptcha();
    } else if (currentAcc === "Y" && internetBank === "N") {
        $('#authorization').prop("checked", false);
        custFlag = "ERV";
        $("#existingDiv").hide('slow');
        $("#notExistDiv").show('slow');
        $(".newCust").hide('slow');
        $(".existCust").show('slow');
        $("#ENTITY").val("");
        $("#ACCOUNTNUM").val("");
//        $("#sendOTP").attr("disabled", true);
        $(".idBtnClass").hide();
        $("#applyExist").show();
        $("#captchaDiv").hide();
    } else if (currentAcc === "N") {
        custFlag = "NTB";
        $('#authorization').prop("checked", false);
        $("#existingDiv").hide('slow');
        $("#notExistDiv").show('slow');
        $(".existCust").hide();
        $(".newCust").show();
        $("#ENTITY").val("");
//        $("#sendOTP").attr("disabled", true);
        $('input[name=group2]').removeAttr("checked");
        $(".idBtnClass").hide();
        $("#applyNew").show();
        $("#captchaDiv").hide();
        $("#ENTITY,#constitution,#EMAIL_ADD").hide();

    } else if (currentAcc === "Y" && internetBank === "") {
        $(".idBtnClass").hide();
        $('#authorization').prop("checked", false);
    }
}