const express = require("express");
const router = express.Router();
const User = require("../models/user");
const uuid = require("uuid");

const users = User.find();

class Session {
  constructor(email, expiresAt) {
    this.email = email;
    this.expiresAt = expiresAt;
  }

  isExpired() {
    this.expiresAt < new Date();
  }
}
const sessions = {};

const createSession = (req, res, next) => {
  console.log(req.body);

  const { email, password, isNew } = req.body;
  if (!email) {
    res.status(401).send();
    return;
  }

  let expectedPassword;
  if (!isNew) {
    // validate
    expectedPassword = users[email];
    if (!expectedPassword || expectedPassword !== password) {
      res.status(401).send("Incorrect password");
      return;
    }
  }

  if (!res.sessionToken) {
    // generate uuid as session token
    const sessionToken = uuid.v4();

    // sets expiration time
    const now = new Date();
    const expiresAt = new Date(+now + 120 * 1000);

    // create session
    const session = new Session(email, expiresAt);
    sessions[sessionToken] = session;

    // in res, set cookie and expiration
    res.cookie("session_token", sessionToken, { expires: expiresAt });
  }
  next();
};

const authenticate = (req, res, next) => {
  // if req has no cookies, no auth - send error
  if (!req.cookies) {
    res.status(401).send();
    return;
  }

  // get the session token from request cookies
  const sessionToken = req.cookies["session-token"];
  if (!sessionToken) {
    res.status(401).send();
    return;
  }

  // get the session of user from session object
  userSession = sessions[sessionToken];
  if (!userSession) {
    res.status(401).send();
    return;
  }

  // if session is expired, refresh tokens
  if (userSession.isExpired()) {
    const newSessionToken = uuid.v4();

    // sets expiration time
    const now = new Date();
    const expiresAt = new Date(+now + 120 * 1000);

    // create session
    const session = new Session(userSession.email, expiresAt);

    // add new session to obj and delete old one
    sessions[newSessionToken] = session;
    delete sessions[sessionToken];
    res.cookie("session_token", newSessionToken, { expires: expiresAt });
  }

  next();
};

const logoutHandler = (req, res, next) => {
  if (!req.cookies) {
    res.status(401).send();
    return;
  }

  const sessionToken = req.cookies["session-token"];
  if (!sessionToken) {
    res.status(401).send();
    return;
  }

  delete sessions[sessionToken];
  res.cookie("session-token", "", { expires: new Date() });
  next();
};

module.exports = {
  createSession,
  authenticate,
  logoutHandler,
};
