module.exports = {
  presets: [
    "@babel/preset-env", // For transforming modern JavaScript
    "@babel/preset-react", // For transforming React JSX code
  ],
  plugins: [
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-private-property-in-object",
  ],
};
