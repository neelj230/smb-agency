export function generatePostcssConfig(): string {
  return `const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
`
}
