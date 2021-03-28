#!/usr/bin/env node

const fs = require("fs");
const generateMainPage = require("./../src/generators/generateMainPage");

const path = process.cwd();
const targetPath = process.argv.slice(2)[0].split("/");
const modulesPath = ["src", "modules"];
const pathList = path.split("/");

const findNearestPackageJson = () => {
  const possiblePaths = pathList
    .map((_item, index) => pathList.slice(0, index + 1).join("/"))
    .reverse();

  return possiblePaths.find((path) => {
    if (path.length) {
      return fs.readdirSync(path).includes("package.json");
    }
  });
};

const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`New directory ${dir} is being created`);
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(
    dir.concat("/test.tsx"),
    generateMainPage.generateMainPage()
  );
};

const newPath = findNearestPackageJson()
  .split("/")
  .concat(modulesPath)
  .concat(targetPath)
  .join("/");

createDirectory(newPath);
