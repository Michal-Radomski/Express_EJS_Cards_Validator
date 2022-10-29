// DOM
const cardForm = document?.querySelector("#cardForm");
const cardNumberInput = document?.querySelector("#card_number") as HTMLInputElement;
const alertPlaceholder = document.getElementById("alertPlaceholder");
// console.log({ cardForm, cardNumberInput, alertPlaceholder });

// Reset Input on Load
window.onload = () => {
  cardNumberInput.value = "";
};

//* Credit Card Validation
const validateCardNumber = (number: string) => {
  // Check if the number contains only numeric value and is of between 13 to 19 digits
  const regex = new RegExp("^[0-9]{12,19}$");
  if (!regex.test(number)) {
    return false;
  }
  return LuhnCheck(number);
};

const LuhnCheck = (cardNumber: string) => {
  let checksum = 0; // Total checksum
  let j = 1; // Takes value of 1 or 2 -> every second number multiply*2

  // Process each digit one by one starting from the last
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(cardNumber.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;
    // Switch the value of j
    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }
  // Check if it is divisible by 10 or not -> if is -> LuhnCheck is passed1
  return checksum % 10 == 0;
};

const checkCreditCard = (CardNumber: string) => {
  //Error messages
  const ccErrors: string[] = [];
  ccErrors[0] = "Credit card number is in invalid format";
  ccErrors[1] = "Credit card number is invalid";
  ccErrors[2] = "Credit card number has an inappropriate number of digits";

  //Response format
  const response = (success: boolean, message: null | string = null, type: string | null = null) => ({
    message,
    success,
    type,
  });

  interface Card {
    name: string;
    length: string;
    prefixes: string;
    checkDigit: boolean;
  }

  const cards: Card[] = [];
  cards[0] = { name: "Visa", length: "13,16", prefixes: "4", checkDigit: true };
  cards[1] = { name: "MasterCard", length: "16", prefixes: "51,52,53,54,55", checkDigit: true };
  cards[2] = { name: "DinersClub", length: "14,16", prefixes: "305,36,38,54,55", checkDigit: true };
  cards[3] = { name: "Discover", length: "16", prefixes: "6011,622,64,65", checkDigit: true };
  cards[4] = { name: "JCB", length: "16", prefixes: "35", checkDigit: true };
  cards[5] = { name: "American Express", length: "15", prefixes: "34,37", checkDigit: true };
  cards[6] = { name: "VisaElectron", length: "16", prefixes: "4026,417500,4508,4844,4913,4917", checkDigit: true };
  cards[7] = {
    name: "Maestro",
    length: "12,13,14,15,16,18,19",
    prefixes: "5018,5020,5038,6304,6759,6761,6762,6763",
    checkDigit: true,
  };

  // Remove any spaces from the credit card number
  CardNumber = CardNumber.replace(/\s/g, "");

  // Validate the format of the credit card LuhnCheck algorithm
  if (!validateCardNumber(CardNumber)) {
    return response(false, ccErrors[0]);
  }

  // The following are the card-specific checks we undertake.
  let lengthValid = false;
  let prefixValid = false;
  let cardCompany = "";
  let index: number = -1;

  // Check if card belongs to any organization
  for (let i = 0; i < cards.length; i++) {
    const prefix = cards[i].prefixes.split(",");

    for (let j = 0; j < prefix.length; j++) {
      const exp = new RegExp("^" + prefix[j]);
      if (exp.test(CardNumber)) {
        prefixValid = true;
        cardCompany = cards[i].name;
        index = i;
      }
    }

    if (prefixValid) {
      const lengths = cards[index].length.split(",");

      // See if its of valid length;
      for (let j = 0; j < lengths.length; j++) {
        if (CardNumber.length == Number(lengths[j])) {
          lengthValid = true;
        }
      }
    }

    if (lengthValid && prefixValid) {
      return response(true, null, cardCompany);
    }
  }

  // If it isn't a valid prefix there's no point at looking at the length
  if (!prefixValid) {
    return response(false, ccErrors[1]);
  }

  // See if all is OK by seeing if the length was valid
  if (!lengthValid) {
    return response(false, ccErrors[2]);
  }

  // The credit card is in the required format.
  return response(true, null, cardCompany);
};

//* Bootstrap Alert
const alertMessage = (message: string, type: string, icon: string) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible d-flex align-items-center" role="alert">
      <img src=${icon} alt="warning icon" style="margin-right:8px"/>
      <div style="font-weight: bold">${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`,
  ].join("");
  alertPlaceholder!.append(wrapper);
  setTimeout(() => {
    alertPlaceholder?.removeChild(wrapper);
  }, 5000);
};

// Add alert on Letter Input
cardNumberInput!.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" ||
    event.key === "Escape" ||
    event.key === "Backspace" ||
    event.key === "CapsLock" ||
    event.key === "Shift" ||
    event.key === "NumLock" ||
    event.key === "Control" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowLeft" ||
    event.key === "Delete" ||
    (event.ctrlKey && (event.key === "v" || event.key === "V")) ||
    (event.ctrlKey && (event.key === "c" || event.key === "C"))
  ) {
    return;
  }
  if ((event.key >= "a" && event.key <= "z") || (event.key >= "A" && event.key <= "Z")) {
    // alert("Please enter only digits");
    // console.log(event.key);
    alertMessage("Please enter only digits", "warning", "./iconInfo.svg");
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
  // const cardNumber = parseInt(cardNumberStringValue.split(" ").join(""), 10);
  // console.log({ cardNumber });
  const data = checkCreditCard(cardNumberStringValue);
  console.log({ data });
  if (data.success === false || data.type === null) {
    alertMessage(data.message!, "danger", "./iconWarning.svg");
  }
  if (data.success === true && data.type) {
    alertMessage(`Your card is issued by ${data.type!}`, "success", "./iconSuccess.svg");
  }
});
