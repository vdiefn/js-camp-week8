// ========================================
// 第八週期末專案：電商系統整合
// 執行方式：node app.js
// ========================================

const productService = require('./services/productService');
const cartService = require('./services/cartService');
const orderService = require('./services/orderService');
const { formatCurrency } = require('./utils');

// ========================================
// 主程式
// ========================================

async function main() {
  console.log('========================================');
  console.log('   電商系統 CLI 應用程式');
  console.log('========================================\n');

  try {
    // 1. 取得並顯示產品列表
    console.log('--- 步驟 1：取得產品列表 ---');
    const result = await productService.getProducts();
    if (result && result.products) {
      console.log(`成功取得 ${result.products.length} 筆產品\n`);
      productService.displayProducts(result.products.slice(0, 3)); // 只顯示前 3 筆
    }

    // 2. 取得產品分類
    console.log('\n--- 步驟 2：取得產品分類 ---');
    const categories = await productService.getCategories();
    if (categories) {
      console.log('分類：', categories.join(', '));
    }

    // 3. 查看購物車
    console.log('\n--- 步驟 3：查看購物車 ---');
    const cart = await cartService.getCart();
    if (cart) {
      cartService.displayCart(cart);
    }

    // 4. 加入商品到購物車（示範）
    console.log('\n--- 步驟 4：加入商品到購物車 ---');
    if (result && result.products && result.products.length > 0) {
      const firstProduct = result.products[0];
      console.log(`嘗試加入商品：${firstProduct.title}`);
      const addResult = await cartService.addProductToCart(firstProduct.id, 1);
      if (addResult) {
        console.log('加入成功！');
      }
    }

    // 5. 再次查看購物車
    console.log('\n--- 步驟 5：更新後的購物車 ---');
    const updatedCart = await cartService.getCart();
    if (updatedCart) {
      cartService.displayCart(updatedCart);
    }

    // 6. 計算購物車總金額
    console.log('\n--- 步驟 6：購物車總金額 ---');
    const total = await cartService.getCartTotal();
    if (total) {
      console.log(`商品數量：${total.itemCount}`);
      console.log(`總金額：${formatCurrency(total.total)}`);
      console.log(`折扣後：${formatCurrency(total.finalTotal)}`);
    }

    // 7. 查看訂單列表（管理員功能）
    console.log('\n--- 步驟 7：訂單列表（管理員）---');
    const orders = await orderService.getOrders();
    if (orders) {
      console.log(`共有 ${orders.length} 筆訂單`);
      if (orders.length > 0) {
        orderService.displayOrders(orders.slice(0, 3)); // 只顯示前 3 筆
      }
    }

    // 8. 篩選未付款訂單
    console.log('\n--- 步驟 8：未付款訂單 ---');
    const unpaidOrders = await orderService.getUnpaidOrders();
    if (unpaidOrders) {
      console.log(`未付款訂單：${unpaidOrders.length} 筆`);
    }

    console.log('\n========================================');
    console.log('   程式執行完成');
    console.log('========================================');

  } catch (error) {
    console.error('程式執行錯誤：', error.message);
  }
}

// 執行主程式
main();
