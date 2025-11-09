import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking users in database...\n');

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      password: true,
    },
  });

  console.log(`Found ${users.length} users:\n`);

  for (const user of users) {
    console.log(`Email: ${user.email}`);
    console.log(`Name: ${user.firstName} ${user.lastName}`);
    console.log(`Role: ${user.role}`);
    console.log(`Password Hash: ${user.password.substring(0, 20)}...`);
    
    // Test password
    const isValid = await bcrypt.compare('Admin123!', user.password);
    console.log(`Password "Admin123!" valid: ${isValid ? '✅ YES' : '❌ NO'}`);
    
    const isValidUser = await bcrypt.compare('User123!', user.password);
    console.log(`Password "User123!" valid: ${isValidUser ? '✅ YES' : '❌ NO'}`);
    console.log('---\n');
  }

  // Try to login
  console.log('\n🔐 Testing login for admin@grmrobotics.com...');
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@grmrobotics.com' },
  });

  if (admin) {
    const passwordMatch = await bcrypt.compare('Admin123!', admin.password);
    console.log(`Password match: ${passwordMatch ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (!passwordMatch) {
      console.log('\n⚠️  Password does not match! Fixing...');
      const newHash = await bcrypt.hash('Admin123!', 10);
      await prisma.user.update({
        where: { id: admin.id },
        data: { password: newHash },
      });
      console.log('✅ Password updated! Try logging in again.');
    }
  } else {
    console.log('❌ Admin user not found!');
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
