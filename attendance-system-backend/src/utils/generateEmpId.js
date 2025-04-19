const generateEmpId = () => {
  return "EMP" + Math.floor(Math.random() * 10000); // Generates a random 4-digit Employee ID
};

module.exports = generateEmpId;
