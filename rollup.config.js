import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
//import babel from 'rollup-plugin-babel';


export default {
  input: 'src/main.ts',
  output: {
  	name: 'app',
    file: 'dist/bundle.js',
    format: 'umd',
  },
  plugins: [
    resolve(),
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
    }),
    /*babel({
      exclude: 'node_modules/**'
    })*/
  ]
};