import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProductCategories() {
  console.log('🔍 Checking product categories...\n');

  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
    },
    orderBy: {
      category: {
        slug: 'asc',
      },
    },
  });

  const mismatches: any[] = [];
  const correct: any[] = [];

  products.forEach((product) => {
    const categorySlug = product.category.slug;
    const difficulty = product.difficulty;

    const expectedCategory = 
      difficulty === 'BEGINNER' ? 'beginner-kits' :
      difficulty === 'INTERMEDIATE' ? 'intermediate-kits' :
      'advanced-kits';

    const isMatch = categorySlug === expectedCategory;

    const info = {
      id: product.id,
      name: product.name,
      difficulty: difficulty,
      category: product.category.name,
      categorySlug: categorySlug,
      expectedCategory: expectedCategory,
    };

    if (isMatch) {
      correct.push(info);
    } else {
      mismatches.push(info);
    }
  });

  console.log('✅ CORRECTLY CATEGORIZED PRODUCTS:', correct.length);
  correct.forEach((p) => {
    console.log(`  - ${p.name} (${p.difficulty}) → ${p.category}`);
  });

  console.log('\n❌ MISMATCHED PRODUCTS:', mismatches.length);
  if (mismatches.length > 0) {
    console.log('These products have difficulty levels that don\'t match their category:\n');
    mismatches.forEach((p) => {
      console.log(`  - ${p.name}`);
      console.log(`    Difficulty: ${p.difficulty}`);
      console.log(`    Current Category: ${p.category} (${p.categorySlug})`);
      console.log(`    Expected Category: ${p.expectedCategory}`);
      console.log('');
    });
  }

  await prisma.$disconnect();
}

checkProductCategories().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
