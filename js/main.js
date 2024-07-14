/// <reference types="../@types/jquery" />
//-----------lodding-------------------------------
$(function () {

    search('s', ' ').then(() => {
        $(".inner-loading-screen").fadeOut(300)
        $('#lodding').fadeOut(1700, function () {
            $('#lodding').slideUp(1700, function () {
                $('body').css('overflow', 'auto');
                $('#lodding').remove();
            })
        })
    })
})
//------------navbar close-------------------
function close() {
    let widthNavber = $('#nav .navbar_hide_show').outerWidth();
    $('#nav').animate({ left: -widthNavber }, 700)
    $('#nav .open_nav .icon_open_close .open_close').addClass('fa-bars');
    $('#nav .open_nav .icon_open_close .open_close').removeClass('fa-xmark');
    $("#nav .navbar .links a").css('top', '500px');
}
//-------------navbar open--------------------------
function open() {
    $('#nav').animate({ left: 0 }, 700)
    $('#nav .open_nav .icon_open_close .open_close').removeClass('fa-bars');
    $('#nav .open_nav .icon_open_close .open_close').addClass('fa-xmark');

    for (let i = 0; i < 5; i++) {
        $("#nav .navbar .links a").eq(i).animate({
            top: 0
        }, (i + 5) * 100);
    }
}
//-------------call close -----------------------
close();

//---------------toggle nav open and close -------------------
$('#nav .open_nav .icon_open_close .open_close').on('click', function () {

    if ($('#nav').css("left") == '0px') {
        close();
    }
    else {
        open();
    }

})
// -------------------------------------------------

function InputSearchName(value) {
    var NameInput = value;
    search('s', NameInput);
}

function InputSearchFirstName(value) {
    var firstLetter = value;
    if (firstLetter === '') {
        firstLetter = 'a';
    }

    if (firstLetter.length >= 1) {
        search('f', firstLetter);
    }
}

var DataByName = [];


