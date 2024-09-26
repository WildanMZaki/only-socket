const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);

module.exports = {
  encrypt(text) {
    if (typeof text === "number") {
      text = text.toString();
    }
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    const ivHex = iv.toString("hex");
    return `${ivHex}:${encrypted}`;
  },

  decrypt(encryptedString) {
    const [ivHex, encryptedData] = encryptedString.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  },
};
