function validation() {
 const fname = document.getElementById('fristname').value;
 const lname = document.getElementById('lastnamee').value;

 const psw = document.getElementById('password').value;
 const gnd = document.getElementById('gender').value;

 const fnamecheck = /^[A-Za-z. ]{3,30}$/;
 const lnamecheck = /^[A-Za-z. ]{3,20}$/;
 const Gendercheck = /^male$|^female$/;
 const pswcheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (fnamecheck.test(fname)) {
    document.getElementById('fnameerror').innerHTML = "";
  } else {
    document.getElementById('fnameerror').innerHTML ='Required, Only Characters and Maximum 30 Characters!';
    return false;
  }
  if (lnamecheck.test(lname)) {
    document.getElementById('lnameerror').innerHTML = "";
  } else {
    document.getElementById('lnameerror').innerHTML = "Required, Only Characters and Maximum 30 Characters!";
    return false;
  }
  if (Gendercheck.test(gnd)) {
    document.getElementById('genderError').innerHTML = "";
  } else {
    document.getElementById('genderError').innerHTML = "female or male";
    return false;
  }
  if (pswcheck.test(psw)) {
    document.getElementById('pass').innerHTML = "";
  } else {
    document.getElementById('pass').innerHTML = "Minimum 8 characters, at least 1 letter, 1 number and 1 specialcharacter (@$!%*#?&).";
    return false;
  }
  
  document.getElementById("create-user").addEventListener("click", async () =>{
    const data = {
      "username": document.getElementById("username").value,
      "password": document.getElementById('password').value,
      "fristname": document.getElementById("fristname").value,
      "lastname": document.getElementById("lastname").value,
      "gender": document.getElementById("gender").value
    };
  
    await fetch("http://localhost:5000/auth/signup", {
      method: "post",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  })
}
