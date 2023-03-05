document.getElementById("login").addEventListener("click", async () =>{
    const ressponseObject = await fetch("http://localhost:5000/auth/login")
  const users = ressponseObject.json()
  })
  document.getElementById("login").addEventListener("click", async () =>{
    const data = {
      "username": document.getElementById("username").value,
      "password": document.getElementById("password").value
    };
    await fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  })