const passport = require('passport')
const OAuth25trategy = require('passport-google-oauth2').Strategy
const GoogleDb = require('../../Model/googleModel')
const express = require('express')
require('dotenv').config()

 const googleClientID = process.env.GOOGLE_CLIENT_ID
 const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET



passport.use(new OAuth25trategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  async(request,accessToken, refreshToken, profile, done)=>{
  
   
      try {
        let user = await GoogleDb.findOne({googleId:profile.id})
        if(!user){
            user = new GoogleDb({
                googleId:profile.id,
                displayName:profile.displayName,
                email:profile.emails[0].value,
                image:profile.photos[0].value
            })
         

            await user.save()
        }
        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
  }
))
 passport.serializeUser((user, done)=>{
    done(null,user)
 })

 passport.deserializeUser((user,done)=>{
    done(null,user)
 })

   

