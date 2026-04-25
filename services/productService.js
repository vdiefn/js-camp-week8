// ========================================
// 產品服務
// ========================================

const { fetchProducts } = require("../api");
const {
  getDiscountRate,
  getAllCategories,
  formatCurrency,
} = require("../utils");

/**
 * 取得所有產品
 * @returns {Promise<Object>}
 */
async function getProducts() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得產品陣列
  // 回傳格式：{ products, count: 產品數量 }
  try {
    const res = await fetchProducts();
    return {
      products: res,
      count: res.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 根據分類篩選產品
 * @param {string} category - 分類名稱
 * @returns {Promise<Array>}
 */
async function getProductsByCategory(category) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，篩選出符合 category 的產品
  // 回傳格式：篩選後的產品陣列
  try {
    const res = await fetchProducts();
    return res.filter((item) => item.category === category);
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 根據 ID 取得單一產品
 * @param {string} productId - 產品 ID
 * @returns {Promise<Object|null>}
 */
async function getProductById(productId) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，找出 id 符合的產品
  // 若找不到，回傳 null
  try {
    const res = await fetchProducts();
    return res.find((item) => item.id === productId) || null;
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 取得所有分類（不重複）
 * @returns {Promise<Array>}
 */
async function getCategories() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，代入到 utils getAllCategories()
  try {
    const res = await fetchProducts();
    return getAllCategories(res);
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 顯示產品列表
 * @param {Array} products - 產品陣列
 */
function displayProducts(products) {
  // 請實作此函式
  // 提示：使用 forEach 遍歷產品陣列，依序輸出每筆產品資訊
  // 會使用到 utils getDiscountRate() 計算折扣率，以及 utils formatCurrency() 格式化金額
  //
  // 預期輸出格式：
  // 產品列表：
  // ----------------------------------------
  // 1. 產品名稱
  //    分類：xxx
  //    原價：NT$ 1,000
  //    售價：NT$ 800 (8折)
  // ----------------------------------------
  if (!products || products.length === 0) {
    console.log("沒有產品");
    return;
  }

  products.forEach((item, index) => {
    if (index === 0) {
      console.log(`產品列表：\n----------------------------------------`);
    }
    console.log(`${index + 1}: ${item.title}\n${" ".repeat(4)}分類: ${item.category}\n${" ".repeat(4)}原價: ${formatCurrency(item.origin_price)}\n${" ".repeat(4)}售價: ${formatCurrency(item.price)} (${getDiscountRate(item)})\n----------------------------------------
    `);
  });
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  getCategories,
  displayProducts,
};
