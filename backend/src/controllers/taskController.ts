import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Task, TaskPriority } from '../models/Task';

interface AuthRequest extends Request {
  user?: { id: number };
}

const taskRepository = AppDataSource.getRepository(Task);

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await taskRepository.find({
      where: { userId: req.user!.id },
      order: { createdAt: 'DESC' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    
    if (!title?.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Parse and validate due date
    let parsedDueDate: Date | null = null;
    if (dueDate && dueDate.trim()) {
      parsedDueDate = new Date(dueDate);
      if (isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({ message: 'Invalid due date format' });
      }
    }

    // Validate priority
    let validPriority: TaskPriority | null = null;
    if (priority && priority.trim()) {
      const priorityValue = priority.toLowerCase();
      if (Object.values(TaskPriority).includes(priorityValue as TaskPriority)) {
        validPriority = priorityValue as TaskPriority;
      } else {
        return res.status(400).json({ message: 'Invalid priority. Must be high, medium, or low' });
      }
    }

    const task = taskRepository.create({
      title: title.trim(),
      description: description?.trim() || '',
      dueDate: parsedDueDate,
      priority: validPriority,
      completed: false,
      userId: req.user!.id
    });

    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await taskRepository.findOne({
      where: { id: parseInt(id), userId: req.user!.id }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Handle due date updates
    if (updates.dueDate !== undefined) {
      if (updates.dueDate === null || updates.dueDate === '') {
        updates.dueDate = null;
      } else {
        const parsedDueDate = new Date(updates.dueDate);
        if (isNaN(parsedDueDate.getTime())) {
          return res.status(400).json({ message: 'Invalid due date format' });
        }
        updates.dueDate = parsedDueDate;
      }
    }

    // Handle priority updates
    if (updates.priority !== undefined) {
      if (updates.priority === null || updates.priority === '') {
        updates.priority = null;
      } else {
        const priorityValue = updates.priority.toLowerCase();
        if (Object.values(TaskPriority).includes(priorityValue as TaskPriority)) {
          updates.priority = priorityValue as TaskPriority;
        } else {
          return res.status(400).json({ message: 'Invalid priority. Must be high, medium, or low' });
        }
      }
    }

    Object.assign(task, updates);
    await taskRepository.save(task);
    
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await taskRepository.delete({
      id: parseInt(id),
      userId: req.user!.id
    });

    if (result.affected === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};