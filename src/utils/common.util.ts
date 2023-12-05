import { env } from "../configs/environment.config";
import * as CryptoJS from "crypto-js";

export function generateToken() {
  const character = "1234567890";
  let result = "";
  const characterLength = character.length;

  for (let i = 0; i < 6; i++) {
    result += character.charAt(Math.floor(Math.random() * characterLength));
  }

  return result;
}

export function generateExpDate(currentDate: Date): Date {
  const date: Date = new Date(currentDate.getTime() + 5 * 60 * 1000);
  return date;
}

export function generateEmployeeID(code, num) {
  let pad = "0000";
  num = pad.substring(0, pad.length - num.toString().length) + num.toString();
  return code + num;
}

export function encryptOTP(otp: string): string {
  const newToken = CryptoJS.AES.encrypt(otp, env.SECRET_KEY).toString();
  return newToken.replace(/\+/g, "-").replace(/\//g, "_");
}

export function decryptOTP(otp: string): string {
  const decodedEncryptedToken = decodeURIComponent(otp);

  // Revert the transformation made for URL safety
  const transformedEncryptedToken = decodedEncryptedToken
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  // Decrypt the token
  const bytes = CryptoJS.AES.decrypt(transformedEncryptedToken, env.SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
