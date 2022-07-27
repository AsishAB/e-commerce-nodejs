import { Router } from "express";

import { Todo } from '../models/TodoModel';
const router = Router();

let todos: Todo[] = [];

import { getTodos, addEditTodo, getTodoById, deleteTodo }  from '../controllers/TodoController';


router.get('/', getTodos);

router.post('/', addEditTodo);

router.get('/:todoId', getTodoById);

router.delete('/:todoId', deleteTodo);


export default router;
