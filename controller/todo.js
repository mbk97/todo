import Todos from "../model/todo.js";
import { todoInputValidation } from "../utils/todoValidation.js";

const getTodos = async (req, res) => {
  const response = await Todos.find();
  const message = response.length == 0 ? "Todo list is empty" : "";
  res.status(200).json({
    todos: response,
    message: message,
  });
};

const postTodo = async (req, res) => {
  const { title, description, completed } = req.body;

  const { error } = todoInputValidation.validate(req.body);

  if (error) {
    res.status(400).send(error?.details[0]?.message);
    return;
  }

  try {
    const data = await Todos.create({
      title,
      description,
      completed,
    });
    if (data) {
      res.status(201).json({
        message: "A new todo added",
        data: {
          id: data._id,
          title: data.title,
          description: data.description,
          completed: data.completed,
        },
      });
    }
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

const updateTodo = async (req, res) => {
  const todoId = await Todos.findById(req.params.id);

  if (!todoId) {
    res.status(400).json({
      message: "Todo ID not found!",
    });
    return;
  }

  try {
    const data = await Todos.findByIdAndUpdate(todoId, req.body, {
      new: true,
    });

    if (data) {
      res.status(200).json({
        message: "Todo updated successfully",
        data: { data },
      });
    }
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = await Todos.findById(req.params.id);

  if (!todoId) {
    res.status(400).json({
      message: "Todo ID not found!",
    });
    return;
  }

  try {
    await Todos.findByIdAndDelete(todoId);
    res.status(200).json({
      message: "Todo item deleted",
    });
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

export { getTodos, postTodo, updateTodo, deleteTodo };
