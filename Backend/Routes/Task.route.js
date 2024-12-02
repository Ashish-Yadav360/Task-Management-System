import express from 'express'
import { getallTask,createTask,updateTask,filterstatus,deleteTask } from '../controllers/task.controller.js';
const route = express.Router();

route.get('/tasks',getallTask);
route.post('/tasks',createTask);
route.patch('/tasks/:id',updateTask);
route.delete('/tasks/:id',deleteTask);
route.get('/tasks/status/:status',filterstatus);

export default route;