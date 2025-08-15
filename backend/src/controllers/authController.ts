import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';

const userRepository = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, fullName, password } = req.body;

    // Validation
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters with one letter, one number, and one special character' 
      });
    }

    // Check if user exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = userRepository.create({
      email,
      fullName,
      password: hashedPassword
    });

    await userRepository.save(user);

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};