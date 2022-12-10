import dayjs from "dayjs";

export const parseRating = (avgRating) => {
  return `${parseFloat(avgRating)
    .toFixed(1)
    .replace(/[.,]0$/, "")}/5`;
};

export const parseTime = (timestamp, format) => {
  return dayjs(timestamp).format(format ?? "D MMMM YYYY");
};
