export function generateRandomString(
  len: number,
  excludeNumber = false,
): string {
  const availableString =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let generatedString = '';
  for (let i = 0; i < len; i++)
    generatedString +=
      availableString[
        Math.floor(
          Math.random() * (availableString.length - (excludeNumber ? 10 : 0)),
        )
      ];
  return generatedString;
}
export function generateRandomNumber(len: number): string {
  let generatedString = '';
  for (let i = 0; i < len; i++)
    generatedString += Math.floor(Math.random() * 10).toString();
  return generatedString;
}
//End For Test Only Section
