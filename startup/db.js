const winston = require('winston');
const { MongoClient } = require("mongodb");


module.exports= function(){
	 const uri= "mongodb+srv://vidlyuser:conqueror53@cluster0.jjv7i.azure.mongodb.net/vidlydb?retryWrites=true&w=majority";
	const client = new MongoClient(uri);
	
	async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
	
	/*mongoose.connect('mongodb+srv://vidlyuser:conqueror53@cluster0.jjv7i.azure.mongodb.net/vidlydb?retryWrites=true&w=majority&authSource=admin',
	{useNewUrlParser: true})
	.then(()=>{ winston.info('connected to server');
	console.log('connected to server');});*/
	
}