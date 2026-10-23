import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    // Inline `@import` first so Tailwind sees a single stylesheet and the
    // `@layer` blocks in typography.css / animations.css resolve correctly.
    postcssImport(),
    tailwindcss(),
    autoprefixer(),
  ],
};
