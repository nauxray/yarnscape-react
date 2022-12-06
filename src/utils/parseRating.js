import dayjs from "dayjs";

export const parseRating = (avgRating) => {
  return `${parseFloat(avgRating)
    .toFixed(1)
    .replace(/[.,]0$/, "")}/5`;
};

export const parseTime = (timestamp) => {
  return dayjs(timestamp).format("D MMMM YYYY");
};
