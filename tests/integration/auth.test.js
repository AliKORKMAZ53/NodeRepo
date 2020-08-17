const request=require('supertest');
const {User}=require('../../models/user');
const {Genre} = require('../../models/genre');

describe('auth middleware', ()=>{
	
	beforeEach(()=>{server=require('../../vidly');});
    afterEach(async()=>{
		await Genre.remove({});
        await server.close();   
    });
	let token;
	
	beforeEach(()=>{
		token= new User().generateAuthToken();
	});
	
	const exec=()=>{
	return request(server)
	.post('/genres')
	.set('x-auth-token',token)
	.send({name:'genre1'});
	}
	
	
	it('should return 401 if no token provided',async()=>{
	token='';
	
	const res= await exec();
	
	expect(res.status).toBe(401);
	});
	
	it('should return 400 if invalid token provided', async ()=>{
        token = '121212';
		
        const res = await exec();
		
        expect(res.status).toBe(400);
    });
	
	it('should return 200 if token is valid', async ()=>{
        const res = await exec();
        expect(res.status).toBe(200);
        
    });
	
	
});
	
