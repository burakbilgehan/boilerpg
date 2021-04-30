#!/usr/bin/env node

const fs = require("fs");
const { generators, editors } = require("./../src/generators");
const findNearestPackageJson = require("./../src/utils/findRoot");
const caseConverter = require("./../src/utils/caseConverter");

const targetPath = process.argv.slice(2)[0].split("/");
const pageName = targetPath[targetPath.length - 1];
const categoryName = targetPath[targetPath.length - 2];
const modulesPath = ["src", "modules"];
const newPath = findNearestPackageJson
  .findNearestPackageJson(fs)
  .split("/")
  .concat(modulesPath)
  .concat(targetPath)
  .join("/");
const commonPath = newPath
  .split("/")
  .reverse()
  .slice(1)
  .reverse()
  .concat("common")
  .join("/");

const createOrUpdateDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`New directory ${dir} is being created`);
    fs.mkdirSync(dir);
  }
};

function updateCategoryNavigation() {
  const navigationText = fs.readFileSync(
    `${commonPath}/navigation/${caseConverter.toPascal(
      categoryName
    )}Navigation.tsx`,
    "utf8"
  );
  if (
    !navigationText.includes(
      `modules/${categoryName}/${caseConverter.toCamel(pageName)}`
    )
  ) {
    fs.writeFileSync(
      `${commonPath}/navigation/${caseConverter.toPascal(
        categoryName
      )}Navigation.tsx`,
      editors.editCommonNavigation(navigationText, pageName, categoryName)
    );
  }
}

function updateCategoryRoutes() {
  const routesText = fs.readFileSync(
    `${commonPath}/routes/${caseConverter.toPascal(categoryName)}Routes.tsx`,
    "utf8"
  );
  if (
    !routesText.includes(
      `modules/${categoryName}/${caseConverter.toCamel(pageName)}`
    )
  ) {
    fs.writeFileSync(
      `${commonPath}/routes/${caseConverter.toPascal(categoryName)}Routes.tsx`,
      editors.editCommonRoutes(routesText, pageName, categoryName)
    );
  }
}

function createPageIndex(dir) {
  fs.writeFileSync(
    dir.concat(`/index.ts`),
    generators.generateIndex(pageName, categoryName)
  );
}

function createPageRoutes(dir) {
  fs.writeFileSync(
    dir.concat(`/routes/${caseConverter.toPascal(pageName)}PageRoutes.tsx`),
    generators.generateRoutes(pageName, categoryName)
  );
}

function createMainPage(dir) {
  fs.writeFileSync(
    dir.concat(`/pages/${caseConverter.toPascal(pageName)}Page.tsx`),
    generators.generateMainPage(
      caseConverter.toPascal(pageName),
      process.argv.slice(2)[0],
      `${categoryName}.${caseConverter.toCamel(pageName)}.page.title`
    )
  );
}

function createPageNavigation(dir) {
  fs.writeFileSync(
    dir.concat(
      `/navigation/${caseConverter.toPascal(pageName)}PageNavigation.tsx`
    ),
    generators.generateNavigation(
      pageName,
      categoryName,
      `${categoryName}.${caseConverter.toCamel(pageName)}.page.title`
    )
  );
}

function createPageMessages(dir) {
  fs.writeFileSync(
    dir.concat(`/messages/tr.json`),
    generators.generateMessages(pageName, categoryName)
  );
}

function createPageAuthorization(dir) {
  fs.writeFileSync(
    dir.concat(
      `/authorization/${caseConverter.toPascal(pageName)}PageAuthorization.ts`
    ),
    generators.generateAuthorization(pageName, categoryName)
  );
}

const generate = (dir) => {
  createOrUpdateDirectory(dir);
  createOrUpdateDirectory(`${dir}/authorization`);
  createOrUpdateDirectory(`${dir}/messages`);
  createOrUpdateDirectory(`${dir}/navigation`);
  createOrUpdateDirectory(`${dir}/pages`);
  createOrUpdateDirectory(`${dir}/routes`);
  createPageAuthorization(dir);
  createPageMessages(dir);
  createPageNavigation(dir);
  createMainPage(dir);
  createPageRoutes(dir);
  createPageIndex(dir);
  // edit functions
  updateCategoryRoutes();
  updateCategoryNavigation();
};

generate(newPath);

// another test from jetbrains space
