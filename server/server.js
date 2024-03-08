const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const port = process.env.PORT;
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const sender = process.env.SENDER;
const receiver = process.env.RECEIVER;
const authemailpass = process.env.AUTH_EMAIL_PASS;
const authemailid = process.env.AUTH_EMAIL_ID;


const PersonalInfo = require('../server/controller/PersonalInfo');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static('public'));
server.use(express.urlencoded({ extended: false }));


server.post('/api/personalinfo', PersonalInfo.createUserInfo);
server.get('/api/personalinfo', PersonalInfo.fetchUserInfo);
server.delete('/api/deleteinfo/:_id',PersonalInfo.deleteUserInfo);
server.put('/api/updateinfo/:_id', PersonalInfo.updateUserInfo);
server.get('/api/personalinfo/singluser/:_id', PersonalInfo.fetchsingleUserInfo);

server.post('/api/send-email', async (req, res) => {


  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: authemailid,
          pass: authemailpass
      }
  });

  
  const mailOptions = {
      from: sender,
      to: receiver,
      subject: 'User Data',
      text: JSON.stringify(req.body)
  };

  try {
      
      await transporter.sendMail(mailOptions);
      res.status(201).json({'message':'Email sent successfully'});
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(400).json('Failed to send email');
  }
});



main().catch(error => console.log(error));

async function main() {
  await mongoose.connect(dbConnectionString);
  console.log('Database connected');
}

server.listen(port, () => {
  console.log('Starting server at 8080');
});
