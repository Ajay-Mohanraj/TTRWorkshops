localStorage.clear();
if (localStorage.getItem("token")) {
  const res = fetch("/", {
    method: "GET",
  }).then((res) => window.location.replace(res.url));
} else {
  window.location.replace("login.html");
}
