const form = document.getElementById("login");

form.addEventListener("submit", userLogin);

async function userLogin(event) {
  event.preventDefault();
  const username = document.getElementById("name").value;
  const password = document.getElementById("pwd").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
  console.log(res);
  if (res.status == "success") {
    localStorage.setItem("token", res.data);
    // go to alarm clock
    window.location.replace("/ParticipantForm/index.html");
  } else {
    alert(res.error);
  }
}
