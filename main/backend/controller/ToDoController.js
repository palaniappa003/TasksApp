const ToDoModel = require("../models/ToDoModel");
const moment = require("moment");

module.exports.getToDos = async (req, res) => {
  const toDos = await ToDoModel.find().sort({ priority: -1 }); 
  res.send(toDos);
};

module.exports.saveToDo = (req, res) => {
  const { toDo, date, priority } = req.body; 
  const formattedDate = moment(date).format("DD MM YYYY");
  ToDoModel.create({ toDo, date: formattedDate, priority })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo, date, priority } = req.body; 
  const formattedDate = moment(date).format("DD MM YYYY");
  ToDoModel.findByIdAndUpdate(id, { toDo, date: formattedDate, priority })
    .then(() => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
