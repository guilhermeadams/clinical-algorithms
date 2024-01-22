export const FORMAL_RECOMMENDATION = 'formal';
export const INFORMAL_RECOMMENDATION = 'not_formal';
export const GOOD_PRACTICES = 'good_practices';

export const RECOMMENDATION_TYPE = [
  {
    value: FORMAL_RECOMMENDATION,
    label: 'Formal recommendation',
  },
  {
    value: GOOD_PRACTICES,
    label: 'Good practice statement',
  },
  {
    value: INFORMAL_RECOMMENDATION,
    label: 'Informal recommendation',
  },
];

export const DIRECTIONS = [
  {
    value: 'for_intervention',
    label: 'In favor of intervention',
  },
  {
    value: 'against_intervention',
    label: 'Against intervention',
  },
  {
    value: 'both',
    label: 'Both',
  },
];

export const STRENGTH = [
  {
    value: 'weak',
    label: 'Weak',
  },
  {
    value: 'strong',
    label: 'Strong',
  },
];
