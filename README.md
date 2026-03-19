# 第八週期末專案：電商系統整合

## 學習目標

整合前七週所學，建立完整的電商系統 CLI 應用程式：

- API 模組化設計
- 服務層架構
- 工具函式封裝
- 完整錯誤處理

---

## Step 1：環境準備

### 1.1 進入作業資料夾

```bash
cd 2025-js-plan/week8/assignment
```

### 1.2 安裝套件

```bash
npm install
```

這會安裝 `dayjs`、`axios`、`dotenv`、`jest` 等套件。

### 1.3 確認 .env 設定

請確認專案根目錄的 `.env` 檔案有正確的 API 設定：

```text
API_PATH=你的API路徑
API_KEY=你的API金鑰
```

---

## Step 2：了解專案架構

### 2.1 檔案結構

```text
week8/assignment/
├── package.json              # 專案設定
├── config.js                 # API 設定（已完成）
├── api.js                    # API 請求函式
├── utils.js                  # 工具函式
├── services/
│   ├── productService.js     # 產品服務
│   ├── cartService.js        # 購物車服務
│   └── orderService.js       # 訂單服務
├── app.js                    # 主程式入口
├── test.js                   # Jest 測試檔案
└── README.md                 # 本說明文件
```

### 2.2 專案架構圖

```text
┌─────────────────────────────────────────────────────────┐
│                        app.js                           │
│                      (主程式入口)                        │
└───────────────────────────┬─────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ productService│   │  cartService  │   │ orderService  │
│  (產品服務)    │   │  (購物車服務)  │   │  (訂單服務)   │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────┴───────┐
                    ▼               ▼
             ┌──────────┐    ┌──────────┐
             │  api.js  │    │ utils.js │
             │ (API請求) │    │ (工具函式)│
             └────┬─────┘    └──────────┘
                  │
                  ▼
            ┌──────────┐
            │ config.js│
            │ (API設定) │
            └──────────┘
```

### 2.3 任務配分

| 任務 | 配分 | 檔案 |
|------|------|------|
| API 模組 | 25% | `api.js` |
| 工具函式 | 15% | `utils.js` |
| 產品服務 | 20% | `services/productService.js` |
| 購物車服務 | 25% | `services/cartService.js` |
| 訂單服務 | 15% | `services/orderService.js` |

---

## Step 3：完成各檔案任務

### 任務一：API 模組 (api.js) - 25%

需完成的函式：

| 函式名稱 | 類型 | 說明 |
|----------|------|------|
| `fetchProducts()` | 客戶端 | 取得產品列表 |
| `fetchCart()` | 客戶端 | 取得購物車 |
| `addToCart(productId, quantity)` | 客戶端 | 加入購物車 |
| `updateCartItem(cartId, quantity)` | 客戶端 | 更新購物車數量 |
| `deleteCartItem(cartId)` | 客戶端 | 刪除購物車項目 |
| `clearCart()` | 客戶端 | 清空購物車 |
| `createOrder(userInfo)` | 客戶端 | 建立訂單 |
| `fetchOrders()` | 管理員 | 取得訂單列表（需認證） |
| `updateOrderStatus(orderId, isPaid)` | 管理員 | 更新訂單狀態 |
| `deleteOrder(orderId)` | 管理員 | 刪除訂單 |

**API 端點參考：**

```javascript
// 客戶端 API
const CUSTOMER_BASE = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}`;

// GET /products - 取得產品
// GET /carts - 取得購物車
// POST /carts - 加入購物車
// PATCH /carts - 更新購物車
// DELETE /carts/{cartId} - 刪除項目
// DELETE /carts - 清空購物車
// POST /orders - 建立訂單

// 管理員 API（需要 Authorization header）
const ADMIN_BASE = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}`;

// GET /orders - 取得訂單
// PUT /orders - 更新訂單狀態
// DELETE /orders/{orderId} - 刪除訂單
```

### 任務二：工具函式 (utils.js) - 15%

