import { writeFileSync } from "fs";
import { generateJWTFactory } from "../factories/jwt.factory";

export function setKeys() {
    const { publicKey, privateKey } = generateJWTFactory();
    const keys = {
      publicKey: publicKey,
      privateKey: privateKey,
    };
    writeFileSync('keys.json', JSON.stringify(keys, null, 2));
  }