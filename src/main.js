const form = document.getElementById("form");
const console = document.getElementById("console");
function append(line) {
  console.value += line;
  console.value += "\n";
}

form.onsubmit = function(event) {
  fetch("/open", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    const status = res.status;
    if (status >= 200 && status < 300) {
      append("打开了！");
    } else {
      const message = res.json().err;
      append("有个ERROR，不能打开：" + err);
    }
  });

  event.preventDefault();
};
