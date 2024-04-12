import model from "./model.js";
let modelVariable;
export const createUser = (user) => {
    delete user._id
    return model.create(user);
  }  
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) => {
  console.log(username, password); 
  modelVariable = model.findOne({ username, password });
  if (modelVariable != "") {
    console.log(modelVariable);
  }
  console.log(username, password + "modelOne"); }
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });

