
document.getElementById("login").addEventListener("click", async (e) =>{
  console.log(1);
  e.preventDefault()
    const data = {
      "username": document.getElementById("username").value,
      "password": document.getElementById("password").value
    };
   const response =  await fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    console.log(await response.text());
  })