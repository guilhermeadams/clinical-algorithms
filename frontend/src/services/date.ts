export const toBR = (date: string) => {
  if (!date) return '';

  return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
};

export default {
  toBR,
};
