// Railway PostgreSQL connection test
const { PrismaClient } = require('@prisma/client');

async function testRailwayConnection() {
  console.log('🚂 Testing Railway PostgreSQL connection...');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('Using Railway PostgreSQL:', process.env.DATABASE_URL?.includes('railway.app'));
  
  try {
    const prisma = new PrismaClient();
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Railway PostgreSQL connected successfully!');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Users in Railway database: ${userCount}`);
    
    // Test database info
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('📋 PostgreSQL version:', result[0].version);
    
    await prisma.$disconnect();
    console.log('✅ Railway PostgreSQL disconnected successfully!');
    
  } catch (error) {
    console.error('❌ Railway PostgreSQL connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'P1001') {
      console.error('💡 Tip: Make sure your Railway PostgreSQL service is running');
      console.error('💡 Tip: Check your DATABASE_URL environment variable');
    }
    
    process.exit(1);
  }
}

testRailwayConnection();