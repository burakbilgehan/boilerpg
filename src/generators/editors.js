caseConverter = require("./../utils/caseConverter");

function editCommonRoutes(text, pageName, categoryName) {
  const closingPos = text.indexOf("</Switch>");
  let startPos = 0;
  for (let i = closingPos - 1; i > 0; i = i - 1) {
    if (
      !(text.charAt(i) == " " || text.charAt(i) == "\t" || text.charAt(i) == "\n")
    ) {
      startPos = i;
      break;
    }
  }

  const editedTemplate =
    text.slice(0, startPos + 1) + `\n      <PrivateRoute
        path={\`\${match.path}/${caseConverter.toKebab(pageName)}\`}
        component={${caseConverter.toPascal(pageName)}PageRoutes}
        canAccess={${caseConverter.toCamel(pageName)}PageAuthorization.canAccess}
      />` + text.slice(startPos + 1);

  const importEdited = `import { ${caseConverter.toPascal(pageName)}PageRoutes } from 'modules/${categoryName}/${pageName}';
import ${caseConverter.toCamel(pageName)}PageAuthorization from 'modules/${categoryName}/${pageName}/authorization/${caseConverter.toPascal(pageName)}PageAuthorization';\n` + editedTemplate;
  return importEdited;
}

function editCommonNavigation(text, pageName, categoryName) {
  const closingPos = text.indexOf("</StyledSubMenu>");
  let startPos = 0;
  for (let i = closingPos - 1; i > 0; i = i - 1) {
    if (
      !(text.charAt(i) == " " || text.charAt(i) == "\t" || text.charAt(i) == "\n")
    ) {
      startPos = i;
      break;
    }
  }

  const editedTemplate =
    text.slice(0, startPos + 1) + `\n      {${caseConverter.toPascal(pageName)}PageNavigation({ basePath })}`
        + text.slice(startPos + 1);

  const importEdited = `import { ${caseConverter.toPascal(pageName)}PageNavigation } from 'modules/${categoryName}/${pageName}';\n` + editedTemplate;
  return importEdited;
}

module.exports = { editCommonRoutes, editCommonNavigation };