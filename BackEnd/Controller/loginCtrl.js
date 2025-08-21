const express = require('express');
const bcrypt = require('bcrypt');
const Login = require('../Model/loginModel');
const generateToken = require('../jwt');

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await Login.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user._id)
    return res.status(200).json({message:"Login Successfull", token })
  } catch (err) {
    console.error(err) // Logs error for debugging
    return res.status(500).json({ message: 'Internal server error' })
  }
}


const createUser = async(req, res)=>{
  const { name, email, password } = req.body
  try{
    const user = await Login.findOne({email});
    if(user){
      return res.status(400).json({message: 'User already exists'});
    }else{
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Login({
        name,
        email,
        password: passwordHash,
      })
      await newUser.save();
      return res.status(201).json({message: 'User created successfully'});
    }
  }catch(err){
    return res.status(500).json({message: 'Internal server error',error: err.message});
  }
}
module.exports = {login, createUser};