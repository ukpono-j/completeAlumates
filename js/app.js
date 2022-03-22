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




let countryUrl = "https://alumates.herokuapp.com/api/countries",
    data = {}


$(() => {

    function getRequest(url) {
        $.ajax({
            url: url,

        }).done(function(response) {
            return response
        })
    }

    function postRequest(url, data) {
        $.ajax({
            method: "POST",
            url: url,
            data: data,
        }).done(function(response) { return response })
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


    // ================== API INIT ==================
    let registerUrl = "https://alumates.herokuapp.com/api/register",
        loginUrl = "https://alumates.herokuapp.com/api/login",
        // countryUrl = "https://alumates.herokuapp.com/api/countries",
        stateUrl = "https://alumates.herokuapp.com/api/{country_id}/state",
        schooltypeUrl = "https://alumates.herokuapp.com/api/school_types"
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
            var context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

    const schoolTypeUrl = 'https://alumates.herokuapp.com/api/school_types'
    get(schoolTypeUrl).done(function(response) {
        schoolType = JSON.parse(response)
        $.map(schoolType, function(index) {
            $("#selectSchool").append(`<option data-id='${index.id}' value="${index.name}">${index.name}</option>`)
        })
    })

    $("#selectSchool").change(function() {
        let schoolType = $("#selectSchool option:selected").val(),
            schoolTypeId = $("#selectSchool option:selected").data('id')
    });

    const countryNameUrl = `https://alumates.herokuapp.com/api/countries`;
    get(countryNameUrl).done(function(response) {
        data = JSON.parse(response)
        $.map(data, function(index) {
            $("#country").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
        })
    })

    // ======================= STATE ===================
    $("#country").change(function() {
        let countryName = $("#country option:selected").val(),
            countryId = $("#country option:selected").data('id'),

            stateNameUrl = `https://alumates.herokuapp.com/api/${countryId}/states`;
        // console.log(stateNameUrl)
        get(stateNameUrl).done(function(response) {
            states = JSON.parse(response)
            $.map(states, function(index) {
                $("#state").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
            })
        })
    });

    // ======================= CITIES ===================


    // ======================= SCHOOLS ===================
    $("#state").change(function() {
        let stateName = $("#state option:selected").val(),
            schoolTypeId = $("#selectSchool option:selected").data('id')
        stateId = $("#state option:selected").data('id'),
            schoolsUrl = `https://alumates.herokuapp.com/api/${stateId}/cities/schools/${schoolTypeId}`;

        get(schoolsUrl).done(function(response) {
            data = JSON.parse(response)
            $.map(data, function(index) {
                $("#schools").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
            })
        })
    });














    // ======================================== THE NEXT API BTN ============================
    $(document).ready(function() {
        $("#Save").click(function() {
            var newUser = new Object();
            newUser.schoolTypes = $("#selectSchool").val()
            newUser.country = $("#country").val()
            $.ajax({
                url: "https://alumates.herokuapp.com/api/alumnis",

                type: "Post",
                dataType: json,
                data: newUser,
                success: function(data, textStatus, xhr) {
                    console.log(data)
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log("Error in Operation..")
                }
            })
        })
    })






    $('.school').click(function() {
        var selectedSchool = $(this).find('option:selected').val(); //Select the school code which is stored as value for option
        $.ajax({
            url: 'https://alumates.herokuapp.com/api/schools', //Write a function in the server side which accepts school code as argument
            type: 'POST',
            dataType: 'json', //return type from server side function [return it as JSON object]
            contentType: "application/json",
            data: JSON.stringify(selectedSchool), //Pass the data to the function on server side
            success: function(data) { //Array of data returned from server side function
                $.each(data, function(value) {
                    $('.course').append('<option>' + value + '</option>');
                });
            },
            error: function(data) {
                //display any unhandled error
            }
        });
    });




})






function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // const registerUrl = `https://alumates.herokuapp.com/api/register`;
    // let registrationDetails = { first_name, last_name, email }

    // post(registerUrl, data).done(function(response) {
    //     data = JSON.parse(response)
    //     $.map(data, function(index) {
    //         $("#country").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
    //     })
    // })

    console.log('ID: ' + profile.getAuthResponse().id_token);
    console.log('Name: ' + profile.getName());
    console.log('Name: ' + profile.getGivenName());
    console.log('Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}