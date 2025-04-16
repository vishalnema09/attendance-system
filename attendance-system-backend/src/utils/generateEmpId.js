const crypto = require("crypto");

const generateEmpId = () => {
  // Prefix + 4-digit random number
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 1000–9999
  const uniqueId = `EMP${randomNum}`;

  return uniqueId;
};

module.exports = generateEmpId;