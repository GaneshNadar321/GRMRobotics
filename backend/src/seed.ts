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

  // Create admin users with new credentials
  const adminPassword1 = await bcrypt.hash('GRMRobotics@123', 10);
  const adminPassword2 = await bcrypt.hash('GRMRobotics@123', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'infogrmrobotics@gmail.com',
        password: adminPassword1,
        firstName: 'GRM',
        lastName: 'Admin',
        role: 'ADMIN',
        isEmailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'grmrobotic@gmail.com',
        password: adminPassword2,
        firstName: 'GRM',
        lastName: 'Manager',
        role: 'ADMIN',
        isEmailVerified: true,
      },
    }),
  ]);

  // Create carts for admin users
  await Promise.all([
    prisma.cart.create({ data: { userId: users[0].id } }),
    prisma.cart.create({ data: { userId: users[1].id } }),
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
