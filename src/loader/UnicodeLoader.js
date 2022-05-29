const loaderUtils = require('loader-utils')
let count = 0
module.exports = function(source,map) {
    
    const options = loaderUtils.getOptions(this)
    // if(++count == 10){
    //     console.log(source)
    // }
    console.log(source);
    const  output = source.replace(/webpackChunkguhj_app/g, options.name) 
    return  source
    
  }