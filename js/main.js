getApi();
let data = document.getElementById("row");
let searchLabel = document.getElementById("searchLabel");
let searchByName = document.getElementById("searchByName");
let searchByLetter = document.getElementById("searchByLetter");
let submit;
var userName;
var emailName;
var phone;
var Age;
var password;
var Repassword;

// ######### When open the web site for the first time #########
$(document).ready(function () {
  $(".loader").fadeTo(5000, 1, function () {
    $(".inner-loading-screen").css("display", "none");
    $(".loading").fadeOut(2000, function () {
      $("body").css("overflow", "auto");
      $(".loading").remove();
    });
  });
});
let sideBarWidth = $("#sideBarContent").innerWidth();
$("#sideBarContent").animate({ left: -sideBarWidth });
$(".side-bar-container").animate({ left: -sideBarWidth });
$(".paragraf2").slideUp();

//########## when click on the icon of side bar ##################

$(".bar").click(function () {
  if ($("#sideBarContent").css("left") == "0px") {
    $("#sideBarContent").animate({ left: -sideBarWidth }, 1400);
    $(".side-bar-container").animate({ left: -sideBarWidth }, 600);
    $(".fa-xmark").css("display", "none");
    $(".fa-bars").css("display", "block");
    $(".list ").animate({top: "0px;"})
  } else {
    $("#sideBarContent").animate({ left: "0px" }, 400);
    $(".side-bar-container").animate({ left: "0px" }, 800);
    $(".fa-bars").css("display", "none");
    $(".fa-xmark").css("display", "block");
    $(".list ").animate({top: "330px;"})
  }
});

// ########### close side bar when click on any link #################
function closeSideNav() {
  $("#sideBarContent").animate({ left: -sideBarWidth }, 1400);
  $(".side-bar-container").animate({ left: -sideBarWidth }, 600);
  $(".fa-xmark").css("display", "none");
  $(".fa-bars").css("display", "block");
}

// #####################   end of side bar ######################loading
async function getApi() {
  let Http = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`,
    { method: "GET" }
  );
  let myResponse = await Http.json();
  console.log(myResponse["meals"]);
  displayMeals(myResponse["meals"]);
}
getApi();

function displayMeals(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `
      <div class="col-md-3">
      <div onclick="getMealDetails('${array[i].idMeal}')" class="meal position-relative overflow-hidden">
        <img src=${array[i].strMealThumb} class="w-100" alt="" />
        <div
          class="meal-layer position-absolute d-flex align-items-center text-black p-2"
        >
          <h3>${array[i].strMeal}</h3>
        </div>
      </div>
    </div>
    `;
  }
  data.innerHTML = cartona;
}

// ########## end of displaying meals ##############

async function getMealDetails(mealId) {
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  searchLabel.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    { method: "GET" }
  );
  respone = await respone.json();
  console.log(respone["meals"]);
  let cartona = `
  <div class="col-md-4">
  <img src=${respone["meals"][0].strMealThumb} class="w-100" alt="" />
  <h2 class="text-white">${respone["meals"][0].strMeal}</h2>
</div>
<div class="col-md-8">
  <h2 class="text-white">Instructions</h2>
  <p class="text-white">${respone["meals"][0].strInstructions}</p>
  <h3 class="text-white">
    <span class="fw-bolder">Area : </span>${respone["meals"][0].strArea}
  </h3>
  <h3 class="text-white">
    <span class="fw-bolder">Category : </span>${respone["meals"][0].strCategory}
  </h3>
  <h3 class="text-white">Recipes :</h3>
  <div class="d-flex">
  <h5 class=" alert alert-info px-3 mx-2 ">${
    respone["meals"][0].strIngredient1
  }</h5>
  <h5 class=" alert alert-info px-3 mx-2 ">${
    respone["meals"][0].strIngredient2
  }</h5>
  <h5 class=" alert alert-info px-3 mx-2 ">${
    respone["meals"][0].strIngredient3
  }</h5>
  <h5 class=" alert alert-info px-3 mx-2 ">${
    respone["meals"][0].strIngredient4
  }</h5>
  <h5 class=" alert alert-info px-3 mx-2 ">${
    respone["meals"][0].strIngredient5
  }</h5>
  <h5 class=" alert alert-info px-3 mx-2 ">${
    respone["meals"][0].strIngredient6
  }</h5>
  <h5 class=" alert alert-info px-3 mx-2 ">${
    respone["meals"][0].strIngredient7
  }</h5>
  </div>
  <h3 class="text-white">Tags :</h3>
  <h5 class=" alert alert-danger  ">${respone["meals"][0].strTags}</h5>
  <a target="_blank" href="${
    respone["meals"][0].strSource
  }" class="btn btn-success"
    >Source</a
  >
  <a target="_blank" href="${
    respone["meals"][0].strYoutube
  }" class="btn btn-danger"
    >Youtube</a
  >
