import { Router } from "express";

import { Todo } from '../models/TodoModel';
const router = Router();

let todos: Todo[] = [];
type RequestBody = { text: String }

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos })
});

router.post('/', (req, res, next) => {
    const body = req.body as RequestBody;

    /*
     To let TypeScript know , (and hence get auto-complete option) 
     that we have a "text" property (or any other, as per input field in Front End) in req.body,
     we can define the body as above 
    */
    const newTodo: Todo = {
        _id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ response: 'success', message: "Todos Added Successfully", todo: newTodo, todos: todos });
});

router.post('/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;
    const todoIndex = todos.findIndex(todo => todo._id === todoId);
    if (todoIndex < 0 ) {
        return res.status(404).json({ response: 'fail', message: "Todo Not Found" });
    }
    todos[todoIndex] = { _id : todos[todoIndex]._id, text: req.body.text };
    res.status(201).json({ response: 'success', message: "Todo Updated"  });
    
});

router.delete('/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;
    todos = todos.filter(todo  => todo._id !== todoId);
    res.status(201).json({ response: 'success', message: "Todo deleted", todos: todos  });
});
export default router;
