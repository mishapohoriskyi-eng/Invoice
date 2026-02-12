export const numberToUkrainianWords = (num: number): string => {
  if (num === 0) return "нуль гривень 00 копійок";

  const grn = Math.floor(num);
  const kop = Math.round((num - grn) * 100);

  const ones = [
    "",
    "одна",
    "дві",
    "три",
    "чотири",
    "п'ять",
    "шість",
    "сім",
    "вісім",
    "дев'ять",
  ];
  const onesMasc = [
    "",
    "один",
    "два",
    "три",
    "чотири",
    "п'ять",
    "шість",
    "сім",
    "вісім",
    "дев'ять",
  ];
  const teens = [
    "десять",
    "одинадцять",
    "дванадцять",
    "тринадцять",
    "чотирнадцять",
    "п'ятнадцять",
    "шістнадцять",
    "сімнадцять",
    "вісімнадцять",
    "дев'ятнадцять",
  ];
  const tens = [
    "",
    "десять",
    "двадцять",
    "тридцять",
    "сорок",
    "п'ятдесят",
    "шістдесят",
    "сімдесят",
    "вісімдесят",
    "дев'яносто",
  ];
  const hundreds = [
    "",
    "сто",
    "двісті",
    "триста",
    "чотириста",
    "п'ятсот",
    "шістсот",
    "сімсот",
    "вісімсот",
    "дев'ятсот",
  ];

  const grivnaForms = ["гривня", "гривні", "гривень"];
  const kopiykaForms = ["копійка", "копійки", "копійок"];
  const thousandForms = ["тисяча", "тисячі", "тисяч"];

  const getForm = (n: number, forms: string[]): string => {
    const mod10 = n % 10;
    const mod100 = n % 100;

    if (mod100 >= 11 && mod100 <= 19) return forms[2];
    if (mod10 === 1) return forms[0];
    if (mod10 >= 2 && mod10 <= 4) return forms[1];
    return forms[2];
  };

  const convertGroup = (n: number, isThousandGroup = false): string => {
    if (n === 0) return "";

    let result = "";

    // Сотні
    const h = Math.floor(n / 100);
    if (h > 0) result += hundreds[h] + " ";

    // Десятки та одиниці
    const remainder = n % 100;
    if (remainder >= 10 && remainder <= 19) {
      result += teens[remainder - 10] + " ";
    } else {
      const d = Math.floor(remainder / 10);
      if (d > 0) result += tens[d] + " ";

      const o = remainder % 10;
      if (o > 0) {
        // Для тисяч використовуємо жіночі форми "одна", "дві"
        if (isThousandGroup) {
          result += ones[o] + " ";
        } else {
          result += onesMasc[o] + " ";
        }
      }
    }

    return result.trim();
  };

  const numberToWords = (n: number): string => {
    if (n === 0) return "";

    let result = "";

    // Тисячі (група 1-999)
    const thousandsNum = Math.floor(n / 1000);
    if (thousandsNum > 0) {
      result += convertGroup(thousandsNum, true) + " ";
      result += getForm(thousandsNum, thousandForms) + " ";
    }

    // Залишок 0-999
    const remainder = n % 1000;
    if (remainder > 0) {
      result += convertGroup(remainder, false) + " ";
    }

    return result.trim();
  };

  const grnWords = numberToWords(grn);
  const grnForm = getForm(grn, grivnaForms);

  // Форматування копійок
  const kopStr = kop < 10 ? "0" + kop : String(kop);
  const kopForm = getForm(kop, kopiykaForms);

  let result = `${grnWords} ${grnForm}`;

  if (kop > 0) {
    result += ` ${kopStr} ${kopForm}`;
  } else {
    result += ` 00 копійок`;
  }

  // Велика літера на початку
  return result.charAt(0).toUpperCase() + result.slice(1);
};
