const express = require("express");
const router = express.Router();

const toDoControllers = require("../controller/to-doControllers");

router.get("/", toDoControllers.getLandingPage);

router.get("/lists", toDoControllers.getLists);

router.post("/lists", toDoControllers.postLists);

router.delete("/lists/delete/:id", toDoControllers.deleteLists);

router.put("/lists/edit/:id", toDoControllers.editLists);

router.put("/lists/completed/:id", toDoControllers.editTodoCompletion);
// router.put("/lists/:id", toDoControllers.editLists);

module.exports = router;
