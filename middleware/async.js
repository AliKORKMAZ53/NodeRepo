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
//express-async-errors dolay�s�yla try catch bloklar�n� yukar�daki yolla
//halletmeye gerek kalmam��t�r. bu dosya kullan�lm�yor.