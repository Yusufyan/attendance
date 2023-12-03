export function generateToken() {
  const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let result = "";
  const characterLength = character.length;

  for (let i = 0; i < 6; i++) {
    result += character.charAt(Math.floor(Math.random() * characterLength));
  }

  return result;
}

export function generateDate(currentDate: Date): Date {
  const date: Date = new Date(currentDate.getTime() + 5 * 60 * 1000);
  return date;
}

export function generateEmployeeID(code, num) {
  let pad = "0000";
  num = pad.substring(0, pad.length - num.toString().length) + num.toString();
  return code + num;
}
