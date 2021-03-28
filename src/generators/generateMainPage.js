const generateMainPage = (pageName, pagePath, pageTitle) => {
  return `import Page from 'common/components/Page';
import messages from 'modules/${pagePath}/messages/tr.json';
import React from 'react';

const ${pageName}: React.FC<{}> = (): JSX.Element => {
  return (
    <Page messages={messages} titleId="${pageTitle}">
      <p>Hello World</p>
    </Page>
  );
};

export default ${pageName};`;
};

module.exports = { generateMainPage };
