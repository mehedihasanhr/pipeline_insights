import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcssPrettify from 'postcss-prettify';

export default {
  plugins: [
    postcssImport(),
    postcssPresetEnv(),
    postcssNested(),
    autoprefixer(),
    postcssPrettify()
  ]
}