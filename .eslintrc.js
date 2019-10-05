module.exports = {
  "root": true,
  "parserOptions": {
    "sourceType": "module",
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
  },
  "extends": [
    'airbnb-base',
  ],
  "rules": {
    "no-param-reassign": [2, {"props": false}],
    'max-len': [2, {
      'code': 180
    }],
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/order': 0,
    'no-return-await': 0
  }
};
