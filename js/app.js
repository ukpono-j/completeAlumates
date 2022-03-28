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

$(() => {
    // ============== SEARCH SCHOOLMATES ==============
    $("#search_schoolmates_btn").click(function (e) {
        e.preventDefault()
        let mate = $("#search_schoolmates").val(), searchUrl = `https://alumates.herokuapp.com/api/user/search/${mate}`
        getRequest(searchUrl).done(function (response) {
            console.log(response)
            let data = JSON.parse(response), schoolmates = ''
            $.map(data, function (index) {
                schoolmates_html = `<div class="deep-search-content-bx1">
                    <div class="deep-search-main-content">
                        <div class="deep-search-main-content-img">
                            <img src="./images/bg/${index.image}" alt="profile image">
                        </div>
                        <div class="deep-search-main-content-3">
                            <div class="deep-search-main-content-3-title">
                                <h3>${index.name}</h3>
                                <h6>${index.username}</h6>
                            </div>
                            <div class="deep-search-main-content-3-subtitle">
                                <code>coming soon<code>
                            </div>
                            <div class="deep-search-main-content-3-mini">
                                <div style="display: flex; align-items: center;">
                                    <input type="checkbox">
                                    <p style="padding-left: 10px;"> ${index.school}
                                        <span>class of ${index.graduation_year}</span>
                                    </p>
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <input type="checkbox">
                                    <p style="padding-left: 10px;"> ${index.school}
                                        <span>${index.graduation_year} ${index.school_type == 'university' ? '- ' + index.program : ''}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="deep-search-content-contact"
                        style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="deep-search-content-contact-btn1">
                            <a href="https://play.google.com/store/apps/details?id=com.dreamlabs.alumates">Contact</a>
                        </div>
                        <div class="deep-search-content-contact-5">
                            <div>
                                <img src="./images/icons/location1.png">
                            </div>
                            <div>
                                ${city}, ${country}
                            </div>
                        </div>
                    </div>
                </div>`
            })
            $("#schoolmates_response").append(schoolmates)
        })
    })

    // ============== SEARCH INVITE ==============
    $("#invite_code_btn").click(function (e) {
        e.preventDefault()
        let invite = $("#invite_code").val(),
            inviteUrl = `https://alumates.herokuapp.com/api/user/invite/${invite}`
        get(inviteUrl).done((response) => {
            let ref = JSON.parse(response)
            console.log(ref[0])
            if (ref[0].id != '') {
                $("#referred_by").html(`<p data-id='${ref[0].id}'>${ref[0].first_name} ${ref[0].last_name}</p>`)
            } else {
                $("#referred_by").html(`<p>incorrect invite code</p>`)
            }
        })
    })

    // ============== SCHOOL TYPE ==============
    const schoolTypeUrl = 'https://alumates.herokuapp.com/api/school_types'
    get(schoolTypeUrl).done(function (response) {
        schoolType = JSON.parse(response)
        $("#selectSchool").html('')
        $.map(schoolType, function (index) {
            $("#selectSchool").append(`<option data-id='${index.id}' value="${index.name}">${index.name}</option>`)
        })
    })

    $("#selectSchool").change(function () {
        let schoolType = $("#selectSchool option:selected").val(),
            schoolTypeId = $("#selectSchool option:selected").data('id')
    });

    // ============== COUNTRY ==============
    const countryNameUrl = `https://alumates.herokuapp.com/api/countries`
    get(countryNameUrl).done(function (response) {
        data = JSON.parse(response)
        $("#country").html('')
        $.map(data, function (index) {
            $("#country").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
        })
    })

    // ============== STATE ==============
    $("#country").change(function () {
        let countryId = $("#country option:selected").data('id'),
            stateNameUrl = `https://alumates.herokuapp.com/api/${countryId}/states`;
        get(stateNameUrl).done(function (response) {
            $("#state").html('')
            states = JSON.parse(response)
            $.map(states, function (index) {
                $("#state").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
            })
        })
    });

    // ======================= SCHOOLS ===================
    $("#state").change(function () {
        let schoolTypeId = $("#selectSchool option:selected").data('id'),
            stateId = $("#state option:selected").data('id'),
            schoolsUrl = `https://alumates.herokuapp.com/api/${stateId}/cities/schools/${schoolTypeId}`;

        get(schoolsUrl).done(function (response) {
            $("#schools").html('')
            data = JSON.parse(response)
            if (data.message == 'School not found') {
                $("#schools").html('<button id="sch_not_found_btn">Please Add your School</button>')
            } else {
                $.map(data, function (index) {
                    $("#schools").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
                })
            }
        })

        // ============== NO CITY ==============
        $("#add_alumni_btn").click(function (e) {
            e.preventDefault()
            let name = $("#city").val(), state_id = $("#state").val(),
                cityUrl = `https://alumates.herokuapp.com/api/city/${name}`,
                data = {
                    name: name,
                    state_id: state_id
                }
            postRequest(cityUrl, data)
        })

        // ======================= CITY ===================
        $("#state").change(function () {
            stateId = $("#state option:selected").data('id'),
                cityUrl = `https://alumates.herokuapp.com/api/${stateId}/cities`;
            get(cityUrl).done(function (response) {
                $("#city").html('')
                cities = JSON.parse(response)
                $.map(cities, function (index) {
                    $("#city").append(`<option data-id="${index.id}"  value="${index.name}">${index.name}</option>`)
                })
            })
        });

        // ============== ALUMNI ==============
        $("#join_alumni").click(function (e) {
            e.preventDefault()
            let school_id = $("#schools").val(),
                graduation_year = $("#graduation_year").val(),
                alumniUrl = `https://alumates.herokuapp.com/api/user/search/${mate}`,
                data = {
                    school_id: school_id,
                    graduation_year: graduation_year
                }
            console.log(data)
            // post(alumniUrl, data)
        })


        // ======================= ADD SCHOOL ===================
        // ============== NO SCHOOL ==============
        $("#add_alumni_btn").click(function (e) {
            e.preventDefault()
            let school_id = $("#school").val(), city_id = $("#city").val(),
                schoolUrl = `https://alumates.herokuapp.com/api/user/search/${mate}`,
                data = {
                    school_id: school_id
                }
            postRequest(alumniUrl, data)
        })
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
            loginUrl = "https://alumates.herokuapp.com/api/login"
        // ==================End of  api init ==================


        registerData = { first_name: "ukpono", last_name: "Akpan", email: "ukponoakpan270@gmail.com", phone_number: "08163423850", password: "stiles12" },
            loginData = { email: "ukponoakpan270@gmail.com", password: "stiles12" }

        $("#signUp1").click((e) => {
            e.preventDefault()
            post(registerUrl, registerData)
        })

        $("#signIn").click((e) => {
            e.preventDefault()
            post(loginUrl, loginData)
        })
    });

    $('.school').click(function () {
        var selectedSchool = $(this).find('option:selected').val(); //Select the school code which is stored as value for option
        $.ajax({
            url: 'https://alumates.herokuapp.com/api/schools', //Write a function in the server side which accepts school code as argument
            type: 'POST',
            dataType: 'json', //return type from server side function [return it as JSON object]
            contentType: "application/json",
            data: JSON.stringify(selectedSchool), //Pass the data to the function on server side
            success: function (data) { //Array of data returned from server side function
                $.each(data, function (value) {
                    $('.course').append('<option>' + value + '</option>');
                });
            },
            error: function (data) {
                //display any unhandled error
            }
        });
    });




})






function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const registerUrl = `https://alumates.herokuapp.com/api/register`;
    let registrationDetails = {
        first_name: profile.getGivenName(),
        last_name: profile.getFamilyName(),
        email: profile.getEmail()
    }

    post(registerUrl, registrationDetails).done(function (response) {
        // data = JSON.parse(response)
        // create a session to log user into and save their sate
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        // console.log('User signed out.');
    });
}