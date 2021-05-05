const open = require('open')
const read = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
read.question('Input alg: ', alg=>{
    let url = "http://cube.rider.biz/visualcube.php?&view=plan&fmt=png&bg=t&size=1024&stage=oll&case="+encodeURIComponent(alg.replace(/( |\(|\))/g, ''))
    open(url)
    console.log(url)
})