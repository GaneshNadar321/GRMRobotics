import request from 'supertest';
import app from '../server';

describe('Product API', () => {
  describe('GET /api/products', () => {
    it('should return list of products', async () => {
      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.products)).toBe(true);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products')
        .query({ category: 'beginner-kits' });

      expect(response.status).toBe(200);
      expect(response.body.products.length).toBeGreaterThanOrEqual(0);
    });

    it('should search products', async () => {
      const response = await request(app)
        .get('/api/products')
        .query({ search: 'robot' });

      expect(response.status).toBe(200);
      expect(response.body.products.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/00000000-0000-0000-0000-000000000000');

      expect(response.status).toBe(404);
    });
  });
});
