// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  try {
    const res = await axios.get(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`)
    return res.data.products
  } catch (error) {
    console.error(error)
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  try {
    const res = await axios.get(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`)
    const { carts, total, finalTotal } = res.data
    return {
      carts,
      total,
      finalTotal,
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  const payload = {
    productId,
    quantity
  }
  try {
    const res = await axios.post(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`, { data: payload })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  const payload = {
    cartId,
    quantity
  }
  try {
    const res = await axios.patch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`, { data: payload })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  try {
    const res = await axios.delete(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  try {
    const res = await axios.delete(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  const payload = { user: userInfo }
  try {
    const res = await axios.post(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`, { data: payload })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  try {
    const res = await axios.get(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`, {
      headers: {
        authorization: ADMIN_TOKEN
      }
     })
    return res.data.orders
  } catch (error) {
    console.error(error)
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  const payload = { id:orderId, paid:isPaid }
  try {
    const res = await axios.put(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`,
      {
        data: payload,
      },
      {
        headers: {
          authorization: ADMIN_TOKEN
        }
      }
    )
    return res.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  try {
    const res = await axios.delete(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`, {
      headers: {
        authorization: ADMIN_TOKEN
      }
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
