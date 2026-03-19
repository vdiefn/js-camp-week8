// ========================================
// 產品服務
// ========================================

const { fetchProducts } = require('../api');
const { getDiscountRate, getAllCategories } = require('../utils');

/**
 * 取得所有產品
 * @returns {Promise<Object>}
 */
async function getProducts() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得產品，並格式化回傳
}

/**
 * 根據分類篩選產品
 * @param {string} category - 分類名稱
 * @returns {Promise<Array>}
 */
async function getProductsByCategory(category) {
  // 請實作此函式
}

/**
 * 根據 ID 取得單一產品
 * @param {string} productId - 產品 ID
 * @returns {Promise<Object|null>}
 */
async function getProductById(productId) {
  // 請實作此函式
}

/**
 * 取得所有分類
 * @returns {Promise<Array>}
 */
async function getCategories() {
  // 請實作此函式
}

/**
 * 顯示產品列表
 * @param {Array} products - 產品陣列
 */
function displayProducts(products) {
  // 請實作此函式
  // 提示：格式化輸出產品名稱、價格、折扣等資訊
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  getCategories,
  displayProducts
};
