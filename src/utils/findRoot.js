#!/usr/bin/env node

const findNearestPackageJson = (fs) => {
  const path = process.cwd();
  const pathList = path.split("/");

  const possiblePaths = pathList
    .map((_item, index) => pathList.slice(0, index + 1).join("/"))
    .reverse();

  return possiblePaths.find((path) => {
    if (path.length) {
      return fs.readdirSync(path).includes("package.json");
    }
  });
};

module.exports = { findNearestPackageJson };