</div>`;

  data.innerHTML = cartona;
  $(".inner-loading-screen").fadeOut(300)
}

// ########## end of displaying meals Details ##############
 
async function showCategories() {
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  searchLabel.innerHTML = "";
  let Http = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    { method: "GET" }
  );
  let myResponse = await Http.json();
  console.log(myResponse["categories"]);
  displayCategories(myResponse["categories"]);
  $(".inner-loading-screen").fadeOut(300)
}
showCategories();





function displayCategories(array2) {
  let cartona = "";
  for (let i = 0; i < array2.length; i++) {
    cartona += `
      <div class="col-md-3">
      <div onclick="getCategoryMeals('${
        array2[i].strCategory
      }')" class="categories position-relative overflow-hidden">
        <img src=${array2[i].strCategoryThumb} class="w-100" alt="" />
        <div
          class="categ-layer position-absolute text-center text-black p-2"
        >
          <h3>${array2[i].strCategory}</h3>
          <p>${array2[i].strCategoryDescription
            .split(" ")
            .slice(0, 25)
            .join(" ")}</p>
        </div>
      </div>
    </div>
    `;
  }
  data.innerHTML = cartona;
}

async function getCategoryMeals(category) {
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  let cartona = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  console.log(response);

  displayMeals(response["meals"].slice(0, 20));
   $(".inner-loading-screen").fadeOut(300)
  cartona += displayMeals();
  data.innerHTML = cartona;
}

// ########### End of showing and displaying categories ###########

async function showArea() {
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  searchLabel.innerHTML = "";
  let Http = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
    { method: "GET" }
  );
  let myResponse = await Http.json();
  console.log(myResponse["meals"]);
  displayArea(myResponse["meals"]);
  $(".inner-loading-screen").fadeOut(300)
}

function displayArea(countries) {
  let cartona = "";
  for (let i = 0; i < countries.length; i++) {
    cartona += `
  <div class="col-md-3">
            <div onclick="getAreaMeals('${countries[i].strArea}')" class="text-center rounded-2 cursor">
              <i
                class="fa-solid fa-house-laptop fa-4x "
                style="color: #ffffff"
              ></i>
              <h3 class="text-white pt-1">${countries[i].strArea}</h3>
            </div>
          </div>`;
  }
  data.innerHTML = cartona;
}

async function getAreaMeals(areaMeals) {
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  let cartona = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaMeals}`
  );
  response = await response.json();
  console.log(response);

  displayMeals(response["meals"].slice(0, 20));
  $(".inner-loading-screen").fadeOut(300)
  cartona += displayMeals();
  data.innerHTML = cartona;
}

// ########### End of showing and displaying Areas ###########

async function showIngrediants() {
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  searchLabel.innerHTML = "";
  let Http = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
    { method: "GET" }
  );
  let myResponse = await Http.json();
  console.log(myResponse["meals"].slice(0, 20));
  displayIngrediants(myResponse["meals"].slice(0, 20));
  $(".inner-loading-screen").fadeOut(300)
}

function displayIngrediants(Ingrediants) {
  let cartona = "";
  for (let i = 0; i < Ingrediants.length; i++) {
    cartona += `
          <div class="col-md-3">
            <div onclick="getIngrediantsMeals('${
              Ingrediants[i].strIngredient
            }')" class="text-center rounded-2 cursor">
                <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff"></i>
                <h3 class="text-white pt-1">${Ingrediants[i].strIngredient}</h3>
                <p class="text-white pt-1">${Ingrediants[
                  i
                ].strDescription.slice(0, 150)}</p>
            </div>
          </div>`;
  }
  data.innerHTML = cartona;
}

