// ========================================
// 第八週期末專案 Jest 測試
// 執行方式：npm test
// ========================================

// 載入環境變數
require('dotenv').config({ path: '../../.env' });

const api = require('./api');
const utils = require('./utils');
const productService = require('./services/productService');
const cartService = require('./services/cartService');
const orderService = require('./services/orderService');

// 測試超時設定
jest.setTimeout(30000);

// 測試資料
const mockProduct = { price: 1000, origin_price: 1250 };
const mockProducts = [
  { category: '衣服' },
  { category: '褲子' },
  { category: '衣服' }
];
const validUser = {
  name: '測試',
  tel: '0912345678',
  email: 'test@test.com',
  address: '測試地址',
  payment: 'ATM'
};

// ========================================
// 測試一：API 模組
// ========================================
describe('測試一：API 模組', () => {

  describe('fetchProducts', () => {
    test('應回傳陣列', async () => {
      const result = await api.fetchProducts();
      expect(Array.isArray(result)).toBe(true);
    });

    test('應有產品資料', async () => {
      const result = await api.fetchProducts();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('fetchCart', () => {
    test('應回傳物件', async () => {
      const result = await api.fetchCart();
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });
  });
});

// ========================================
// 測試二：工具函式
// ========================================
describe('測試二：工具函式', () => {

  describe('getDiscountRate', () => {
    test('應回傳字串', () => {
      const result = utils.getDiscountRate(mockProduct);
      expect(typeof result).toBe('string');
    });

    test('應包含 "折"', () => {
      const result = utils.getDiscountRate(mockProduct);
      expect(result).toContain('折');
    });
  });

  describe('getAllCategories', () => {
    test('應回傳陣列', () => {
      const result = utils.getAllCategories(mockProducts);
      expect(Array.isArray(result)).toBe(true);
    });

    test('應去除重複（2 個分類）', () => {
      const result = utils.getAllCategories(mockProducts);
      expect(result.length).toBe(2);
    });
  });

  describe('formatDate', () => {
    test('應回傳字串', () => {
      const timestamp = 1609459200;
      const result = utils.formatDate(timestamp);
      expect(typeof result).toBe('string');
    });
  });

  describe('getDaysAgo', () => {
    test('應回傳字串', () => {
      const timestamp = Date.now() / 1000 - 86400 * 3;
      const result = utils.getDaysAgo(timestamp);
      expect(typeof result).toBe('string');
    });
  });

  describe('validateOrderUser', () => {
    test('應回傳物件', () => {
      const result = utils.validateOrderUser(validUser);
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    test('應有 isValid 屬性（布林值）', () => {
      const result = utils.validateOrderUser(validUser);
      expect(typeof result.isValid).toBe('boolean');
    });
  });

  describe('validateCartQuantity', () => {
    test('正數應 isValid 為 true', () => {
      const result = utils.validateCartQuantity(5);
      expect(result.isValid).toBe(true);
    });

    test('負數應 isValid 為 false', () => {
      const result = utils.validateCartQuantity(-1);
      expect(result.isValid).toBe(false);
    });
  });
});

// ========================================
// 測試三：產品服務
// ========================================
describe('測試三：產品服務', () => {

  describe('getProducts', () => {
    test('應回傳物件', async () => {
      const result = await productService.getProducts();
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    test('應有 products 陣列', async () => {
      const result = await productService.getProducts();
      expect(Array.isArray(result.products)).toBe(true);
    });
  });

  describe('getCategories', () => {
    test('應回傳陣列', async () => {
      const result = await productService.getCategories();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});

// ========================================
// 測試四：購物車服務
// ========================================
describe('測試四：購物車服務', () => {

  describe('getCart', () => {
    test('應回傳物件', async () => {
      const result = await cartService.getCart();
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });
  });

  describe('getCartTotal', () => {
    test('應回傳物件', async () => {
      const result = await cartService.getCartTotal();
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    test('應有 total 屬性（數字）', async () => {
      const result = await cartService.getCartTotal();
      expect(typeof result.total).toBe('number');
    });

    test('應有 itemCount 屬性（數字）', async () => {
      const result = await cartService.getCartTotal();
      expect(typeof result.itemCount).toBe('number');
    });
  });
});

// ========================================
// 測試五：訂單服務
// ========================================
describe('測試五：訂單服務', () => {

  describe('getOrders', () => {
    test('應回傳陣列', async () => {
      const result = await orderService.getOrders();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getUnpaidOrders', () => {
    test('應回傳陣列', async () => {
      const result = await orderService.getUnpaidOrders();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getPaidOrders', () => {
    test('應回傳陣列', async () => {
      const result = await orderService.getPaidOrders();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
