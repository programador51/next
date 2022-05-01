const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp) => {
  const now = new Date();
  const elapsedTime = (timestamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsedTime) > secondsInUnit || unit === "second") {
      return {
        value: Math.round(elapsedTime / secondsInUnit),
        unit,
      };
    }
  }
};

export default function useTimeago(timestamp) {
  const { value, unit } = getDateDiffs(timestamp);
  const relativeTimeFormat = new Intl.RelativeTimeFormat("es-ES", {
    style: "short",
  });

  console.log(value, unit);

  return relativeTimeFormat.format(value, unit);
  //   return timestamp;
}
