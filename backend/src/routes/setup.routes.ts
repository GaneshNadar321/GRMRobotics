import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = Router();
const prisma = new PrismaClient();

// Setup admin users - ONLY for initial setup
router.post('/setup-admin', async (req, res) => {
  try {
    const { setupKey } = req.body;
    
    // Simple security check - you can change this key
    if (setupKey !== 'GRMSetup2024!') {
      return res.status(401).json({ error: 'Invalid setup key' });
    }

    // Check if admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { email: 'infogrmrobotics@gmail.com' },
          { email: 'grmrobotic@gmail.com' }
        ]
      }
    });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin users already exist' });
    }

    // Create admin users
    const adminPassword1 = await bcrypt.hash('GRMRobotics@123', 10);
    const adminPassword2 = await bcrypt.hash('GRMRobotics@123', 10);

    const admin1 = await prisma.user.create({
      data: {
        email: 'infogrmrobotics@gmail.com',
        password: adminPassword1,
        firstName: 'GRM',
        lastName: 'Admin',
        role: 'ADMIN',
        isEmailVerified: true,
      },
    });

    const admin2 = await prisma.user.create({
      data: {
        email: 'grmrobotic@gmail.com',
        password: adminPassword2,
        firstName: 'GRM',
        lastName: 'Manager',
        role: 'ADMIN',
        isEmailVerified: true,
      },
    });

    // Create carts for admin users
    await prisma.cart.create({ data: { userId: admin1.id } });
    await prisma.cart.create({ data: { userId: admin2.id } });

    res.json({ 
      message: 'Admin users created successfully',
      admins: [
        { email: 'infogrmrobotics@gmail.com', password: 'GRMRobotics@123' },
        { email: 'grmrobotic@gmail.com', password: 'GRMRobotics@123' }
      ]
    });

  } catch (error) {
    console.error('Setup admin error:', error);
    res.status(500).json({ error: 'Failed to setup admin users' });
  }
});

// Reset admin passwords - for password recovery
router.post('/reset-admin', async (req, res) => {
  try {
    const { setupKey } = req.body;
    
    if (setupKey !== 'GRMSetup2024!') {
      return res.status(401).json({ error: 'Invalid setup key' });
    }

    // Reset passwords for existing admin users
    const adminPassword = await bcrypt.hash('GRMRobotics@123', 10);

    await prisma.user.updateMany({
      where: {
        OR: [
          { email: 'infogrmrobotics@gmail.com' },
          { email: 'grmrobotic@gmail.com' }
        ]
      },
      data: {
        password: adminPassword
      }
    });

    res.json({ 
      message: 'Admin passwords reset successfully',
      credentials: [
        { email: 'infogrmrobotics@gmail.com', password: 'GRMRobotics@123' },
        { email: 'grmrobotic@gmail.com', password: 'GRMRobotics@123' }
      ]
    });

  } catch (error) {
    console.error('Reset admin error:', error);
    res.status(500).json({ error: 'Failed to reset admin passwords' });
  }
});

export default router;