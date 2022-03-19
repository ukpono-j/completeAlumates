
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}




let countryUrl = "https://alumates.herokuapp.com/api/countries", data = {}


$(() => {

  function getRequest(url) {
    $.ajax({
      url: url,

    }).done(function (response) {
      return response
    })
  }

  function postRequest(url, data) {
    $.ajax({
      method: "POST",
      url: url,
      data: data,
    }).done(function (response) { return response })
  }





  $('.portal_employer').hide();

  $('.employee__button').click(function (e) {
    e.preventDefault();
    $(this).addClass('active');
    $('.employer__button').removeClass('active');
    $('.portal_employee').show();
    $('.portal_employer').hide();
    $('#edit-email').focus(); //Should appear after $('.portal_employee').show(); because if it's before that, the register form doesn't exist in the DOM
  });

  $('.employer__button').click(function (e) {
    e.preventDefault();
    $(this).addClass('active');
    $('.employee__button').removeClass('active');
    $('.portal_employer').show();
    $('.portal_employee').hide();
    $('#edit-firstname').focus(); //Should appear after $('.portal_employer').show(); because if it's before that, the register form doesn't exist in the DOM
  });


  // ================== API INIT ==================
  let registerUrl = "https://alumates.herokuapp.com/api/register",
    loginUrl = "https://alumates.herokuapp.com/api/login",
    // countryUrl = "https://alumates.herokuapp.com/api/countries",
    // stateUrl = "https://alumates.herokuapp.com/api/{country_id}/state",
    schooltypeUrl ="https://alumates.herokuapp.com/api/school_types"
  // ==================End of  api init ==================


    registerData = { first_name: "ukpono", last_name: "Akpan", email: "ukponoakpan270@gmail.com", phone_number: "08163423850", password: "stiles12" },
    loginData = { email: "ukponoakpan270@gmail.com", password: "stiles12" }

  $("#signUp1").click((e) => {
    e.preventDefault()
    postRequest(registerUrl, registerData)
  })

  $("#signIn").click((e) => {
    e.preventDefault()
    postRequest(loginUrl, loginData)
  })

  // ============================ COUNTRY ==============
  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }
  


  $("#country").keyup(delay (function () {

    const countryName = $("#country").val()
    countryNameUrl = `https://alumates.herokuapp.com/api/country/${countryName}`;

    let countryId;
    $.ajax({
      url: countryNameUrl,
    }).done(function (response) {
      countries = JSON.parse(response)
      // console.log(countries)
      $.map(countries, function (index) {
        // console.log(index.name)
        // $("#countries").html('')
        $("#countries").append(`<option id='${index.id}' value="${index.name}">`)
        // countryId = 
      })
    })

  }, 500));
  // ======================= STATE ===================


  $("#state").keyup(delay(function () {

    const stateName = $("#state").val()
    countryNameUrl = `https://alumates.herokuapp.com/api/{country_id}/state/${stateName}`;


    console.log(stateUrl)
    $.ajax({
      url: countryNameUrl,
    }).done(function (response) {
      states = JSON.parse(response)
      console.log(states)
      $.map(states, function (index) {

        $("#states").append(`<option id='${index.id}' value="${index.name}">`)
      })
    })

  }, 800));

  // $("#schoolNames").keyup(function () {


  //   schoolNameUrl = `https://alumates.herokuapp.com/api/schools/`;

  //   $.ajax({
  //     url: "https://alumates.herokuapp.com/api/schools/"  ,
  //     success: function (data) {
  //       console.log(data)
  //     }
  //   })
  // });



  $("#selectSchool").click(function () {

    const school_types = $("#selectSchool").val()
    selectSchoolUrl = `https://alumates.herokuapp.com/api/school_types/${school_types}`;
    console.log(selectSchoolUrl)

    $.ajax({
      url: selectSchoolUrl,
    }).done(function (response) {
      selectSchools = JSON.parse(response)

      
      $.map(selectSchools, function (index) {

        $("#selectSchools").append(`<option id='${index.id}' value="${index.name}">`)
      })
    })

  });


  

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have been signed out successfully");
        $(".data").css("display", "none");
        $(".g-signin2").css("display", "block");
    });
  }


  
})



