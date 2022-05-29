const { electron } = require("webpack");

function gbk2Unicode(content) {
  if(content){
    return content.replace(/([\u0080-\uffff])/g, (str) => {
      let hex = str.charCodeAt(0).toString(16);
      for (let i = hex.length; i < 4; i++) { 
        hex = '0' + hex;
      }
      return '\\u' + hex;
    })
  }else{
    return content
  }
  
}
class UnicodeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('UnicodeWebpackPlugin', (compilation, callback) =>{
      console.log(`\n****unicode-webpack-plugin****`);
      compilation.chunks.map(chunk => {
        chunk.files.map(filename => {
         // console.log('正在编译资源：', compilation.assets[filename]._cachedSource  );
          compilation.assets[filename]._cachedSource =  gbk2Unicode(compilation.assets[filename]._cachedSource);
          // if(compilation.assets[filename]._source._children){
          //   compilation.assets[filename]._source._children.map(item=>{
          //     item._value = gbk2Unicode( item._value);
          //   })
          // }
        })
      })
      console.log(`\n****unicode-webpack-plugin end****\n`);
      callback();
    })
  }
}
module.exports = UnicodeWebpackPlugin;