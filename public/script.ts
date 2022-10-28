const cardForm = document?.querySelector("#cardForm");
const cardNumberInput = document?.querySelector("#card_number") as HTMLInputElement;
// console.log({ cardForm, cardNumberInput });

window.onload = () => {
  cardNumberInput.value = "";
};
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
    alert("Please enter only digits");
    // console.log(event.key);
  }
});

cardNumberInput!.addEventListener("input", (event) => {
  (event.target! as HTMLInputElement).value = (event.target! as HTMLInputElement).value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
});

cardForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardNumberStringValue = cardNumberInput!.value;
  // console.log({ cardNumberStringValue });
  const cardNumber = parseInt(cardNumberStringValue.split(" ").join(""), 10);
  console.log({ cardNumber });
});
