import { UserProfile, UserPreferences, CompatibilityScore } from '../types';

export function calculateCompatibility(
  currentUser: UserProfile,
  targetProfile: UserProfile,
  preferences?: UserPreferences
): CompatibilityScore {
  let valuesScore = 20;
  let timelineScore = 20;
  let lifestyleScore = 20;
  let geographicScore = 20;
  let familyScore = 20;

  const reasons: string[] = [];

  // 1. Timeline & Marriage Horizon
  if (currentUser.marriageHorizon === targetProfile.marriageHorizon) {
    timelineScore += 10;
    reasons.push(`Horizon de mariage parfaitement aligné (${currentUser.marriageHorizon})`);
  } else if (
    (currentUser.marriageHorizon.includes('6 mois') && targetProfile.marriageHorizon.includes('1 an')) ||
    (currentUser.marriageHorizon.includes('1 an') && targetProfile.marriageHorizon.includes('6 mois'))
  ) {
    timelineScore += 6;
    reasons.push('Projets temporels très proches pour concrétiser le mariage');
  }

  // 2. Family & Children
  if (currentUser.desireForChildren === targetProfile.desireForChildren) {
    familyScore += 8;
    reasons.push(`Vision concordante sur le projet d'enfants (${currentUser.desireForChildren})`);
  }
  if (
    (!currentUser.childrenCount || targetProfile.acceptsPartnerWithChildren) &&
    (!targetProfile.childrenCount || currentUser.acceptsPartnerWithChildren)
  ) {
    familyScore += 7;
  }

  // 3. Religious Values & Practices
  if (currentUser.religiousPractice === targetProfile.religiousPractice) {
    valuesScore += 8;
    reasons.push(`Pratique spirituelle et religieuse sur un même rythme`);
  }
  if (currentUser.prayerHabit === targetProfile.prayerHabit) {
    valuesScore += 7;
  }
  
  // Shared values intersection
  const sharedValues = currentUser.values.filter(val => targetProfile.values.includes(val));
  if (sharedValues.length > 0) {
    valuesScore += Math.min(sharedValues.length * 4, 12);
    reasons.push(`Valeurs fondamentales partagées : ${sharedValues.slice(0, 3).join(', ')}`);
  }

  // 4. Geographic & Mobility
  if (currentUser.country === targetProfile.country) {
    geographicScore += 10;
    if (currentUser.city === targetProfile.city) {
      geographicScore += 5;
      reasons.push(`Même localisation géographique (${currentUser.city}, ${currentUser.country})`);
    } else {
      reasons.push(`Même pays de résidence (${currentUser.country})`);
    }
  } else if (
    currentUser.relocationWillingness === 'Prêt(e) à déménager' ||
    targetProfile.relocationWillingness === 'Prêt(e) à déménager'
  ) {
    geographicScore += 7;
    reasons.push('Ouverture réciproque à la mobilité géographique pour le foyer');
  }

  // 5. Languages & Education & Shared Interests
  const sharedLanguages = currentUser.languages.filter(l => targetProfile.languages.includes(l));
  if (sharedLanguages.length > 0) {
    lifestyleScore += 6;
    reasons.push(`Langues communes de communication : ${sharedLanguages.join(', ')}`);
  }

  const sharedInterests = currentUser.interests.filter(i => targetProfile.interests.includes(i));
  if (sharedInterests.length > 0) {
    lifestyleScore += Math.min(sharedInterests.length * 3, 9);
    reasons.push(`Centres d'intérêt partagés : ${sharedInterests.slice(0, 2).join(', ')}`);
  }

  // Adjust against explicit preferences if provided
  if (preferences) {
    if (targetProfile.age >= preferences.ageMin && targetProfile.age <= preferences.ageMax) {
      lifestyleScore += 5;
    } else {
      lifestyleScore = Math.max(5, lifestyleScore - 8);
    }

    if (preferences.countries.length > 0 && preferences.countries.includes(targetProfile.country)) {
      geographicScore += 5;
    }

    if (preferences.verifiedOnly && targetProfile.verification.identityVerified) {
      valuesScore += 4;
    }
  }

  // Cap totals
  const total = Math.min(
    98,
    Math.max(
      45,
      Math.round(
        (valuesScore * 0.25) +
        (timelineScore * 0.25) +
        (familyScore * 0.2) +
        (geographicScore * 0.15) +
        (lifestyleScore * 0.15)
      ) * 2 - 10
    )
  );

  if (reasons.length === 0) {
    reasons.push('Sensibilité partagée aux principes du mariage islamique');
    reasons.push('Démarche sérieuse et respectueuse vérifiée');
  }

  return {
    totalPercentage: total,
    reasons,
    breakdown: {
      values: Math.min(100, Math.round(valuesScore * 2.8)),
      timeline: Math.min(100, Math.round(timelineScore * 2.8)),
      lifestyle: Math.min(100, Math.round(lifestyleScore * 2.8)),
      geographic: Math.min(100, Math.round(geographicScore * 2.8)),
      family: Math.min(100, Math.round(familyScore * 2.8)),
    }
  };
}
