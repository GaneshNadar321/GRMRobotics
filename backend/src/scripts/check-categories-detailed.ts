import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCategoriesDetailed() {
  console.log('🔍 Checking database state...\n');

  // Check categories
  const categories = await prisma.category.findMany();
  console.log('📁 CATEGORIES IN DATABASE:', categories.length);
  categories.forEach((cat) => {
    console.log(`  - ${cat.name} (${cat.slug}) [ID: ${cat.id}]`);
  });

  // Check products
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  
  console.log('\n📦 PRODUCTS IN DATABASE:', products.length);
  products.forEach((prod) => {
    console.log(`\n  Product: ${prod.name}`);
    console.log(`    ID: ${prod.id}`);
    console.log(`    Difficulty: ${prod.difficulty}`);
    console.log(`    Category ID: ${prod.categoryId}`);
    console.log(`    Category: ${prod.category.name} (${prod.category.slug})`);
    console.log(`    Active: ${prod.isActive}`);
  });

  await prisma.$disconnect();
}

checkCategoriesDetailed().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
