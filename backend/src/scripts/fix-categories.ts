import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixProductCategories() {
  console.log('🔧 Fixing product categories to match difficulty levels...\n');

  // Get all categories
  const categories = await prisma.category.findMany();
  const categoryMap = {
    'beginner-kits': categories.find(c => c.slug === 'beginner-kits')?.id,
    'intermediate-kits': categories.find(c => c.slug === 'intermediate-kits')?.id,
    'advanced-kits': categories.find(c => c.slug === 'advanced-kits')?.id,
  };

  // Get all products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
    },
  });

  let fixedCount = 0;

  for (const product of products) {
    const difficulty = product.difficulty;
    const currentCategorySlug = product.category.slug;

    const expectedCategorySlug = 
      difficulty === 'BEGINNER' ? 'beginner-kits' :
      difficulty === 'INTERMEDIATE' ? 'intermediate-kits' :
      'advanced-kits';

    if (currentCategorySlug !== expectedCategorySlug) {
      const newCategoryId = categoryMap[expectedCategorySlug as keyof typeof categoryMap];
      
      if (newCategoryId) {
        await prisma.product.update({
          where: { id: product.id },
          data: { categoryId: newCategoryId },
        });

        console.log(`✅ Fixed: ${product.name}`);
        console.log(`   ${currentCategorySlug} → ${expectedCategorySlug}\n`);
        fixedCount++;
      }
    }
  }

  console.log(`\n🎉 Fixed ${fixedCount} product(s)!`);
  
  await prisma.$disconnect();
}

fixProductCategories().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
