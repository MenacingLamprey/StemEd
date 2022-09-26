import { Request, Response } from "express";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');
import { IUser } from "../types";
const SECRET_KEY = process.env.SECRET_KEY || 'A key, which is secret';;

export interface RequestWithUser extends Request {
  user: IUser
 }

const create = async (req :Request, res :Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req :Request, res :Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const profile = async (req :RequestWithUser, res :Response) => {
  try {
    const { _id, username } = req.user;
    const user = { _id, username }; //is this enough?
    res.status(200).send(user);
  } catch (error){
    res.status(404).send({ error, message: 'Resource not found' });
  }
};

const logout = (req : Request, res :Response) => {
  // REMOVE-START
  // delete the token client side upon logout.
  // you would invalidate the token here.
  // REMOVE-END
};

module.exports = { create, login, profile, logout };