需完成的函式：

| 函式名稱 | 說明 | 範例輸出 |
|----------|------|----------|
| `getDiscountRate(product)` | 計算折扣率 | `"8折"` |
| `getAllCategories(products)` | 取得不重複分類 | `["衣服", "褲子"]` |
| `formatDate(timestamp)` | 格式化日期 | `"2024/01/01"` |
| `getDaysAgo(timestamp)` | 計算天數 | `"3 天前"` |
| `validateOrderUser(data)` | 驗證使用者資料 | `{ isValid, errors }` |
| `validateCartQuantity(qty)` | 驗證數量 | `{ isValid, error }` |

**折扣率計算：**

```javascript
// price: 1000, origin_price: 1250
// 折扣率 = price / origin_price = 0.8 = 8折
const rate = Math.round((price / origin_price) * 10);
return `${rate}折`;
```

**驗證規則（同第七週）：**

| 欄位 | 規則 |
|------|------|
| `name` | 不可為空 |
| `tel` | 09 開頭的 10 位數字 |
| `email` | 包含 @ 符號 |
| `address` | 不可為空 |
| `payment` | `'ATM'`, `'Credit Card'`, `'Apple Pay'` 其中之一 |

### 任務三：產品服務 (services/productService.js) - 20%

需完成的函式：

| 函式名稱 | 說明 | 回傳格式 |
|----------|------|----------|
| `getProducts()` | 取得所有產品 | `{ products: [], count: number }` |
| `getProductsByCategory(category)` | 依分類篩選 | `Array` |
| `getProductById(productId)` | 依 ID 查詢 | `Object \| null` |
| `getCategories()` | 取得所有分類 | `Array` |
| `displayProducts(products)` | 輸出產品資訊 | `void` |

### 任務四：購物車服務 (services/cartService.js) - 25%

需完成的函式：

| 函式名稱 | 說明 | 回傳格式 |
|----------|------|----------|
| `getCart()` | 取得購物車 | `Object` |
| `addProductToCart(productId, qty)` | 加入商品（含驗證） | `{ success, data \| error }` |
| `updateProduct(cartId, qty)` | 更新數量 | `Object` |
| `removeProduct(cartId)` | 移除商品 | `Object` |
| `emptyCart()` | 清空購物車 | `Object` |
| `getCartTotal()` | 計算總金額 | `{ total, finalTotal, itemCount }` |
| `displayCart(cart)` | 輸出購物車 | `void` |

**加入購物車流程：**

```javascript
async function addProductToCart(productId, quantity) {
  // 1. 驗證數量
  const validation = validateCartQuantity(quantity);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  // 2. 呼叫 API
  const result = await addToCart(productId, quantity);
  return { success: true, data: result };
}
```

### 任務五：訂單服務 (services/orderService.js) - 15%

需完成的函式：

| 函式名稱 | 說明 | 回傳格式 |
|----------|------|----------|
| `placeOrder(userInfo)` | 建立訂單（含驗證） | `{ success, data \| errors }` |
| `getOrders()` | 取得所有訂單 | `Array` |
| `getUnpaidOrders()` | 取得未付款訂單 | `Array` |
| `getPaidOrders()` | 取得已付款訂單 | `Array` |
| `updatePaymentStatus(orderId, isPaid)` | 更新付款狀態 | `Object` |
| `removeOrder(orderId)` | 刪除訂單 | `Object` |
| `formatOrder(order)` | 格式化訂單 | `Object` |
| `displayOrders(orders)` | 輸出訂單列表 | `void` |

**formatOrder 回傳格式：**

```javascript
{
  ...order,
  totalFormatted: 'NT$ 1,000',
  paidText: '已付款' | '未付款',
  createdAt: '2024/01/01 08:00'
}
```

---

## Step 4：測試與驗證

### 4.1 執行程式

```bash
node app.js
```

### 4.2 Jest 完整測試

```bash
npm test
```

### 4.3 測試項目（共 22 項）

