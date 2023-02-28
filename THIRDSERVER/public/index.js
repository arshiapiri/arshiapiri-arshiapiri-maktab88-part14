// function validation() {
//  const fname = document.getElementById('fname').value;
//  const lname = document.getElementById('lname').value;
//  const psw = document.getElementById('psw').value;
//  const gnd = document.getElementById('gender').value;

//  const fnamecheck = /^[A-Za-z. ]{3,30}$/;
//  const lnamecheck = /^[A-Za-z. ]{3,20}$/;
//  const Gendercheck = /^male$|^female$/;
//  const pswcheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//   if (fnamecheck.test(fname)) {
//     document.getElementById('fnameerror').innerHTML = "";
//   } else {
//     document.getElementById('fnameerror').innerHTML ='Required, Only Characters and Maximum 30 Characters!';
//     return false;
//   }
//   if (lnamecheck.test(lname)) {
//     document.getElementById('lnameerror').innerHTML = "";
//   } else {
//     document.getElementById('lnameerror').innerHTML = "Required, Only Characters and Maximum 30 Characters!";
//     return false;
//   }
//   if (Gendercheck.test(gnd)) {
//     document.getElementById('genderError').innerHTML = "";
//   } else {
//     document.getElementById('genderError').innerHTML = "female or male";
//     return false;
//   }
//   if (pswcheck.test(psw)) {
//     document.getElementById('pass').innerHTML = "";
//   } else {
//     document.getElementById('pass').innerHTML = "Minimum 8 characters, at least 1 letter, 1 number and 1 specialcharacter (@$!%*#?&).";
//     return false;
//   }
// }

document.querySelector("button").addEventListener("click", async () =>{
  const ressponseObject = await fetch("http://localhost:5000/auth/signup")
  const users = await ressponseObject.json();
  console.log(users);
})