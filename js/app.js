
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







function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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


  let registerUrl = "https://alumates.herokuapp.com/api/register",
    loginUrl = "https://alumates.herokuapp.com/api/login",
    countryUrl = "https://alumates.herokuapp.com/api/countries",

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


  $("#state").keyup(function () {

    const stateName = $("#state").val()
    stateNameUrl = `https://alumates.herokuapp.com/api/state/${stateName}`;

    $.ajax({
      url: stateNameUrl,
    }).done(function (response) {
      states = JSON.parse(response)
      console.log(states)
      $.map(states, function (index) {

        $("#states").append(`<option id='${index.id}' value="${index.name}">`)
      })
    })

  });

  $("#schoolNames").keyup(function () {

    // const schoolMainNames = $("#schoolNames").val()
    // schoolNameUrl = `https://alumates.herokuapp.com/api/school/{name}${schoolMainNames}`;
    schoolNameUrl = `https://alumates.herokuapp.com/api/schools/`;

    $.ajax({
      url: "https://alumates.herokuapp.com/api/schools/"  ,
      success: function (data) {
        console.log(data)
        // data.forEach(element => {
        //   $("")
        // })
      }
    })
  });



  // $(document).ready(function(){
  //   $("#schoolName").keyup(function(){
  //     const stateDataName = $("#schoolName").val()
  //     $.ajax({
  //       type: "Post",
  //       url: "https://alumates.herokuapp.com/api/school/{name}" , 
  //       data: stateDataName, 
  //       sucess: function(data){
  //         $("#schoolNames").html(data);
  //       }
  //     });
  //   });
  // });


  // $.ajax({
  //   url: countryUrl,
  // }).done(function (response) {
  // countries = JSON.parse(response)
  //   $.map(countries, function(index){
  //     console.log(index.name)
  //     countrySelections.append(`<option value="${index.id}">${index.name}</option>`)
  //   })  
  // })

  


})

