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
                facebookId:profile.id,
                displayName:profile.displayName,
                email:profile.emails[0].value,
                image:profile.photos[0].value,
                token:profile.accessToken
            })
            await user.save()
         }
         return done(null, user)
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

   