# common-components [![Testing CI](https://github.com/ValidereInc/common-components/actions/workflows/test.yml/badge.svg)](https://github.com/ValidereInc/common-components/actions/workflows/test.yml)
A shared repo for all the Validere frontend components.

### Getting started

```
npm install
npm run storybook
```

### Configration

When developing locally with common-component you need to have two separate build one for production and one for development. The development build will be use for developing your project locally. More detail can be found here ([https://github.com/facebook/react/issues/9999](url)). Also you will need to config your webpack to use the development build of the common-component with alias.

#### Config project location

There are few ways you can add common-component. You can add your common project under the same path as your project like below. 

```
Validere
   |--your-project
   |--common-components
```

Or you could add a custom path and add to your global environment variable and import them with script. 

**~/.zprofile**
```
RELATIVE_COMMON_COMPONENT_PATH = "../../../common-components/development"
```

**package.json**
```
"scripts": {
  "start": "COMMON_COMPONENT_PATH=${COMMON_COMPONENT_PATH} ...",
  ...
}

```

#### Create local-build file

```
npm run build-dev
```

You should see your build file under the path `/development`

#### Webpack config

Once you have your development build file you need to tell webpack to use the development build instead of the production build from `npm_modules`. 

Add a path to your development build file to your **webpack.config.js**.

```
const RELATIVE_COMMON_COMPONENT_PATH =
  process.env.COMMON_COMPONENT_PATH || "../../../common-components/development";

resolve: {
    ...,
    alias: {
      "common-components": [
        path.resolve(path.join(__dirname, RELATIVE_COMMON_COMPONENT_PATH)),
        path.resolve(path.join(__dirname, "node_modules/common-components")),
      ],
      react: path.resolve("./node_modules/react"),
    },
  },
```

Note: You will need to add react alias as well due to you could have two different version of react running in the same app so you will need to tell webpack which one to use. 

