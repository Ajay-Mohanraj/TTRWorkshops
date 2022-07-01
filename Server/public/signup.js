const form = document.getElementById("register");

form.addEventListener("submit", userRegistration);

async function userRegistration(event) {
  event.preventDefault();
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("pwd").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      pwd,
    }),
  }).then((res) => res.json());

  if (res.status == "ok") {
    alert("Success");
    // go to alarm clock
    localStorage.setItem("token", res.data);
    window.location.replace("/Alarm Clock in JavaScript/index.html");
  } else {
    alert(res.error);
  }
}
