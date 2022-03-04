
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

