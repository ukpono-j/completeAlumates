
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




$('.portal_employer').hide();

$('.employee__button').click(function(e) {
  e.preventDefault();
  $(this).addClass('active');
  $('.employer__button').removeClass('active');
  $('.portal_employee').show();
  $('.portal_employer').hide();
  $('#edit-email').focus(); //Should appear after $('.portal_employee').show(); because if it's before that, the register form doesn't exist in the DOM
});

$('.employer__button').click(function(e) {
  e.preventDefault();
  $(this).addClass('active');
  $('.employee__button').removeClass('active');
  $('.portal_employer').show();
  $('.portal_employee').hide();
  $('#edit-firstname').focus(); //Should appear after $('.portal_employer').show(); because if it's before that, the register form doesn't exist in the DOM
});



$("#signUp1").click((e)=>{
  e.preventDefault()
let first_name = "ukpono", last_name = $("#some-id").val()
  $.ajax({
    method: "POST",
    url: "https://alumates.herokuapp.com/api/register",
    data: { first_name: first_name, last_name: "Akpan", email: "ukponoakpan270@gmail.com", phone_number:"08163423850", password: "stiles12" }
  })
})

$("#signUp1").click((e)=>{
  e.preventDefault()
let email = "ukpono", password = $("#some-id").val()
  $.ajax({
    method: "POST",
    url: "https://alumates.herokuapp.com/api/register",
    data: { first_name: first_name, last_name: "Akpan", email: "ukponoakpan270@gmail.com", phone_number:"08163423850", password: "stiles12" }
  })
})



function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}