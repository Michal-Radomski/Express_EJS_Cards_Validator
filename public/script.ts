// DOM
const cardForm = document?.querySelector("#cardForm");
const cardNumberInput = document?.querySelector("#card_number") as HTMLInputElement;
const alertPlaceholder = document.getElementById("alertPlaceholder");
// console.log({ cardForm, cardNumberInput, alertPlaceholder });

// Reset Input on Load
window.onload = () => {
  cardNumberInput.value = "";
};

// Bootstrap Alert
const alertMessage = (message: string, type: string) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible d-flex align-items-center" role="alert">
      <img src="iconWarning.svg" alt="warning icon" style="margin-right:5px"/>
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`,
  ].join("");
  alertPlaceholder!.append(wrapper);
  setTimeout(() => {
    alertPlaceholder?.removeChild(wrapper);
  }, 3500);
};

// Add alert on Letter Input
cardNumberInput!.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" ||
    event.key === "Escape" ||
    event.key === "Backspace" ||
    event.key === "CapsLock" ||
    event.key === "Shift"
  ) {
    return;
  }
  if ((event.key >= "a" && event.key <= "z") || (event.key >= "A" && event.key <= "Z")) {
    // alert("Please enter only digits");
    // console.log(event.key);
    alertMessage("Please enter only digits", "warning");
  }
});

// Group the numbers in groups of four
cardNumberInput!.addEventListener("input", (event) => {
  (event.target! as HTMLInputElement).value = (event.target! as HTMLInputElement).value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
});

// Submit form
cardForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardNumberStringValue = cardNumberInput!.value;
  // console.log({ cardNumberStringValue });
  const cardNumber = parseInt(cardNumberStringValue.split(" ").join(""), 10);
  console.log({ cardNumber });
});
