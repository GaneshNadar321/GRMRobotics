import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  console.log('⚠️  This will create ONLY essential data (categories, admin users, coupons)');
  console.log('📦 Products should be added via Admin Dashboard');

  // Create categories
  await Promise.all([
    prisma.category.create({
      data: {
        name: 'Ground Robots',
        slug: 'ground-robots',
        description: 'Land-based robots including wheeled and tracked vehicles',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Aerial Robots',
        slug: 'aerial-robots',
        description: 'Flying robots and drones for aerial applications',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'UAV (Drones)',
        slug: 'uav-drones',
        description: 'Unmanned Aerial Vehicles and drone kits',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Beginner Kits',
        slug: 'beginner-kits',
        description: 'Perfect for students just starting their robotics journey',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Intermediate Kits',
        slug: 'intermediate-kits',
        description: 'For students ready to take on more complex challenges',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Advanced Kits',
        slug: 'advanced-kits',
        description: 'Professional-grade robotics kits for advanced learners',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sensors & Components',
        slug: 'sensors-components',
        description: 'Individual sensors and electronic components',
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Batteries, cables, and other accessories',
        isActive: true,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create users
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const userPassword = await bcrypt.hash('User123!', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@grmrobotics.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isEmailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'manager@grmrobotics.com',
        password: hashedPassword,
        firstName: 'Manager',
        lastName: 'User',
        role: 'ADMIN',
        isEmailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        password: userPassword,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+919876543210',
        role: 'USER',
        isEmailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        password: userPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+919876543211',
        role: 'USER',
        isEmailVerified: true,
      },
    }),
  ]);

  // Create carts for regular users
  await Promise.all([
    prisma.cart.create({ data: { userId: users[2].id } }),
    prisma.cart.create({ data: { userId: users[3].id } }),
  ]);

  console.log('✅ Users and carts created');
  console.log('📦 No demo products created - Add products via Admin Dashboard');

  // Create coupons
  await Promise.all([
    prisma.coupon.create({
      data: {
        code: 'WELCOME10',
        description: '10% off for new customers',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderValue: 1000,
        maxDiscount: 500,
        usageLimit: 100,
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'FLAT500',
        description: 'Flat ₹500 off on orders above ₹5000',
        discountType: 'FIXED',
        discountValue: 500,
        minOrderValue: 5000,
        usageLimit: 50,
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log('✅ Coupons created');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
