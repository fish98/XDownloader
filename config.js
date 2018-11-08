const config = {
  dir: '',                            // dir want to specialize 
  url: [],                                // url need to change 
  opt: false,                             // if check option pages
  origin: false,                           // origin mode is used for download original sized images when aviliable
  page: {                                 // when opt mode is switched open you can download the specific pages range 
    start: 1,
    end: 10
  },
  viewMode: 'huge' // default             // huge or normal
}

// Please do not mind the logs below
console.log(`***************************************************************`)
console.log(`The Download Dir : ${config.dir}`)
// console.log(`The Download Url : ${config.url}`)
console.log(`Your ViewMode Status : ${config.viewMode}\n`)
console.log(`The Origin Size Mode Status : ${config.origin}`)

if(config.opt){
  console.log(`\nThe optional page start from page : ${config.page.start}`)
  console.log(`The optional page end in page : ${config.page.end}`)
  console.log(`\nSet opt as false to cancel optional page download :)\n`)
}
else{
  console.log(`\nDefault downloading whole pages :)`)
  console.log(`Set opt as true and configue optional page config\n`)
}
console.log(`***************************************************************`)

module.exports = {
  config
} 