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
//express-async-errors dolayısıyla try catch bloklarını yukarıdaki yolla
//halletmeye gerek kalmamıştır. bu dosya kullanılmıyor.