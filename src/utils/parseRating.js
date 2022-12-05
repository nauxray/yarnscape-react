export const parseRating = (avgRating) => {
  return `${parseFloat(avgRating)
    .toFixed(1)
    .replace(/[.,]0$/, "")}/5`;
};
