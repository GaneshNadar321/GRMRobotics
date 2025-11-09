# Stock Management - How It Works

## When Does Stock Decrease?

Stock is **NOT** decreased when:
- ❌ User adds product to cart
- ❌ User clicks "Buy Now" button
- ❌ User goes to checkout page
- ❌ Order is created in the system

Stock **IS** decreased when:
- ✅ Payment is successfully verified (Online Payment)
- ✅ Cash on Delivery order is confirmed
- ✅ Order status changes to "PAID"

## Why This Design?

This is the **correct e-commerce behavior** used by Amazon, Flipkart, and other major platforms:

1. **Prevents Stock Locking**: Users often add items to cart but don't complete purchase
2. **Fair Inventory**: Stock isn't held hostage by abandoned carts
3. **Payment First**: Only confirmed, paid orders reduce inventory
4. **Fraud Prevention**: Prevents fake orders from depleting stock

## Testing Stock Reduction

### Method 1: Complete Payment Flow (Recommended)
1. Add product to cart
2. Go to checkout
3. Fill shipping details
4. Complete payment (Razorpay)
5. ✅ Stock will decrease after payment verification

### Method 2: Use Cash on Delivery
1. Add product to cart
2. Go to checkout
3. Fill shipping details
4. Select "Cash on Delivery" payment method
5. Confirm order
6. ✅ Stock will decrease immediately

### Method 3: Admin Panel (For Testing)
1. Go to Admin → Orders
2. Find the order
3. Change status to "PAID"
4. ✅ Stock will decrease

## Current Flow

```
User Journey:
1. Browse Products → Stock: 10
2. Add to Cart → Stock: 10 (unchanged)
3. Checkout → Stock: 10 (unchanged)
4. Create Order → Stock: 10 (unchanged)
5. Pay/Verify → Stock: 9 (DECREASED!)
```

## Code Location

Stock reduction happens in:
- **File**: `backend/src/controllers/checkout.controller.ts`
- **Function**: `verifyPayment()` (line 237-242)
- **Function**: `confirmCODOrder()` (for COD orders)

```typescript
// Reduce stock after payment verification
for (const item of orderItems) {
  await prisma.product.update({
    where: { id: item.productId },
    data: { stock: { decrement: item.quantity } },
  });
}
```

## What If Stock Runs Out During Checkout?

The system validates stock before creating the order:

```typescript
// Validate stock (in createOrder function)
for (const item of cart.items) {
  if (item.product.stock < item.quantity) {
    throw new AppError(`Insufficient stock for ${item.product.name}`, 400);
  }
}
```

If stock becomes 0 between checkout and payment, the order creation will fail with an error message.

## Summary

✅ **This is working correctly!** Stock should only decrease after successful payment, not when clicking "Buy Now". This is standard e-commerce behavior and prevents inventory issues.
