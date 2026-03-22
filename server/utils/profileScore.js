const calculateProfileScore = (profile) => {
  let score = 0;

  if (profile.country) score += 15;
  if (profile.city) score += 10;
  if (profile.university) score += 20;
  if (profile.intake) score += 10;
  if (profile.budget) score += 10;
  if (profile.skills?.length > 0) score += 15;
  if (profile.status) score += 20;

  return score;
};

module.exports = calculateProfileScore;