async function getIngrediantsMeals(ingrediantsMeals) {
  let cartona = "";
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantsMeals}`
  );
  response = await response.json();
  console.log(response);

  displayMeals(response["meals"]);
  $(".inner-loading-screen").fadeOut(300)
  cartona += displayMeals();
  data.innerHTML = cartona;
}

// ########### End of showing and displaying Ingrediants ###########

async function showSearchLabel() {
  data.innerHTML = "";
  let cartona = "";
  cartona += `
  <div class="container w-100 d-flex" id="searchLabel">
          <div class="input-group flex-nowrap mx-4  my-4">
          <input onkeyup="getSearchMeals1(this.value)" id="searchByName" type="text" class="form-control bg-transparent text-white" placeholder="Search By First Name"  >
          </div>
          <div class="input-group flex-nowrap mx-4 my-4">
            <input onkeyup="getSearchMeals2(this.value)" id="searchByLetter" type="text" class="form-control bg-transparent text-white" maxlength="1"  placeholder="Search By First Letter"  >
          </div>
        </div>
  `;
  searchLabel.innerHTML = cartona;
}

async function getSearchMeals1(name) {
  let cartona = "";
  $(".inner-loading-screen").fadeIn(300)
  data.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  console.log(response);

  displayMeals(response["meals"]);
  $(".inner-loading-screen").fadeOut(300)
  cartona += displayMeals();
  data.innerHTML = cartona;
}

async function getSearchMeals2(letter) {
  let cartona = "";
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  response = await response.json();
  console.log(response);

  displayMeals(response["meals"]);
  $(".inner-loading-screen").fadeOut(300)
  cartona += displayMeals();
  data.innerHTML = cartona;
}


// ########### End of showing and displaying search ###########

$("#contact").click(function () {
  searchLabel.innerHTML = "";
  $("#row").html(`
   <div class="container w-75 text-center d-flex justify-content-center align-items-center vh-100 ">
  <div class="row g-3 ">
  <div class="col-md-6">
  <input
    type="text"
    id="nameInput"
    placeholder="Enter Your Name"
    class="form-control"
    onkeyup="refName()"
  />
  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
    Special characters and numbers not allowed
  </div>
</div>
<div class="col-md-6">
  <input
  onkeyup="reEmail()"
    id="emailInput"
    type="email"
    placeholder="Enter Your Email"
    class="form-control"
  />
  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
    Email not valid *exemple@yyy.zzz
  </div>
</div>
<div class="col-md-6">
  <input
  onkeyup="rePhoneNumber()"
  
    id="phoneInput"
    type="text"
    placeholder="Enter Your Phone"
    class="form-control"
  />
  <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid Phone Number
  </div>
</div>
<div class="col-md-6">
  <input
    onkeyup=" reAge()"
    id="ageInput"
    type="number"
    placeholder="Enter Your Age"
    class="form-control"
  />
  <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid age
  </div>
</div>
<div class="col-md-6">
  <input
  onkeyup="rePassword()"
    id="passwordInput"
    type="password"
    placeholder="Enter Your password"
    class="form-control"
  />
  <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid password *Minimum eight characters, at least one letter and one
    number:*
  </div>
</div>
<div class="col-md-6">
  <input
  onkeyup="rePasswordReapet()"
    id="repasswordInput"
    type="password"
    placeholder="Reapet Your password"
    class="form-control"
  />
  <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid repassword
  </div>
</div>
<div class="gy-5">
 <button class="btn btn-danger form-control" disabled id="submit-btn">submit</button>
</div>

      
  </div>
  </div>`)
  submit = document.getElementById("submit-btn")
  userName = document.getElementById('nameInput');
  emailName = document.getElementById('emailInput');
  phone = document.getElementById('phoneInput');
  Age = document.getElementById('ageInput');
  password = document.getElementById('passwordInput');
  Repassword = document.getElementById('repasswordInput');

})



function refName() {
  let regex = /^[a-zA-Z ]+$/gm
  if (regex.test(userName.value) == true) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")
  }
  else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")

  }
}
function reEmail() {
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
  if (regex.test(emailName.value) == true) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")

  }
}
function rePhoneNumber() {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm
  if (regex.test(phone.value) == true) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
  }
  else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

  }
}
function reAge() {
  let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/gm
  if (regex.test(Age.value) == true) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
  } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")

  }
}
function rePassword() {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/gm
  if (regex.test(password.value) == true) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
     
  } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

  }
}

function rePasswordReapet() {
  if(document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value){
      $("#submit-btn").attr("disabled", false);
  }else{
      $("#submit-btn").attr("disabled", true);
  }
}
