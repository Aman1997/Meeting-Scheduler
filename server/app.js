const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./model/user')
const { Meetings } = require('./model/meetingSchedule')
const user = require('./model/user')

const { auth } = require('./middleware/auth')

mongoose.connect(config.mongoURI, {useNewUrlParser:true})
        .then(() =>{
          console.log('DB connected')
        })
        .catch(err => console.error(err))

app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/api/user/register', (req, res) =>{
  const user = new User(req.body)
  user.save((err, userData) =>{
    if (err) return res.json({ success: false, err}) 
    res.status(200).json({ success: true, email: userData.email, name: userData.name})
  })
})

app.get('/api/user/auth', auth, (req, res) =>{
  res.status(200).json({
    _id: req._id,
    isAuth: true
  })
})

app.post('/api/user/login', (req, res) =>{
  //find the email
  User.findOne({ email: req.body.email}, (err, user) =>{
    if (!user){
      return res.json(
            { loginSuccess: false,
              message: "Email not found" 
            }
          )
    }
    // compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch){ 
        return res.json({ loginSuccess: false, message: "Wrong Password"})
      }
      //generate token
      user.generateToken((err, user) =>{
        if (err) return res.status(400).send(err)
        res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, email: user.email, name: user.name})
      })  
    })
  })
})

app.get('/api/user/logout', auth, (req,res) =>{
  User.findOneAndUpdate({_id: req.user._id}, {token : ""}, (err) =>{
    if(err) return res.json(
        { logoutSuccess: False, err }
      )
    return res.status(200).send({ logoutSuccess: true})  
  }
)
})

app.post('/api/user/bookMeeting', auth, (req, res) =>{
  const meetings = new Meetings(req.body)
  meetings.save((err, meetingsData) =>{
    if(err) { return res.json({success: false, err})}
    res.status(200).json({ success: true, meetingsData: meetingsData})
  })
})

app.get('/api/user/getAllMeetings', auth, (req,res) =>{
  Meetings.find({email : req.user.email}, (err,doc) =>{
    if(doc.length == 0) { return res.json(
            { success: false, err }
          )}
    return res.status(200).send({ Success: true, meetingsData: doc})       
  })
})

const port = process.env.PORT || 5000

app.listen(port)