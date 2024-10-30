export const reversedDate = (date) => {
  // console.log(date);
  const result = date?.split("-");
  // console.log("res", `${result[2]}-${result[1]}-${result[0]}`);s
  return `${result[2]}-${result[1]}-${result[0]}`;
};
