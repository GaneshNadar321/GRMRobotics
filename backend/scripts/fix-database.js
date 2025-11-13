const { PrismaClient } = require('@prisma/client');

async function fixDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking database schema...');
    
    // Try to add the specifications column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS specifications JSONB;
    `;
    
    console.log('Database schema updated successfully!');
    
    // Test the connection
    const productCount = await prisma.product.count();
    console.log(`Found ${productCount} products in database`);
    
  } catch (error) {
    console.error('Error fixing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixDatabase();