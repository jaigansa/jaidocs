document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre").forEach((pre) => {
      // Create copy button
      let button = document.createElement("button");
      button.innerText = "Copy";
      button.classList.add("copy-btn");
      
      // Append button to pre element
      pre.appendChild(button);

      // Copy to clipboard functionality
      button.addEventListener("click", () => {
          let code = pre.querySelector("code");
          if (code) {
              navigator.clipboard.writeText(code.innerText).then(() => {
                  button.innerText = "Copied!";
                  setTimeout(() => (button.innerText = "Copy"), 2000);
              });
          }
      });
  });
});
