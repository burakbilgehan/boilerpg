function toKebab(string) {
  return string
    .split("")
    .map((letter) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join("")
    .trim()
    .replace(/[_\s]+/g, "-");
} // kebab-case

function toTitle(string) {
  return toKebab(string)
    .split("-")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");
} // Title Case

function toSentence(string) {
  const interim = toKebab(string).replace(/-/g, " ");
  return interim.slice(0, 1).toUpperCase() + interim.slice(1);
} // Sentence case

function toCamel(string) {
  return toKebab(string)
    .split("-")
    .map((word, index) => {
      if (index === 0) return word;
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
} // camelCase

function toSnake(string) {
  return toKebab(string).replace(/-/g, "_");
} // snake_case

function toSnakeAllCaps(string) {
  return toKebab(string).replace(/-/g, "_").toUpperCase();
} // snake_case

function toPascal(string) {
  const interim = toCamel(string);
  return interim.slice(0, 1).toUpperCase() + interim.slice(1);
} // PascalCase

function printAll(string) {
  console.log("toKebab", toKebab(string));
  console.log("toTitle", toTitle(string));
  console.log("toSentence", toSentence(string));
  console.log("toCamel", toCamel(string));
  console.log("toSnake", toSnake(string));
  console.log("toSnakeAllCaps", toSnakeAllCaps(string));
  console.log("toPascal", toPascal(string));
}

module.exports = {
  toKebab,
  toTitle,
  toSentence,
  toCamel,
  toSnake,
  toSnakeAllCaps,
  toPascal,
  printAll,
};
