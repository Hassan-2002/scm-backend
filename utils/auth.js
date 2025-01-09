import { USER_ROLES } from "../models/constants.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const hashPassword = (password)=> {
        return bcrypt.hash(password,10);
}

const comparePass = (password,hash) => {
       return bcrypt.compare(password, hash)
}

const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

const authenticate = (req, res, next) =>{
    try{
        if(!req.headers.authorisation){
            return res.status(401).json({message : "Unauthorized", success :false});

        }
        const token = req.headers?.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        if(!decoded) return res.status(401).json({message : "Unauthorised", success: false });
        next();
    }
    catch(error){
        return res.status(401).json({message: "Unauthorised", success: false})
    }
};
const isDistributor = (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized", success: false });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token && token.role !== USER_ROLES[1]) {
        return res.status(401).json({ message: "Unauthorized", success: false });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  };
  
  const isRetailer = (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized", success: false });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token && token.role !== USER_ROLES[0]) {
        return res.status(401).json({ message: "Unauthorized", success: false });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  };
  
  export {
    comparePass,
    hashPassword,
    generateToken,
    authenticate,
    isDistributor,
    isRetailer,
  };
