import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      .send({ error: '409', res: 'User already exists' });
  try {
    if (password === '') return res.status(400).send({ error : true, res: 'Password has no length' });
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username, password : hash, completedLessons
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(500).send({ error : true, res: 'Could not create user' });
  }
};

export const login = async (req :Request, res :Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if(user) {
      const validatedPass = await bcrypt.compare(password, user.password);
      if (!validatedPass) {
        return res
          .status(401)
          .send({ error: true, res: 'Password is incorrect' });
      }
      const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
      return res.status(200).send({ accessToken });
    }
    res.status(400).send({error : true, res : 'No such User'})
  } catch (error) {
    res
      .status(500)
      .send({ error: true, res: 'Error logging user in' });
  }
};

export const profile = async (req :RequestWithUser, res :Response) => {
  try {
    if (req.user){
      const { _id, username, completedLessons } = req.user;
      const user = { _id, username, completedLessons };
      return res.status(200).send(user);
    }
    res.status(404).send({ error : true, res: 'Resource not found' });
  } catch (error){
    return res.status(500).send({error : true, res: 'Error getting profile'})
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
    return res.status(500).send({error: true, message : 'Error adding to lesson'})   
  }
}