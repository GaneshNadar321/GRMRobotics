# Product Category Mismatch Issue

## Problem
Products are showing in the wrong category section. For example, a product labeled "INTERMEDIATE" is appearing in the "Advanced Kits" section.

## Root Cause
Each product has TWO separate fields:
1. **`categoryId`** - Determines which category section the product appears in (beginner-kits, intermediate-kits, advanced-kits)
2. **`difficulty`** - Just a display label shown on the product card (BEGINNER, INTERMEDIATE, ADVANCED)

These fields are independent and can be mismatched!

## How to Check Which Products Are Mismatched

Run this query in your database or create a simple API endpoint:

```sql
SELECT 
  p.id,
  p.name,
  p.difficulty,
  c.name as category_name,
  c.slug as category_slug
FROM products p
JOIN categories c ON p."categoryId" = c.id
WHERE p."isActive" = true
ORDER BY c.slug, p.name;
```

## How to Fix

### Option 1: Update Products to Match Their Difficulty Level
If you want products to be in categories based on their difficulty:

```sql
-- Update all products to be in the correct category based on difficulty
UPDATE products p
SET "categoryId" = c.id
FROM categories c
WHERE 
  (p.difficulty = 'BEGINNER' AND c.slug = 'beginner-kits') OR
  (p.difficulty = 'INTERMEDIATE' AND c.slug = 'intermediate-kits') OR
  (p.difficulty = 'ADVANCED' AND c.slug = 'advanced-kits');
```

### Option 2: Update Difficulty to Match Category
If you want to keep products in their current categories but fix the difficulty label:

```sql
-- Update difficulty to match the category
UPDATE products p
SET difficulty = 
  CASE 
    WHEN c.slug = 'beginner-kits' THEN 'BEGINNER'::difficulty_level
    WHEN c.slug = 'intermediate-kits' THEN 'INTERMEDIATE'::difficulty_level
    WHEN c.slug = 'advanced-kits' THEN 'ADVANCED'::difficulty_level
  END
FROM categories c
WHERE p."categoryId" = c.id;
```

## Quick Fix via Admin Panel

You can also fix this through the admin panel:
1. Go to Admin → Products
2. Edit each product
3. Make sure the **Category** dropdown matches the **Difficulty Level** dropdown
4. Save the product

## Prevention

When creating new products, always ensure:
- Beginner products → Select "Beginner Kits" category + "BEGINNER" difficulty
- Intermediate products → Select "Intermediate Kits" category + "INTERMEDIATE" difficulty  
- Advanced products → Select "Advanced Kits" category + "ADVANCED" difficulty
