module.exports= function (handler){
    return async(req,res,next)=>{
        try{
            await handler(req,res);
        }
        catch(ex){
            next(ex);
        }
    }
}
//express-async-errors dolayýsýyla try catch bloklarýný yukarýdaki yolla
//halletmeye gerek kalmamýþtýr. bu dosya kullanýlmýyor.