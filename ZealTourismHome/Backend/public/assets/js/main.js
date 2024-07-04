(function () {
    //===== Prealoder

    window.onload = function () {
        window.setTimeout(fadeout, 500);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }

        // Function to initialize the upload functionality for a specific container
        function initializeUpload(container) {
            // Handle click event for .uplaod-loction-click-btn within the specified container
            container.find('.uplaod-loction-click-btn').click(function () {
                // Trigger file input click when the custom button is clicked
                container.find('.form-control').click();
            });
    
            // Handle file input change event within the specified container
            container.find('.form-control').change(function () {
                // Get the selected file within the specified container
                var file = this.files[0];
    
                if (file) {
                    // Display the selected file name in the content span within the specified container
                    //container.find('.content').text(file.name);
    
                    // Display the image in #palce-img within the specified container
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        container.find('.fit-imgwraap').attr('src', e.target.result);
                    };
                    reader.readAsDataURL(file);
    
                    // Show the .image-wrrape div within the specified container
                    container.find('.image-wrrape').removeClass('d-none');
                }
            });
    
            // Handle click event for .delete_uplod_img within the specified container
            container.find('.delete_uplod_img').click(function () {
                Swal.fire({
                    title: "Are you sure?",
                    text: "Are you sure want to delete!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed) {
 // Hide the .image-wrrape div within the specified container
 $(this).closest('.image-wrrape').addClass('d-none');
 container.find('.content').text("Choose file");
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your Image has been deleted.",
                        icon: "success"
                      });
                    }
                  });
               
            });
        }
    
        // Initialize the upload functionality for each .uploadfiles container on the page
        $('.uploadfiles').each(function () {
            initializeUpload($(this));
        });
    
        //img-full visble
     $(".imag-viw").click(function(){
      // Assume you have the image URL stored in a variable called 'imageUrl'
      var imageUrl = $(this).closest('.image-wrrape').find('#palce-img').attr('src');
      
    // Set the 'src' attribute of the image with ID 'palce-img'
    $('#popupfull_palce').attr('src', imageUrl);
        $("#imag_viw_full").modal("show");
    });

    //forex ammount change 
    $('#Change_Forex_Amot').click(function () {
        // Replace the strong element with a text input
        var currentAmount = $('#forex_amount_container strong').text();
        $('#forex_amount_container').html('<input type="number" class="form-control" id="new_forex_amount" value="' + currentAmount + '">');
        
        // Focus on the new text input
        $('#new_forex_amount').focus();

        // Keep the input editable even after losing focus
        $('#new_forex_amount').on('blur', function () {
            updateForexAmount();
        });

        // Update the displayed value when the Enter key is pressed
        $('#new_forex_amount').on('keydown', function (event) {
            if (event.which === 13) {
                updateForexAmount();
            }
        });

        function updateForexAmount() {
            var newAmount = $('#new_forex_amount').val();
            $('#forex_amount_container').html('<strong> ' + newAmount + '</strong>');
        }
    });


    //scroll function
    // window.onscroll = function () {
    //     // show or hide the back-top-top button
    //     var backToTo = document.querySelector(".scroll-top");
    //     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //         backToTo.style.display = "flex";
    //     } else {
    //         backToTo.style.display = "none";
    //     }
    // };

    //login js
      // Add a change event handler to the radio buttons
      $('#UserlogType input[type=radio]').change(function() {
        if (this.id === 'PasswordTry') {
            // Code to execute when "PasswordTry" is checked
           // alert("Password is selected.");
           $("#EnterPasswordArea").removeClass("d-none");
           $("#EnterOtpArea").addClass("d-none");
        } else if (this.id === 'OtpTry') {
            // Code to execute when "OtpTry" is checked
           // alert("OTP is selected.");
           $("#EnterOtpArea").removeClass("d-none");
           $("#EnterPasswordArea").addClass("d-none");
        }
    });

     //Log in show
     $("#LogIn,#LogInAlready").click(function(){
        $("#LogInarea").modal("show");
        $("#CreatAccountarea").modal("hide");
        $("#ForgetPasswordarea").modal("hide");
    });

    //Create acount
    $("#CreatAccount").click(function(){
        $("#LogInarea").modal("hide");
        $("#CreatAccountarea").modal("show");
    });

     //Forget password
     $("#forgetPass").click(function(){
        $("#LogInarea").modal("hide");
        $("#ForgetPasswordarea").modal("show");
    });

     //eye icon to toggle the visibility of password fields
     $(".toggle-password").click(function () {
        const targetId = $(this).data("target");
        const passwordInput = $("#" + targetId);
        const eyeIcon = $(this).find("i");

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            eyeIcon.removeClass("fa-eye-slash").addClass("fa-eye");
        } else {
            passwordInput.attr("type", "password");
            eyeIcon.removeClass("fa-eye").addClass("fa-eye-slash");
        }
    });


    //lottie aniamtion on success_messge
    var animation = null;
    var animationContainer = document.getElementById('animationContainer');
    var animationData = {
      container: animationContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      // path: 'https://assets3.lottiefiles.com/packages/lf20_jbrw3hcz.json' // Replace with the URL of the Lottie animation from LottieFiles
      path: 'https://lottie.host/916e50b5-a948-4275-96e2-c319cb1ac7cb/XKLI99lz2w.json' // Replace with the URL of the Lottie animation from LottieFiles
    };

    // Function to play the animation
    function playAnimation() {
      if (animation) {
        animation.goToAndPlay(0);
        // setout();
      } else {
        animation = lottie.loadAnimation(animationData);
        animation.setSpeed(1.5); // Set the animation speed to 2
        animation.play();
        // setout();
      }
    }

    // function setout(){
    //   setTimeout(function() {
    //      $('.popupContainer').removeClass('active');
    //   }, 1500); // Delay of 1 second (1000 milliseconds)
    // }

    // Button click event
    $('#SavePasswordIn').on('click', function() {
      playAnimation();
    //   $('.popupContainer').addClass('active');
      $('#Changepassword').modal('hide');
    });
    $('#Registertionbtn').on('click', function() {
        playAnimation();
        $('#CreatAccountarea').modal('hide');
        $('#PasswordUpdated').modal('show');

      });

     // social-link send popup
     $(".social-link").click(function(){
        $("#Share_social_media").modal("show");
     });
     //copy link funtion
     $("#copy_link").click(function() {
        var input = $(".field input")[0];
        input.select(); // Select input value
        if (document.execCommand("copy")) { // If the selected text is copied
          $(".Media_content .field").addClass("active");
          $(this).text("Copied");
          setTimeout(function() {
            window.getSelection().removeAllRanges(); // Remove selection from the page
            $(".Media_content .field").removeClass("active");
            $(this).text("Copy");
          }, 3000);
        }
      });


      //book your holiday popup
      $('#enquiry_holdy').on('click', function() {
        $('#Enquiry_holidays_form').modal('show');
      });

       //book your holiday popup
       $('#Enquiry_visa').on('click', function() {
        $('#Enquiry_visa_form').modal('show');
      });

      // downloading pdf jqry
      $('#pdf_fils_Download .dropdown-item').on('click', function() {
        // alert("yes");
        var selectedOption = $(this).data('value');
        $('#selectedOption_pdf_fils').html(selectedOption + ' <i class="fa-solid fa-chevron-down pl-2"></i>');
      });

      $('#download_pdf_btn').on('click', function() {
        var selectedOption = $('#selectedOption_pdf_fils').text().trim();
        alert('Downloading ' + selectedOption);
        // Add your download logic here
      });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });

    $('.scroll-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 200);
        return false;
    });

    //dateragepiker activate
    // $('input[name="daterange"]').daterangepicker();

    //normel activate
     $('.datepicker-mockup').datepicker({
         dateFormat: "dd M yy",
     duration: "fast",
    //  changeYear: true
       });

    // //daytimepiker activate
    $('.time-mockup').timepicker();


    //add item active
    $('.net_banking_system a').on('click', function (e) {
         // Prevent the default link behavior
         e.preventDefault();
         // Remove the 'active' class from all nav links
        $('.net_banking_system a').removeClass('active');
          // Add the 'active' class to the clicked a
        $(this).addClass('active');
    });


    ///Filter item-body showong {
    // $('.heder_select_main a.nav-link').on('click', function (e) {
    //      // Prevent the default link behavior
    //     e.preventDefault();
    //      // Remove the 'active' class from all nav links
    //     $('.heder_select_main a.nav-link').removeClass('active');
    //      // Add the 'active' class to the clicked nav link
    //     $(this).addClass('active');
    //     var filter = $(this).data('filter');
    //     if (filter === 'all') {
    //         $('.item-body').show();
    //     } else {
    //         $('.item-body').hide().filter('[data-category="' + filter + '"]').show();
    //     }
    // });
    $('.heder_select_main a.nav-link').on('click', function (e) {
        // Prevent the default link behavior
        e.preventDefault();

        // Remove the 'active' class from all nav links
        $('.heder_select_main a.nav-link').removeClass('active');

        // Add the 'active' class to the clicked nav link
        $(this).addClass('active');

        var filterClass = $(this).data('filter');

        if (filterClass === 'all') {
            // Show all items if 'All' is selected
            $('.item-body').show();
        } else {
            // Hide all items
            $('.item-body').hide();

            // Show items with the selected class
            $('.item-body.' + filterClass).show();
        }
    });


    // Attach a click event handler to the element with id="saveforitem"
    $("#saveforitem.bookmark").click(function (event) {
        event.preventDefault(); // Prevent the default behavior of the anchor link

        // Toggle the classes and change the icon
        // $(this).find("i").toggleClass("far fa-bookmark fas fa-bookmark");
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).find("i").addClass("far");
            $(this).find("i").removeClass("fas");
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Bookmark successfully"
              });

            $(this).addClass("active");
            $(this).find("i").addClass("fas");
            $(this).find("i").removeClass("far");
        }

    });

    $('#editIcon').click(function() {
        $('#fileInput').click();
    });

    $('#fileInput').change(function() {
        var imgvalue = this.value;
        $("#profile_current_image").attr("src", imgvalue);
    });
    //this just click replace image if u want server side upload image this code below dewon code
    // $('#editIcon').click(function() {
    //     $('#fileInput').click();
    // });

    // $('#fileInput').change(function() {
    //     var fileInput = this;
    //     var formData = new FormData();

    //     // Append the selected file to the FormData object
    //     formData.append('file', fileInput.files[0]);

    //     // Send the file to the server using an AJAX request
    //     $.ajax({
    //         url: 'upload.php', // Replace with your server-side script URL
    //         type: 'POST',
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         success: function(response) {
    //             // Assuming the server returns the file URL
    //             var imgURL = response;
    //             // Update the image source on the web page
    //             $("#profile_current_image").attr("src", imgURL);
    //         }
    //     });
    // });

    // Smooth scroll to section when a navigation item is clicked
    //    $(".top-min-tabpane li a.nav-link").click(function(e) {
    //     e.preventDefault(); // Prevent the default link behavior
    //     var targetId = $(this).attr("id"); // Get the ID of the target section
    //     var targetSection = $("#" + targetId); // Select the target section
    //     console.log(targetSection.offset().top); // Log the offset value
    //     $("html, body").animate({
    //       scrollTop: targetSection.offset().top
    //     }, 1000); // Adjust the duration (in milliseconds) as needed
    //   });
    $(".sliding-link").click(function (e) {
        e.preventDefault();
        var targetId = $(this).attr("href");
        $(".sliding-link").removeClass("active");
        $(this).addClass("active");
        //console.log("Target ID: " + targetId); // Log the targetId
        var targetSection = $(targetId);
        //console.log(targetSection.offset().top); // Log the offset value
        $("html, body").animate({
            scrollTop: targetSection.offset().top - 10
        }, 200);
    });

   // Toggle the left menu and create a modal backdrop
    $("#toggle_menu_profile, #cancel_filter").click(function () {
        $(".profile_menu_list, .left-side-filter").toggleClass("menu-open");
        $("body").toggleClass("menu-left-open");

        // Toggle FontAwesome icons
        $(".menu-icon i").toggleClass("fa-bars fa-times");
        $(".close-icon i").toggleClass("fa-times fa-bars");

        // Create a new div element for the modal backdrop
        var newElement = $("<div>", {
            text: "Left menu open",
            class: "Left_menu_open_modal-backdrop"
        });

        // Append the new element to the body
        $("body").append(newElement);
        if (!$("body").hasClass("menu-left-open")) {
            // The "menu-left-open" class has been removed from the body
            // Trigger your function here
            //alert('menu-left-open class removed from body');
            $(".Left_menu_open_modal-backdrop").remove();
        }
    });

    // Click event handler for the modal backdrop
    $("body").on("click", ".Left_menu_open_modal-backdrop", function () {
        //alert("Clicked on modal backdrop"); // You can perform your actions here
        $("body").removeClass("menu-left-open");
        $(".profile_menu_list, .left-side-filter").removeClass("menu-open");
        $(".menu-icon i").toggleClass("fa-bars fa-times");
        $(".close-icon i").toggleClass("fa-times fa-bars");
        $(this).remove();
    });

    //Tootip bs 4
    $('.Questions-tootip').popover();

    // When the body_Clickable div is clicked
    $(".body_Clickable").click(function (e) {
        e.stopPropagation(); // Prevent the event from propagating to children
        $('.body_Clickable .dropdown-menu').css("display", "");
        $(this).find('.select-item').dropdown('toggle'); // Toggle the dropdown
        $(this).find('.select-adult').dropdown('toggle'); // Toggle the dropdown
        $(this).find('.datepicker-mockup').datepicker('show'); // Show the datepicker
        $(this).find('.time-mockup').timepicker('show'); // Show the timepicker

    });

    // When a dropdown-item is clicked, close the dropdown
    // $(".select-menu .dropdown-item").click(function(e) {
    //   e.preventDefault(); // Prevent the default behavior of the anchor tag
    //   $(this).closest('.select-menu').removeClass('show'); // Close the dropdown
    // //   $('.select-menu').removeClass('show');
    // });

    //dropdeon select item
    $(".select-menu .dropdown-item").click(function () {
        var selText = $(this).text();
        $(this).parents('.input-wrrap').find('.select-item').val(selText);
        // $('.dropdown-menu').dropdown('hide');
    });

    $("body,.datpickermop").click(function () {
        $('.body_Clickable .dropdown-menu').dropdown('hide');
    });
    $(".select-menu .dropdown-item").click(function () {
        $('.body_Clickable .dropdown-menu').css("display", "none");
    });

    $('.body_Clickable').on('hide.bs.dropdown', function () {
        // $('.body_Clickable .dropdown-menu').css("display", "");
    });


    /// navbar button close change

    // $(document).on('click', '.dropdown-menu .booking-card', function (e) {
    //     e.stopPropagation();
    //   });
    // Prevent the input click event from propagating to the dropdown
    $(".input-wrrap select").click(function (e) {
        e.stopPropagation();
    });

    //trigger a file picker
    $('#AttachFile').click(function() {
        // Trigger the file input field
        $('#fileInput').click();
    });

    // Listen for changes in the file input
    $('#fileInput').change(function() {
        // Display the selected file name in the "placefile" input
        $('#placefile').val($(this).val().split('\\').pop()); // This line extracts the filename only
    });

    ///Prograsse bar actvation
    // $('.input-range').each(function () {
    //     var value = $(this).attr('data-slider-value');
    //     var separator = value.indexOf(',');
    //     if (separator !== -1) {
    //         value = value.split(',');
    //         value.forEach(function (item, i, arr) {
    //             arr[i] = parseFloat(item);
    //         });
    //     } else {
    //         value = parseFloat(value);
    //     }
    //     $(this).slider({
    //         formatter: function (value) {
    //             console.log(value);
    //             return '$' + value;
    //         },
    //         min: parseFloat($(this).attr('data-slider-min')),
    //         max: parseFloat($(this).attr('data-slider-max')),
    //         range: $(this).attr('data-slider-range'),
    //         value: value,
    //         tooltip_split: $(this).attr('data-slider-tooltip_split'),
    //         tooltip: $(this).attr('data-slider-tooltip')
    //     });
    // });

    //price range caculation
    $("#slider-range").slider({
		range: true,
		orientation: "horizontal",
		min: 0,
		max: 10000,
		values: [0, 10000],
		step: 100,

		slide: function (event, ui) {
		  if (ui.values[0] == ui.values[1]) {
			  return false;
		  }

		  $("#min_price").val(ui.values[0]);
		  $("#max_price").val(ui.values[1]);
		}
	  });

	  $("#min_price").val($("#slider-range").slider("values", 0));
	  $("#max_price").val($("#slider-range").slider("values", 1));
// hur rage caculation
$("#slider-range_2").slider({
    range: true,
    orientation: "horizontal",
    min: 0,
    max: 24,
    values: [0, 24],
    step: 1,
    slide: function (event, ui) {
      $("#min_hrs").val(ui.values[0] + " Hrs"); // Add " Hrs" to the value
      $("#max_hrs").val(ui.values[1] + " Hrs"); // Add " Hrs" to the value
    }
  });

  // Set initial values with "Hrs" text
  $("#min_hrs").val($("#slider-range_2").slider("values", 0) + " Hrs");
  $("#max_hrs").val($("#slider-range_2").slider("values", 1) + " Hrs");

  $("#min_hrs, #max_hrs").on('input', function () {
    var minVal = parseInt($("#min_hrs").val()) || 0;
    var maxVal = parseInt($("#max_hrs").val()) || 0;

    if (minVal < 0) minVal = 0;
    if (maxVal > 24) maxVal = 24;

    // Update the slider values
    $("#slider-range_2").slider("values", [minVal, maxVal]);

    // Update the input fields with "Hrs" text
    $("#min_hrs").val(minVal + " Hrs");
    $("#max_hrs").val(maxVal + " Hrs");
  });

  // days caculation
$("#slider-range_3").slider({
    range: true,
    orientation: "horizontal",
    min: 0,
    max: 31,
    values: [0, 31],
    step: 1,
    slide: function (event, ui) {
      $("#min_day").val(ui.values[0] + " Days"); // Add " Hrs" to the value
      $("#max_day").val(ui.values[1] + " Days"); // Add " Hrs" to the value
    }
  });

  // Set initial values with "Hrs" text
  $("#min_day").val($("#slider-range_3").slider("values", 0) + " Days");
  $("#max_day").val($("#slider-range_3").slider("values", 1) + " Days");

  $("#min_day, #max_day").on('input', function () {
    var minVal = parseInt($("#min_day").val()) || 0;
    var maxVal = parseInt($("#max_day").val()) || 0;

    if (minVal < 0) minVal = 0;
    if (maxVal > 31) maxVal = 31;

    // Update the slider values
    $("#slider-range_3").slider("values", [minVal, maxVal]);

    // Update the input fields with "Hrs" text
    $("#min_day").val(minVal + " Days");
    $("#max_day").val(maxVal + " Days");
  });

  //Redeem point slider
  $("#slider-point-range").slider({
    orientation: "horizontal",
    min: 0,
    max: 500,
    value: 0,
    step: 10,
    slide: function (event, ui) {
        $("#max_point_price").text(ui.value);

        // Calculate the equivalent AED value (assuming 1 point = 1 AED)
        var aedValue = ui.value;
        $("#aed_discount").text(aedValue.toFixed(2));
    }
});

$("#max_point_price").text($("#slider-point-range").slider("value"));

$("button.btn-theam").on("click", function () {
    // Implement your logic here for applying the discount
    // You can use the value in $("#max_point_price") for the number of points to redeem
    // You can also use the calculated AED value from the slider
    var pointsToRedeem = parseInt($("#max_point_price").text());
    var aedDiscount = pointsToRedeem; // Assuming 1 point = 1 AED

    // Apply the AED discount to your cart or checkout process
    // You can use the "aedDiscount" variable in your application logic
});

    ///owl scroll activation slider_1
    var owl = $('.slider_1').owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: 'slideInRight',
        animateOut: 'slideOutRight',
        nav: true,
        // smartSpeed :900,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        //navText:['<button type="button" class="btn slider-left-btn"><i class="fas fa-chevron-left"></i> </button>','<button type="button" class="btn slider-right-btn"><i class="fas fa-chevron-right"></i></button>'],
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    })

    ///owl scroll activation slider_2
    var owl = $('.slider_2').owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: 'slideInRight',
        animateOut: 'slideOutRight',
        nav: true,
        // smartSpeed :900,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        //navText:['<button type="button" class="btn slider-left-btn"><i class="fas fa-chevron-left"></i> </button>','<button type="button" class="btn slider-right-btn"><i class="fas fa-chevron-right"></i></button>'],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    ///owl scroll activation slider_3
    var owl = $('.slider_3').owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: 'slideInRight',
        animateOut: 'slideOutRight',
        nav: true,
        // smartSpeed :900,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        //navText:['<button type="button" class="btn slider-left-btn"><i class="fas fa-chevron-left"></i> </button>','<button type="button" class="btn slider-right-btn"><i class="fas fa-chevron-right"></i></button>'],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })


    ///owl scroll activation slider_1
    var owl = $('.slider_visa-box').owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: 'slideInRight',
        animateOut: 'slideOutRight',
        nav: true,
        // smartSpeed :900,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        //navText:['<button type="button" class="btn slider-left-btn"><i class="fas fa-chevron-left"></i> </button>','<button type="button" class="btn slider-right-btn"><i class="fas fa-chevron-right"></i></button>'],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    })


    ///owl scroll activation slider_Grid
    var owl = $('.slider_Grid').owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: 'slideInRight',
        animateOut: 'slideOutRight',
        nav: true,
        // smartSpeed :900,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        //navText:['<button type="button" class="btn slider-left-btn"><i class="fas fa-chevron-left"></i> </button>','<button type="button" class="btn slider-right-btn"><i class="fas fa-chevron-right"></i></button>'],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })

    ///owl scroll activation slider_Grid2
    var owl = $('.slider_Grid2').owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: 'slideInRight',
        animateOut: 'slideOutRight',
        nav: true,
        // smartSpeed :900,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        //navText:['<button type="button" class="btn slider-left-btn"><i class="fas fa-chevron-left"></i> </button>','<button type="button" class="btn slider-right-btn"><i class="fas fa-chevron-right"></i></button>'],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })

    // Set the position of the carousel to the first item
    owl.on("initialized.owl.carousel", function (event) {
        var currentIndex = event.item.index;
        owl.trigger("to.owl.carousel", [currentIndex, 0, true]);
    });


    ///owl scroll activation map inner slider
    $('.map-inner-slider').owlCarousel({
        loop: false,
        margin: 0,
        dots: false,
        smartSpeed: 700,
        animateIn: 'slideInRight',
        animateOut: 'slideOutRight',
        nav: true,
        // smartSpeed :900,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        //navText:['<button type="button" class="btn slider-left-btn"><i class="fas fa-chevron-left"></i> </button>','<button type="button" class="btn slider-right-btn"><i class="fas fa-chevron-right"></i></button>'],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    ///if owl scroll open clich happen fix


    $('.dealsOfferCustom a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if ($(e.target).attr('href') === '#Tours-deals') {
            fak_hight_set();
        }
        else if ($(e.target).attr('href') === '#Holidays-deals') {
            fak_hight_set();
        }
        else if ($(e.target).attr('href') === '#UmrahTrip-deals') {
            fak_hight_set();
        }
        else if ($(e.target).attr('href') === '#CarTransfer-deals') {
            fak_hight_set();
        }
        else if ($(e.target).attr('href') === '#Visa-deals') {

            fak_hight_set();
        }
    });

    function fak_hight_set() {
        // not in
        $(".dealsOfferCustom_opens").addClass("fake-hight");
        // Check if  is already initialized
        setTimeout(function () {
            $(".dealsOfferCustom_opens").removeClass("fake-hight");
        }, 500);
    }



    ///tab dlown index popup window

    if ($(window).width() > 991) {
        //768 up

    } else {
        //768 dwalon
        $('#modal-Tours').click(function () {
            $("#Tours_main").modal("show");
        });
        $('#modal-Holidays').click(function () {
            $("#Holidays_main").modal("show");
        });
        $('#modal-Hotels').click(function () {
            $("#Hotels_main").modal("show");
        });
        $('#modal-visa').click(function () {
            $("#visa_main").modal("show");
        });
        $('#modal-UmrahTrip').click(function () {
            $("#UmrahTrip_main").modal("show");
        });
        $('#modal-CarTransfer').click(function () {
            $("#CarTransfer_main").modal("show");
        });

    }


})();