| 測試群組 | 測試數量 | 說明 |
|----------|----------|------|
| API 模組 | 4 項 | fetchProducts, fetchCart |
| 工具函式 | 10 項 | getDiscountRate, getAllCategories, formatDate, getDaysAgo, validateOrderUser, validateCartQuantity |
| 產品服務 | 4 項 | getProducts, getCategories |
| 購物車服務 | 5 項 | getCart, getCartTotal, addProductToCart |
| 訂單服務 | 6 項 | getOrders, getUnpaidOrders, getPaidOrders, formatOrder |

### 4.4 測試通過範例

```text
 PASS  ./test.js
  測試一：API 模組
    fetchProducts
      ✓ 應回傳陣列
      ✓ 應有產品資料
    fetchCart
      ✓ 應回傳物件
  測試二：工具函式
    getDiscountRate
      ✓ 應回傳字串
      ✓ 應包含 "折"
    ...

Test Suites: 1 passed, 1 total
Tests:       22 passed, 22 total
```

---

## API 參考

### LiveJS API 端點

| 方法 | 端點 | 說明 | 認證 |
|------|------|------|------|
| GET | `/customer/{path}/products` | 取得產品列表 | 否 |
| GET | `/customer/{path}/carts` | 取得購物車 | 否 |
| POST | `/customer/{path}/carts` | 加入購物車 | 否 |
| PATCH | `/customer/{path}/carts` | 更新購物車 | 否 |
| DELETE | `/customer/{path}/carts/{id}` | 刪除購物車項目 | 否 |
| DELETE | `/customer/{path}/carts` | 清空購物車 | 否 |
| POST | `/customer/{path}/orders` | 建立訂單 | 否 |
| GET | `/admin/{path}/orders` | 取得訂單 | 是 |
| PUT | `/admin/{path}/orders` | 更新訂單 | 是 |
| DELETE | `/admin/{path}/orders/{id}` | 刪除訂單 | 是 |

### 認證方式

管理員 API 需要在 Header 帶入 token：

```javascript
const response = await axios.get(url, {
  headers: {
    authorization: ADMIN_TOKEN
  }
});
```

---

## 常見問題

### Q1: config.js 的設定怎麼用？

```javascript
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');
```

`config.js` 已經幫你從 `.env` 讀取設定並匯出。

### Q2: 服務層和 API 層的差別？

- **API 層 (api.js)**：純粹的 HTTP 請求，不含業務邏輯
- **服務層 (services/)**：包含驗證、格式化等業務邏輯，呼叫 API 層

### Q3: 購物車 API 的資料格式？

```javascript
// 加入購物車 POST body
{
  data: {
    productId: "xxx",
    quantity: 2
  }
}

// 更新購物車 PATCH body
{
  data: {
    id: "cartItemId",
    quantity: 3
  }
}
```

### Q4: 訂單 API 的資料格式？

```javascript
// 建立訂單 POST body
{
  data: {
    user: {
      name: "王小明",
      tel: "0912345678",
      email: "test@test.com",
      address: "台北市",
      payment: "Credit Card"
    }
  }
}
```

### Q5: getCartTotal 怎麼計算？

```javascript
async function getCartTotal() {
  const cart = await fetchCart();
  const carts = cart.carts || [];

  return {
    total: cart.total || 0,
    finalTotal: cart.finalTotal || cart.total || 0,
    itemCount: carts.length
  };
}
```

### Q6: formatOrder 需要哪些欄位？

```javascript
function formatOrder(order) {
  return {
    ...order,
    totalFormatted: formatCurrency(order.total),
    paidText: order.paid ? '已付款' : '未付款',
    createdAt: formatDate(order.createdAt)
  };
}
```

---

## 繳交方式

1. 完成所有檔案中的函式
2. 執行 `npm test` 確保所有測試通過
3. 將程式碼上傳至 GitHub
4. 提交 GitHub 連結

---

## 參考解答

完成作業後，可參考 `solution/` 資料夾中的解答。
