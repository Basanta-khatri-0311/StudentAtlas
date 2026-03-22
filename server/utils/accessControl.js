const getAccessLevel = (score) => {
  if (score >= 80) return "FULL_ACCESS";
  if (score >= 50) return "LIMITED_ACCESS";
  return "LOCKED";
};

module.exports = getAccessLevel;
