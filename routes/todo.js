import { Router } from "express";
import {
  getTodos,
  postTodo,
  deleteTodo,
  updateTodo,
} from "../controller/todo.js";

const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", postTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.put("/:id", updateTodo);

export { todoRouter };
