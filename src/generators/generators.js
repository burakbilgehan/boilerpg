caseConverter = require("./../utils/caseConverter");

function generateAuthorization(pageName, categoryName) {
  const allCaps = caseConverter.toSnakeAllCaps(pageName);
  return `import PageAuthorization from 'core/authentication/roles/PageAuthorization';
import Role from 'core/authentication/roles/Role';
import ${categoryName}Roles from 'modules/${categoryName}/common/authorization/${
    categoryName.slice(0, 1).toUpperCase() + categoryName.slice(1)
  }Roles';

const ${allCaps}_ADMIN = new Role('ROLE_${allCaps}_ADMIN');
const ${allCaps}_USER = new Role('ROLE_${allCaps}_USER');

const accessRoles = [${allCaps}_ADMIN, ${allCaps}_USER];
const writeRoles = [${allCaps}_ADMIN];

${categoryName}Roles.register(accessRoles);

const ${pageName}PageAuthorization = new PageAuthorization(accessRoles, writeRoles);

export default ${pageName}PageAuthorization;
`;
}

const generateIndex = (pageName, categoryName) => {
  return `import { lazy } from 'react';

const ${caseConverter.toPascal(pageName)}PageRoutes = lazy(() => import('modules/${categoryName}/${caseConverter.toCamel(
    pageName
  )}/routes/${caseConverter.toPascal(pageName)}PageRoutes'));

export { ${caseConverter.toPascal(pageName)}PageRoutes };
export { default as ${caseConverter.toPascal(pageName)}PageNavigation } from 'modules/${categoryName}/${caseConverter.toCamel(pageName)}/navigation/${caseConverter.toPascal(pageName)}PageNavigation';`;
};

const generateMainPage = (pageName, pagePath, pageTitle) => {
  return `import Page from 'common/components/Page';
import messages from 'modules/${pagePath}/messages/tr.json';
import React from 'react';

const ${pageName}Page: React.FC<{}> = (): JSX.Element => {
  return (
    <Page messages={messages} titleId="${pageTitle}">
      <p>Hello World</p>
    </Page>
  );
};

export default ${pageName}Page;`;
};

const generateMessages = (pageName, categoryName) => {
  return `{
  "${categoryName}.${caseConverter.toCamel(pageName)}.page.title": "${caseConverter.toTitle(pageName)} Sayfası"
}`;
};

function generateNavigation(pageName, categoryName, pageTitle) {
  return `import { Icon } from 'antd';
import { SubMenuProps } from 'antd/lib/menu/SubMenu';
import StyledMenuItem from 'common/components/Menu/components/MenuItem';
import ${caseConverter.toCamel(pageName)}PageAuthorization from 'modules/${categoryName}/${caseConverter.toCamel(pageName)}/authorization/${caseConverter.toPascal(pageName)}PageAuthorization';
import messages from 'modules/${categoryName}/${caseConverter.toCamel(pageName)}/messages/tr.json';
import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { Link } from 'react-router-dom';

type ${caseConverter.toPascal(pageName)}PageNavigationProps = SubMenuProps & { basePath: string };

const ${caseConverter.toPascal(pageName)}PageNavigation = ({
  basePath
}: ${caseConverter.toPascal(pageName)}PageNavigationProps): JSX.Element | null => {
  const { canAccess } = ${caseConverter.toCamel(pageName)}PageAuthorization;
  return canAccess ? (
    <StyledMenuItem key="${caseConverter.toCamel(pageName)}">
      <IntlProvider locale="tr" messages={messages}>
        <Link to={\`\${basePath}/${caseConverter.toKebab(pageName)}\`}>
          <Icon type="message" />
          <FormattedMessage id="${pageTitle}" />
        </Link>
      </IntlProvider>
    </StyledMenuItem>
  ) : null;
};

export default ${caseConverter.toPascal(pageName)}PageNavigation;
`;
}

function generateRoutes(pageName, categoryName) {
  return `import PrivateRoute from 'core/authentication/components/PrivateRoute';
import useRouter from 'core/authentication/hooks/useRouter';
import ${caseConverter.toCamel(pageName)}PageAuthorization from 'modules/${categoryName}/${caseConverter.toCamel(pageName)}/authorization/${caseConverter.toPascal(pageName)}PageAuthorization';
import ${caseConverter.toPascal(pageName)}Page from 'modules/${categoryName}/${caseConverter.toCamel(pageName)}/pages/${caseConverter.toPascal(pageName)}Page';
import React from 'react';
import { Switch } from 'react-router-dom';

const ${caseConverter.toPascal(pageName)}PageRoutes = (): JSX.Element => {
  const { canAccess } = ${caseConverter.toCamel(pageName)}PageAuthorization;
  const { match } = useRouter();

  return (
    <Switch>
      <PrivateRoute path={\`\${match.path}\`} component={${caseConverter.toPascal(pageName)}Page} canAccess={canAccess} />
    </Switch>
  );
};

export default ${caseConverter.toPascal(pageName)}PageRoutes;
`;
}

module.exports = { generateAuthorization, generateIndex, generateMainPage, generateMessages, generateNavigation, generateRoutes };
