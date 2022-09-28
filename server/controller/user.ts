import { Request, Response } from "express";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

import { User }  from './../models/User';
import { IUser } from "../types";
const SECRET_KEY = process.env.SECRET_KEY || 'A key, which is secret';;

interface RequestWithUser extends Request {
  user?: IUser
}

export const create = async (req :Request, res :Response) => {
  const { username, password ,completedLessons } = req.body;
  const user = await User.findOne({ username });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username, password : hash, completedLessons
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

export const login = async (req :Request, res :Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if(user) {
      const validatedPass = await bcrypt.compare(password, user.password);
      if (!validatedPass) throw new Error();
      const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
      res.status(200).send({ accessToken });
    } else res.status(400).send({message : 'No such User'})
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

export const profile = async (req :RequestWithUser, res :Response) => {
  try {
    if (req.user){
      const { _id, username, completedLessons } = req.user;
      const user = { _id, username, completedLessons };
      res.status(200).send(user);
    }
  } catch (error){
    res.status(404).send({ error, message: 'Resource not found' });
  }
};

export const addToLessons = async (req :Request, res:Response) => {
  try {
    const { id, lesson } = req.body
    const query = {_id: id};
    const update = { $addToSet: {completedLessons: lesson}}
    const options = {upsert: true};
    const result = await User.findOneAndUpdate(query, update, options)
    res.status(200).send(result)
  } catch(e) {
    return res.status(500).send({message : 'Internal Server Error'})   
  }
}