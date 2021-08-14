const output = document.querySelector("output");
const form = document.querySelector("form");
const input = document.querySelector("input");
const submitBtn = document.querySelector("button");

// CONTRACT URL
//let CONTRACT_URL = "http://localhost:4003/api/v1/oracle";
let CONTRACT_URL = "https://hms-oracle.herokuapp.com/api/v1/oracle";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //output.textContent = "Null";
  input.setAttribute("disabled", true);
  submitBtn.setAttribute("disabled", true);
  submitBtn.textContent = "...";

  try {
    let illness = input.value.trim().replaceAll(" ", "-");
    let res = await fetch(`${CONTRACT_URL}/${illness}`);
    res = await res.json();

    output.textContent = res.data;
    submitBtn.textContent = "Search";
    submitBtn.removeAttribute("disabled");
    input.removeAttribute("disabled");
  } catch (e) {
    console.log(e);
    output.textContent = e;
    input.removeAttribute("disabled");
    submitBtn.removeAttribute("disabled");
  }
});
