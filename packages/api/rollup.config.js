const path = require('path');

const typescript = require('rollup-plugin-typescript2');

module.exports = ['cjs', 'es'].map((format) => ({
  input: path.join(__dirname, 'src', 'index.ts'),
  output: {
    format,
    file: path.join(__dirname, 'dist', `index.${format}.js`),
  },
  plugins: [typescript()],
}));
