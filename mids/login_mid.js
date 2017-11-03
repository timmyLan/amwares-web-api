module.exports = ()=>{
  return async (ctx,next)=>{
    let user = ctx.session.user;
    if(ctx.url === '/user/login'){
      await next();
    }else{
      if(!user){
        ctx.body = {
          status:400,
          data:'请先登录!'
        }
      }else{
        await next();
      }
    }
  }
}