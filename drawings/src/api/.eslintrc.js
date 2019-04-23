module.exports = {
  "env": {
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "windows"],
    "no-console": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "object-curly-spacing": ["error", "always"]
  }
};
