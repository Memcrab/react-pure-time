it("", () => {
  expect(1).toBe(1);
});

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CurrentTimeStamp = new Date();
const TimeStampHour = new Date(CurrentTimeStamp);
TimeStampHour.setHours(CurrentTimeStamp.getHours() - 1);
TimeStampHour.setMinutes(Math.abs(CurrentTimeStamp.getMinutes() + 1));

const TimeStampMinutes = new Date(CurrentTimeStamp);
TimeStampMinutes.setHours(CurrentTimeStamp.getHours() - 1);
TimeStampMinutes.setMinutes(Math.abs(CurrentTimeStamp.getMinutes() + 15));

const mockedStringHour = `${
  monthNames[TimeStampHour.getMonth()]
} ${TimeStampHour.getDate()}, ${TimeStampHour.getFullYear()}, ${TimeStampHour.getHours()}:${TimeStampHour.getMinutes()}`;

const mockedStringMinutes = `${
  monthNames[TimeStampMinutes.getMonth()]
} ${TimeStampMinutes.getDate()}, ${TimeStampMinutes.getFullYear()}, ${TimeStampMinutes.getHours()}:${TimeStampMinutes.getMinutes()}`;

export { mockedStringHour, mockedStringMinutes };
