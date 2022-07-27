import { Todo } from '../models/TodoModel';
import { Request, Response,NextFunction } from 'express';

let todos: Todo[] = [];
type RequestBody = { text: String }


export const getTodos = (req: Request, res: Response , next: NextFunction) => {
    res.status(200).json( { todos: todos } );
};


export const addEditTodo =  (req: Request, res: Response , next: NextFunction) => {
    const body = req.body as RequestBody;
    const todoId = req.params.todoId;
    
    /*
     To let TypeScript know , (and hence get auto-complete option) 
     that we have a "text" property (or any other, as per input field in Front End) in req.body,
     we can define the body as above 
    */

     if (todoId == '' || todoId == undefined) {
        const newTodo: Todo = {
            _id: new Date().toISOString(),
            text: body.text
        };
        todos.push(newTodo);
        res.status(201).json({ response: 'success', message: "Todos Added Successfully", todo: newTodo, todos: todos });
     } else {
        const todoIndex = todos.findIndex(todo => todo._id === todoId);
        if (todoIndex < 0 ) {
            return res.status(404).json({ response: 'fail', message: "Todo Not Found" });
        }
        todos[todoIndex] = { _id : todos[todoIndex]._id, text: req.body.text };
        res.status(201).json({ response: 'success', message: "Todo Updated"  });
     }
    
};


export const getTodoById =  (req: Request, res: Response , next: NextFunction) => {
    const todoId = req.params.todoId;
    const todoIndex = todos.findIndex(todo => todo._id === todoId);
    if (todoIndex < 0 ) {
        return res.status(404).json({ response: 'fail', message: "Todo Not Found" });
    }
    res.status(201).json({ response: 'success', message: "Todo Found", todo: todos[todoIndex]  });
};


export const deleteTodo = (req: Request, res: Response , next: NextFunction) => {
    const todoId = req.params.todoId;
    todos = todos.filter(todo  => todo._id !== todoId);
    res.status(201).json({ response: 'success', message: "Todo deleted", todos: todos  });
};

