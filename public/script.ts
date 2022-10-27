const cardForm = document?.querySelector("#cardForm");
// console.log({ cardForm });

cardForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardNumber = parseInt((document?.querySelector("#card_number") as HTMLInputElement).value, 10);
  console.log({ cardNumber });
});