async function search(type, value) {
    DataByName = [];
    $(".inner-loading-screen").fadeIn(300)

    var http = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${type}=${value}`);
    var response = await http.json();

    if (response && response.meals) {
        DataByName = response.meals;
    } else {
        DataByName = [];
        console.error('Invalid or empty JSON response');
    }

    if (type == 's' && value == ' ') {
        displayDataSearch();
    $(".inner-loading-screen").fadeOut(300)


    } else {
        displaySearch();
    $(".inner-loading-screen").fadeOut(300)

    }
}
//------------------------------all display ------------
function displayDataSearch() {
    var cartona = '';
    for (var i = 0; i < DataByName.length; i++) {
        cartona += `
            <div class="col-lg-3 col-md-6 col-12 h-100 rounded section-meal" style="cursor: pointer;" onclick='Detail(${DataByName[i].idMeal})'>
                <div class="position-relative overflow-hidden rounded">
                    <img src="${DataByName[i].strMealThumb}" class="rounded w-100 h-100" alt="meal" />
                    <div class="layer rounded d-flex justify-content-center align-items-start">
                        <h2>${DataByName[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById('mainItem').innerHTML = cartona;
}


//-------------------display in search-------------------
function displaySearch() {
    var cartona = '';
    for (var i = 0; i < DataByName.length; i++) {
        cartona += `
            <div class="col-lg-3 col-md-6 col-12 h-100 rounded section-meal" style="cursor: pointer;" onclick='Detail(${DataByName[i].idMeal})'>
                <div class="position-relative overflow-hidden rounded">
                    <img src="${DataByName[i].strMealThumb}" class="rounded w-100 h-100" alt="meal" />
                    <div class="layer rounded d-flex justify-content-center align-items-start">
                        <h2>${DataByName[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById('SearchName').innerHTML = cartona;
}
// ----------- function search -------------------
function searchContact() {
    var cartona = `
        <div id="search">
            <div class="container">
                <div class="row gy-3 py-5">
                    <div class="col-md-6 col-12">
                        <input
                            type="text"
                            placeholder="Search By Name"
                            id="InputSearchName"
                            oninput="InputSearchName(this.value)"
                            class="rounded text-white w-100 bg-transparent"
                        />
                    </div>
                    <div class="col-md-6 col-12">
                        <input
                            type="text"
                            id="InputSearchFirstName"
                            oninput="InputSearchFirstName(this.value)"
                            maxlength="1"
                            placeholder="Search By First Latter"
                            class="rounded text-white w-100 bg-transparent"
                        />
                    </div>
                </div>
                <div class="row meal gy-4 py-5" id="SearchName">
                    <!-- Display search results here -->
                </div>
            </div>
        </div>
    `;
    document.getElementById('mainItem').innerHTML = cartona;
}

// // -----------------------------function display in search-----------------------

//  ------------------------------category API------------------------------

async function category() {
    DataByName = [];
    $(".inner-loading-screen").fadeIn(300)

    var http = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var response = await http.json();

    if (response && response.categories) {
        DataByName = response.categories;
    } else {
        DataByName = []
        console.error('Invalid or empty JSON response');
    }

    displayDataCategory();
    $(".inner-loading-screen").fadeOut(300)

}
// ----------------display in category----------------
function displayDataCategory() {
    var cartona = '';
    for (var i = 0; i < DataByName.length; i++) {
        cartona += `
            <div class="col-lg-3 col-md-6 col-12 h-100 rounded section-meal" style="cursor: pointer;" onclick="filterDisplay('c','${DataByName[i].strCategory}')">
                <div class="position-relative overflow-hidden rounded">
                    <img src="${DataByName[i].strCategoryThumb}" class="rounded w-100 h-100" alt="meal" />
                    <div class="layer rounded">
                        <h2>${DataByName[i].strCategory}</h2>
                        <p class='pt-3 px-2'>${DataByName[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById('mainItem').innerHTML = cartona;
}
// -------------------- area and Ingredients ApI ----------------------
async function list(type) {
    DataByName = [];
    $(".inner-loading-screen").fadeIn(300)

    try {
        var http = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}='list'`);
        var response = await http.json();

        if (response && response.meals) {
            if (type == 'i') {
                DataByName = response.meals.slice(0, 24);
            }
            else if (type == 'a') {
                DataByName = response.meals;
            }

        } else {
            DataByName = [];
            console.error('Invalid or empty JSON response');
        }

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
    if (type == 'a') {
        displayDataArea();
    $(".inner-loading-screen").fadeOut(300)

    } else if (type == 'i') {
        displayDataIngredients();
    $(".inner-loading-screen").fadeOut(300)

    }

}

// ----------------display in Area----------------
function displayDataArea() {
    var cartona = '';
    for (var i = 0; i < DataByName.length; i++) {
        cartona += `
        <div class="col-lg-3 col-md-6 col-12 d-flex flex-column text-light justify-content-center align-items-center h-100 rounded section-area" style="cursor: pointer;" onclick="filterDisplay('a','${DataByName[i].strArea}')">
            <i class="fa-solid fa-house-laptop py-3"></i>
            <h2>${DataByName[i].strArea}</h2>
        </div>`;
    }

    document.getElementById('mainItem').innerHTML = cartona;
}



//--------------------display in ingredients --------------------
function displayDataIngredients() {
    var cartona = '';
    for (var i = 0; i < DataByName.length; i++) {
        if (DataByName[i].strDescription === 'null') {
        } else {
            cartona += `
                <div class="col-lg-3 col-md-6 col-12 d-flex flex-column text-light justify-content-center align-items-center h-100 rounded section-area" onclick="filterDisplay('i','${DataByName[i].strIngredient}')" style="cursor: pointer;">
                    <i class="fa-solid fa-drumstick-bite py-3"></i>
                    <h2>${DataByName[i].strIngredient}</h2>
                    <p class="text-center py-2 fs-5">
                        ${DataByName[i].strDescription.split(" ").slice(0, 20).join(" ")}
                    </p>
                </div>`;
        }
    }

    document.getElementById('mainItem').innerHTML = cartona;
}


//-------------------give api area ---------------

async function filterDisplay(type, area) {
    DataByName = [];
    $(".inner-loading-screen").fadeIn(300)
    var http = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${area}`)
    var response = await http.json();
    if (response && response.meals) {
        DataByName = response.meals;
    } else {
        DataByName = [];
        console.error('Invalid or empty JSON response');
    }
    displayDataAfterFilter();
    $(".inner-loading-screen").fadeOut(300)
}
// ----------------- filter -----------------------

function displayDataAfterFilter() {
    var cartona = '';
    for (var i = 0; i < DataByName.length; i++) {
        cartona += `
            <div class="col-lg-3 col-md-6 col-12 h-100 rounded section-meal" style="cursor: pointer;" onclick='Detail(${DataByName[i].idMeal})'>
                <div class="position-relative overflow-hidden rounded">
                    <img src="${DataByName[i].strMealThumb}" class="rounded w-100 h-100" alt="meal" />
                    <div class="layer rounded d-flex justify-content-center align-items-start">
                        <h2>${DataByName[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById('mainItem').innerHTML = cartona;
}
// --------------------- API Detail ----------------

async function Detail(id) {

    DataByName = [];
    $(".inner-loading-screen").fadeIn(300)
    var http = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    var response = await http.json()
    if (response && response.meals) {
        DataByName = response.meals;
    } else {
        DataByName = []
        console.error('Invalid or empty JSON response');
    }
    DisplayDtail();
    $(".inner-loading-screen").fadeOut(300)
}
// ---------------- display detail ------------------
function DisplayDtail() {
    cartona = ``;
    for (var i = 0; i < DataByName.length; i++) {
        cartona += `
            <div class="col-lg-4 col-md-12">
                <img
                    src="${DataByName[i].strMealThumb}"
                    alt="meal"
                    class="w-100 pb-3 img"
                />
                <h2 class="detail">${DataByName[i].strMeal}</h2>
            </div>
            <div class="col-lg-8 col-md-12 ps-4">
                <h2 class="detail">Instructions</h2>
                <p class="para">
                    ${DataByName[i].strInstructions}
                </p>
                <h3><span class="fw-bold">Area :</span> ${DataByName[i].strArea}</h3>
                <h3><span class="fw-bold">Category : </span>${DataByName[i].strCategory}</h3>
                <h3><span class="fw-bold">Recipes : </span></h3>
                <ul class="d-flex flex-wrap align-items-center avilableRecipes">
        `;


        for (let j = 1; j <= 20; j++) {
            const measureProperty = `strMeasure${j}`;
            const strIngredient = `strIngredient${j}`;
            const measureValue = DataByName[i][measureProperty];
            const IngredientValue = DataByName[i][strIngredient];

            if (IngredientValue !== null && IngredientValue.trim() !== '') {
                cartona += `<li>${measureValue.trim()} ${IngredientValue.trim()}</li>`;
            }
        }

        cartona += `
                </ul>
                <h3>Tags :</h3>
                <ul class="avilableTag d-flex flex-wrap align-items-center">
        `;

        if (DataByName[i].strTags && DataByName[i].strTags.trim() !== '') {
            var tagsArray = DataByName[i].strTags.split(',');

            tagsArray.forEach(function (tag) {
                cartona += `<li>${tag.trim()}</li>`;
            });
        }

        cartona += `
                </ul>
                <div class="info_lik">
        `;

        if (DataByName[i].strSource !== null) {
            cartona += `<a href="${DataByName[i].strSource}" target="_blank" class="source">Source</a>`;
        }
        if (DataByName[i].strYoutube !== null) {
            cartona += `<a href="${DataByName[i].strYoutube}" target="_blank" class="youtoub">Youtoub</a>`;
        }

        cartona += `
                </div>
            </div>
        `;
    }

    document.getElementById('mainItem').innerHTML = cartona;
}



// -----------------------------contact-------------------------
let submitBtn ;


function contact() {
    var cartona = `<div id="contact" class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="w-100 rounded" placeholder="Enter Your Name">
                <p id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </p>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="w-100 rounded" placeholder="Enter Your Email">
                <p id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </p>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="w-100 rounded" placeholder="Enter Your Phone">
                <p id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </p>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="w-100 rounded" placeholder="Enter Your Age">
                <p id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </p>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="w-100 rounded" placeholder="Enter Your Password">
                <p id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </p>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="w-100 rounded" placeholder="Repassword">
                <p id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </p>
            </div>
        </div>
        <button id="submitBtn" onclick=submit() disabled class="btn btn-outline-danger px-2 mt-5">Submit</button>
    </div>
</div> `
document.getElementById('mainItem').innerHTML = cartona;
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInput = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInput = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInput = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInput = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInput = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInput = true
    })
}

let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;




function inputsValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")

    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function submit(){
    document.getElementById("nameInput").value =""
    document.getElementById("emailInput").value =""
    document.getElementById("phoneInput").value =""
    document.getElementById("ageInput").value =""
    document.getElementById("passwordInput").value =""
    document.getElementById("repasswordInput").value =""
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^[1-9][0-9]$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}










