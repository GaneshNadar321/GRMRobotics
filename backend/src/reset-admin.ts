import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function resetAdmin() {
  console.log('🔄 Resetting admin users...');

  try {
    // Delete existing admin users
    await prisma.user.deleteMany({
      where: {
        OR: [
          { email: 'infogrmrobotics@gmail.com' },
          { email: 'grmrobotic@gmail.com' },
        ]
      }
    });

    console.log('🗑️  Deleted existing admin users');

    // Create new admin users
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

    console.log('✅ Admin users created successfully!');
    console.log('📧 Admin 1: infogrmrobotics@gmail.com / GRMRobotics@123');
    console.log('📧 Admin 2: grmrobotic@gmail.com / GRMRobotics@123');

  } catch (error) {
    console.error('❌ Error resetting admin users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();