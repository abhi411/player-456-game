const jwt = require('jsonwebtoken')
const config = require("../config/db.config");

var urls = ['player456.xyz'];

// Verify token middleware
exports.verifycreate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    urls.forEach(url => {
      try {
      const decoded = jwt.verify(token, url);
        if(decoded['method']!='create'){
          return res.status(401).send("Invalid Token");
        }
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
    });
      
    
    return next();
  };
// Verify token middleware
exports.verifyplayers = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  urls.forEach(url => {
    try {
    const decoded = jwt.verify(token, url);
      if(decoded['method']!='players'){
        return res.status(401).send("Invalid Token");
      }
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  });
  return next();
};
// Verify token middleware
exports.verifyplayer = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  urls.forEach(url => {
    try {
    const decoded = jwt.verify(token, url);
      if(decoded['method']!='player'){
        return res.status(401).send("Invalid Token");
      }
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  });
  return next();
};
// Verify token middleware
exports.verifyputplayer = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  urls.forEach(url => {
    try {
    const decoded = jwt.verify(token, url);
      if(decoded['method']!='putplayer'){
        return res.status(401).send("Invalid Token");
      }
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  });
  return next();
};
  