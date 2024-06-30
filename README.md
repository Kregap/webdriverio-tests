Tests are using [WebDriverIO](https://webdriver.io/) with [Mocha](https://mochajs.org/).

# Requirements
Node.js 16.x or higher is installed.

# Running tests
All tests.
```bash
npm run wdio

# OR

npx wdio run ./wdio.conf.js
```

Tests in specific file.
```bash
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

Tests in specified in config file suite.
```bash
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

# ToDos
- [ ] Use data models for client and product, check more details, provide custom assertions and actions using objects of those models as arguments.
- [ ] Address hardcoded timeouts.
- [ ] Address seemingly random explicit `waitForDisplayed()` usages. Maybe as Selenium docs suggest initialize every Page while waiting/checking if new page is displayed.
- [ ] Evaluate usage of a Node version manager, e.g. [NVM](https://github.com/nvm-sh/nvm).
- [ ] Evaluate proposed by WebDriverIO testing frameworks (Mocha, Jasmine, Cucumber - all with or without Serenity/JS).
- [ ] Evaluate available reporters.
- [ ] Evaluate usage of [Testing Library](https://testing-library.com/).