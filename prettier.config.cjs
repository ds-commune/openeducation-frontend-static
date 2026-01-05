module.exports = {
  semi: true,
  singleQuote: false,
  printWidth: 80,
  trailingComma: 'es5',

  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'typescript'
      }
    }
  ],

  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/routes/layout.css"
}
