const List = require("../models/db");

exports.getLandingPage = (req, res, next) => {
  res.json({ hello: "world" });
};

exports.getLists = async (req, res) => {
  const todos = await List.find();
  res.json(todos);
};

exports.postLists = async (req, res) => {
  try {
    const newTodo = new List({
      list_title: req.body.list_title,
      list_content: req.body.list_content,
      //user: req.user.id,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLists = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTodo = await List.findOneAndDelete({ _id: id });

    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: `Todo '${deleteTodo.list_title}' deleted!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.editLists = async (req, res) => {
  const { id } = req.params;
  const { list_title, list_content } = req.body;

  try {
    const editTodo = await List.findOneAndUpdate(
      { _id: id },
      { list_title, list_content }
    );

    if (!editTodo) {
      return res.status(404).json({ message: "Todo Edit Failed !" });
    }

    res
      .status(200)
      .json({ message: `Todo '${editTodo.list_title}' Todo Updated!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
