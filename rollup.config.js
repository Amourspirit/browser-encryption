import { nodeResolve } from '@rollup/plugin-node-resolve';

const _mod = 'scratch/js/lib';
const _noMod = 'scratch/js/lib/nomodule';
const _input = ['./src/js/lib/init.js'];
const _globals = {
  'jquery': 'jQuery',
  'crypto': 'CryptoJS',
  'bootstrap': 'bootstrap',
  'dom-purify': 'DOMPurify',
  'lozad': 'lozad',
  'marked': 'marked',
  'bowser': 'bowser'
  // 'strBreak': 'stringBreaker'
}
//const input = ['./src/js/tmp/jquery.bsresponsive.js'];
export default {
  input: _input,
  plugins: [nodeResolve({
    // use "jsnext:main" if possible
    // see https://github.com/rollup/rollup/wiki/jsnext:main
    jsnext: true
  })
  ],
  output: [
    {
      file: `${_noMod}/main.js`,
      format: 'systemjs',
      globals: _globals
    },
    {
      file: `${_mod}/main.js`,
      format: 'es',
      globals: _globals
    }
  ],
  external: ["jquery", "crypto", "dom-purify", "lozad", "marked", "bowser"]
}