const form = document.getElementById("login");

form.addEventListener("submit", userLogin);

async function userLogin(event) {
  event.preventDefault();
  const username = document.getElementById("name").value;
  const pwd = document.getElementById("pwd").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      pwd,
    }),
  }).then((res) => res.json());
  if (res.status == "ok") {
    localStorage.setItem("token", res.data);
    // go to alarm clock
    window.location.replace("/Alarm Clock in JavaScript/index.html");
  } else {
    alert(res.error);
  }
}
