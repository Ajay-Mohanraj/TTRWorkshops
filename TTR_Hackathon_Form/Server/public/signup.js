const form = document.getElementById("register");

form.addEventListener("submit", userRegistration);

async function userRegistration(event) {
  event.preventDefault();
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;

  const res = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).then((res) => res.json());

  if (res.status == "ok") {
    alert("Success");
    // go to alarm clock
    localStorage.setItem("token", res.data);
    window.location.replace("/ParticipantForm/index.html");
  } else {
    alert(res.error);
  }
}
