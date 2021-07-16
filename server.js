const express = require('express')
const cors = require('cors');
const fs = require('fs');
const app = express()
app.use(cors());
app.options('*', cors());

app.listen(8070,()=>console.log('listening at port 8070'));

app.use(express.json({limit:'1mb'}));

app.post('/api1',(req,res)=>{
    console.log('postreq');
    console.log(req.body);
    let buff = Buffer.from(req.body.file.split(',')[1], 'base64');
    fs.writeFileSync('./public/'+req.body.filename, buff);
    res.send();
});
app.get('/api1',(req,res)=>{
    console.log('getreq ');
    res.send(getFiles('./public'));
});
app.get('/download', function(req, res){
  console.log(req.query);
  const filename = req.query.filename;
  res.download('./public/'+filename); 
});

function getFiles (dir, files_){
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
      var name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()){
      } else {
          files_.push(files[i]);
      }
  }
  return files_;
}