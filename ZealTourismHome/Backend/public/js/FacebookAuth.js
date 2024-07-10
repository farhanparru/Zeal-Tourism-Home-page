const passport = require('passport')
const FaceBookstrategy = require('passport-facebook').Strategy
const facebookDb = require('../../Model/facebookModel')
require('dotenv').config()




// make our facebook strategy

passport.use(new FaceBookstrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields:['id','displayName','name','gender','picture.type(large)','email']
  },
   async(accessToken, refreshToken, profile, done)=>{
            
       try {
         let user =  await facebookDb.findOne({facebookId:profile.id})   
       
         if(!user){
            user = new facebookDb({
             
                displayName:profile.displayName,
                email:profile.emails[0].value,
                facebookId:profile.id,
                image:profile.photos[0].value,
                accessToken: accessToken // Store the access token here
            })
            user.accessToken = accessToken;
            console.log( user.accessToken,"kkk");
            await user.save()
         }
         return done(null, { ...user.toObject(), accessToken }); 
       } catch (error) {       
        return done(error, null)
       }
  }
));

passport.serializeUser((user, done)=>{
    done(null,user)
 })

 passport.deserializeUser((user,done)=>{
    return done(null,user)
 })

   