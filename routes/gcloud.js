const express= require('express');
const router=express.Router();
const {Storage} = require('@google-cloud/storage');
const gcloudauth= require('../middleware/gcloudauth');
const fs=require('fs');
const os = require('os');
const path = require('path');
var Busboy=require('busboy');

const storage = new Storage(
	{projectId: "mytrial-290919",
    keyFilename: "./mytrial-64015bb22848.json"}
	);

router.post('/upload', async(req,res)=>{
	
const bucket = storage.bucket('buketdeneme');

await bucket.upload('./public/cardinals.png', { public: true })
.then(file=>{
	console.log('file saved');
});
res.send("uploaded");
});



router.post('/download', async(req,res)=>{
	const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: './public/cardinals2.png'
  };
  
  await storage.bucket('buketdeneme').file('cardinals.png').download(options);
  
 res.send("downloaded");
});

router.get('/list', async(req,res)=>{
	const [files] = await storage.bucket('buketdeneme').getFiles();
	var filenames=' ';
	files.forEach(file => {
		filenames=file.name+' - '+ filenames;
	});
	res.send(filenames);
});

router.post('/uploadvideo', async(req,res)=>{
	
const bucket = storage.bucket('buketdeneme');

await bucket.upload('./public/Bayraktar TB2 Operation Olive Branch.mp4', { public: true })
.then(file=>{
	console.log('file saved');
});

res.send("uploaded");
});


router.post('/uploadwithmultipart', async(req,res)=>{
	
	var busboy = new Busboy({ headers: req.headers });
	const bucket = storage.bucket('buketdeneme');
	let mimtype;
	var saveTo=[];
	
	
    busboy.on('file', async function(name, file, filename, encoding, mimetype) {
    var number=1;//parseInt(filename);
	 
	 var i;
	  for(i=0; i<number;i++){
		  console.log('File [' + name + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype+', number: '+number+'-'+i);
		  const imageExtension = filename.split('.')[filename.split('.').length - 1];
		 
		  var randomname=(Math.floor((Math.random() * 100) + 1)).toString()+'.'+imageExtension;
		  saveTo[i] = path.join(os.tmpdir(), randomname);
		  file.pipe(fs.createWriteStream(saveTo[i]));
	      mimtype=mimetype;
	  
	  await bucket.upload(saveTo[i], {
        resumable: false,
		gzip: true,
        metadata:{
			metadata:{
                contentType:mimtype
			}
			}
    })
    .then( () => {
       console.log("success");
    })
    .catch(err => {
        console.error(err);
        return res.status(400).send(JSON.stringify(err, ["message", "arguments", "type", "name"]));
    });
	  }

});
 busboy.on('finish', function() { 
	  console.log('Done parsing form!');
	  res.writeHead(200, { Connection: 'close', Location: '/uploadwithmultipart' });
      res.end("success");
    
    });
	
req.pipe(busboy);
});
	
module.exports =router; 
