const API = "http://localhost:3000";




// REGISTER
function register(){

  const user = {

    name:document.getElementById("name").value,

    email:document.getElementById("email").value,

    password:document.getElementById("password").value

  };

  fetch(API + "/register", {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify(user)

  })

  .then(res => res.text())

  .then(data => {

    alert(data);

    window.location.href = "login.html";

  });

}

function login(){

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  fetch("http://localhost:3000/login", {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      email,
      password
    })

  })

  .then(res => res.text())

  .then(data => {

    if(data === "Login Success"){

      alert("Login Successful ✅");

      // PAGE OPEN AFTER LOGIN
      window.location.href = "Post Item.html";

    } else {

      alert("Invalid Email or Password ❌");

    }

  });

}

function postItem(){

  const item = {

    name:
    document.getElementById("name").value,

    description:
    document.getElementById("description").value,

    location:
    document.getElementById("location").value,

    status:
    document.getElementById("status").value

  };



  if(
    !item.name ||
    !item.description ||
    !item.location
  ){

    alert("Please fill all fields");
    return;

  }



  fetch(API + "/postitem", {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify(item)

  })

  .then(res => res.text())

  .then(data => {

    alert("Item Posted Successfully ✅");

    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";

  })

  .catch(err => {

    console.log(err);

    alert("Server Error ❌");
    window.location.href =" Browse.html";

  });

}




// LOAD ITEMS
if(document.getElementById("items")){

  fetch(API + "/items")

  .then(res => res.json())

  .then(data => {

    let output = "";

    data.forEach(item => {

      output += `

        <div class="card">

          <h2>${item.itemName}</h2>

          <p>${item.location}</p>

          <p>${item.description}</p>

        </div>

      `;

    });

    document.getElementById("items").innerHTML = output;

  });

}






// CLAIM
function claimItem(){

  fetch(API + "/claim", {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      itemId:document.getElementById("itemId").value,

      message:document.getElementById("message").value

    })

  })

  .then(res => res.text())

  .then(data => {

    alert(data);

  });

}

// SEARCH ITEMS
function searchItems(){

  const q =
  document.getElementById("searchBox").value;

  fetch(
    "http://localhost:3000/search?q=" + q
  )

  .then(res => res.json())

  .then(data => {

    let output = "";

    data.forEach(item => {

      output += `

        <div class="card">

          <h2>${item.name}</h2>

          <p>${item.description}</p>

          <p>${item.location}</p>

          <p>${item.status}</p>

        </div>

      `;

    });

    document.getElementById("items").innerHTML = output;

  })

  .catch(err => {

    console.log(err);

    alert("Search Error ❌");

  });

}


// LOAD CLAIMS
function loadClaims() {

  fetch(API + "/claims")
  .then(res => res.json())
  .then(data => {

    document.getElementById("claims").innerHTML =
      data.map(claim => `

      <div class="item-card">

        <h3>Item ID: ${claim.itemId}</h3>

        <p>${claim.message}</p>

        <h4>Status: ${claim.status}</h4>
<button onclick="updateClaim(${claim.id}, 'approved')">
          Approve
        </button>

        <button onclick="updateClaim(${claim.id}, 'rejected')">
          Reject
        </button>

      </div>

      `).join("");
  });
}

// UPDATE CLAIM
function updateClaim(id, status) {

  fetch(API + "/claim-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
          id,
      status
    })
  })
  .then(() => {
    loadClaims();
  });
}
function approveClaim(id){

    document.getElementById(id).innerHTML =
    "Approved";

}

function rejectClaim(id){

    document.getElementById(id).innerHTML =
    "Rejected";

}