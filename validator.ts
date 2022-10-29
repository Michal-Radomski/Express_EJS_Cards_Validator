const validateCardNumber = (number: string) => {
  // Check if the number contains only numeric value and is of between 13 to 19 digits
  const regex = new RegExp("^[0-9]{13,19}$");
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

// console.log("validateCardNumber:", validateCardNumber("42424242424242"));

const checkCreditCard = (CardNumber: string) => {
  // console.log({ CardNumber }, typeof CardNumber);
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
    // console.log({ i });
    const prefix = cards[i].prefixes.split(",");
    // console.log({ prefix, i });

    for (let j = 0; j < prefix.length; j++) {
      const exp = new RegExp("^" + prefix[j]);
      // console.log({ exp });
      if (exp.test(CardNumber)) {
        prefixValid = true;
        // console.log({ prefixValid });
        cardCompany = cards[i].name;
        index = i;
        // console.log({ cardCompany }, cards[i].name, { i }, { index });
      }
    }

    if (prefixValid) {
      //* Original version
      // const lengths = cards[i].length.split(",");
      // console.log({ lengths }, typeof lengths);
      const lengths = cards[index].length.split(",");
      // console.log({ lengths }, typeof lengths);

      // See if its of valid length;
      for (let j = 0; j < lengths.length; j++) {
        // console.log("lengths[j]:", lengths[j]);
        // console.log(CardNumber.length == Number(lengths[j]), CardNumber.length);
        if (CardNumber.length == Number(lengths[j])) {
          lengthValid = true;
        }
      }
    }

    if (lengthValid && prefixValid) {
      // console.log({ cardCompany }, cards[i].name, { i });
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

// console.log("checkCreditCard:", checkCreditCard("424242424242424")); //* Visa Invalid!!!
// console.log("checkCreditCard:", checkCreditCard("4242424242424242"));
// console.log("checkCreditCard:", checkCreditCard("371449635398431"));
// console.log("checkCreditCard:", checkCreditCard("3400 0000 0000 009"));
// console.log("checkCreditCard:", checkCreditCard("30569309025904"));
// console.log("checkCreditCard:", checkCreditCard("6011111111111117"));
// console.log("checkCreditCard:", checkCreditCard("3530111333300000"));
