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

function setCookie(name, value, days) {
    let date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
}

let token = getCookie("access_token"),
    user_email = getCookie("user_email"),
    id = getCookie("user_id"),
    registrationData = {},
    loginData = {}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        // remove cookie
        setCookie("access_token", '', -1)
        setCookie("user_email", '', -1)
        // token = getCookie("access_token")
        // user_email = getCookie("user_email")
        // console.log('token: ' + token)
        // console.log('user_email: ' + user_email)
        // console.log('User signed out.')
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile(),
        id_token = googleUser.getAuthResponse().id_token,
        registerUrl = 'https://alumates.herokuapp.com/api/register',
        loginUrl = 'https://alumates.herokuapp.com/api/login'
    registrationData = {
        first_name: profile.getGivenName(),
        last_name: profile.getFamilyName(),
        email: profile.getEmail()
        // image_url: profile.getImageUrl(),
    }
    loginData = {
        email: profile.getEmail(),
        password: 'password'
    }

    setCookie('access_token', id_token, 1)
    setCookie('user_email', profile.getEmail(), 1)
    // token = getCookie("access_token")
    // user_email = getCookie("user_email")
    // console.log('token: ' + token)
    // console.log('user_email: ' + user_email)
}

console.log(registrationData)

// post(registerUrl, registrationData).done(function (response) {
//     let dataR = JSON.parse(response)
//     console.log('dataR: ' + dataR)
//     if (dataR.message == 'The email has already been taken.') {
//         console.log('log user in instead')
//     } else {
//         console.log(dataR)
//         // create a session to log user into and save their sate
//     }
// })

// post(loginUrl, loginData).done(function (response) {
//     let dataL = JSON.parse(response)
//     console.log('dataR: ' + dataL)
//     if (dataR.message == 'Invalid login details') {
//         console.log('user details incorrect')
//     } else {
//         console.log(dataL)
//         // create a session to log user into and save their sate
//     }
// })

// if (!token) {
//     post(loginUrl, loginData).done(function (response) {
//         let dataL = JSON.parse(response)
//         // console.log('dataL: ' + dataL)
//         if (dataL.message == 'Invalid login details') {
//             // user not in database
//             // register user as data is coming from google server
//         } else {
//             // create a session to log user into and save their sate
//             setCookie("access_token", dataR.access_token, 1)
//             setCookie("user_id", dataR.user.id, 1)
//         }
//     })
// }

// get user id using their email
// add user to alumni

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


    $("#alumni").click((e) => {
        e.preventDefault()

        if (!token) {
            // cannot continue to join alumni
            // redirect user to sign in page
            let err = "You need to be signed in to perform this action"
            // window.location.href = ""
        }
        else {
            // user is logged in, get email
            console.log(getCookie(access_token));
            console.log(getCookie(id));
        }
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
    $("#selectSchool").change(function () {
        let schoolType = $("#selectSchool option:selected").val(),
            schoolTypeId = $("#selectSchool option:selected").data('id')
    });

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
            let school_id = $("#schools option:selected").data('id'),
                graduation_year = $("#graduation_year").val(),
                user_id =
                    alumniUrl = `https://alumates.herokuapp.com/api/alumni`,
                data = {
                    school_id: school_id,
                    graduation_year: graduation_year,
                    user_id: user_id
                }
            post(alumniUrl, data)
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
    });
})