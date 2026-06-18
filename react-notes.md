# React Fundamentals Notes — Buy-N-Sell Project

> **Reviewer's notes covering every React concept implemented so far.**
> Each topic is explained in beginner-friendly language with examples pulled directly from this codebase.

---

## Table of Contents

1. [What is React?](#1-what-is-react)
2. [Project Setup (Create React App)](#2-project-setup-create-react-app)
3. [JSX (JavaScript XML)](#3-jsx-javascript-xml)
4. [Components](#4-components)
5. [Props](#5-props)
6. [Component Composition](#6-component-composition)
7. [State — `useState` Hook](#7-state--usestate-hook)
8. [Side Effects — `useEffect` Hook](#8-side-effects--useeffect-hook)
9. [Refs — `useRef` Hook](#9-refs--useref-hook)
10. [Conditional Rendering](#10-conditional-rendering)
11. [Rendering Lists with `.map()`](#11-rendering-lists-with-map)
12. [Event Handling](#12-event-handling)
13. [Lifting State Up](#13-lifting-state-up)
14. [Immutable State Updates](#14-immutable-state-updates)
15. [Forms & Controlled Inputs](#15-forms--controlled-inputs)
16. [React Fragments](#16-react-fragments)
17. [Styling in React](#17-styling-in-react)
18. [Component Tree & Data Flow](#18-component-tree--data-flow)
19. [Quick Reference Cheat Sheet](#19-quick-reference-cheat-sheet)

---

## 1. What is React?

React is a JavaScript library for building **user interfaces**. Instead of writing code that directly changes the DOM (like `document.getElementById(...).innerHTML = ...`), you describe what the UI should look like at any moment. React efficiently updates the DOM for you.

**In this project:** The entire app is a single-page React application. When you click a product, add it to the cart, or toggle the cart panel, React handles all the DOM updates behind the scenes.

---

## 2. Project Setup (Create React App)

This project was bootstrapped with **Create React App (CRA)** — a tool that sets up a working React project with zero configuration.

**Key files created by CRA:**

| File | Purpose |
|---|---|
| `package.json` | Lists dependencies (`react`, `react-dom`, `react-scripts`) and npm scripts |
| `public/index.html` | The single HTML page — contains `<div id="root"></div>` where React mounts |
| `src/index.js` | The entry point — renders the root component into the DOM |

**Entry point — `src/index.js`:**
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**What `React.StrictMode` does:** A wrapper that helps you catch bugs during development. It doesn't render anything visible — it just runs extra checks (like detecting unsafe lifecycle methods). It's a safety net, not a requirement.

**How to run:**
```bash
npm start      # development server at http://localhost:3000
npm run build  # production build
npm test       # runs tests
```

---

## 3. JSX (JavaScript XML)

JSX lets you write HTML-like code inside JavaScript. It's not actually HTML — React transforms it into `React.createElement()` calls.

**Basic example from `Header.js`:**
```jsx
<header>
  <h1>💯 Buy-N-Sell</h1>
  <div className="search-bar">
    <input type="text" />
    <button>
      <img className="logo" src="/search.svg" alt="Search Icon" />
    </button>
  </div>
</header>
```

### JSX Rules

| Rule | Explanation | Example from this project |
|---|---|---|
| **Single root element** | JSX expressions must have one parent. Use `<>...</>` (fragment) if needed | `App.js:106` — `<> <div className="App">...</div> <ProductModal /> </>` |
| **`className` not `class`** | `class` is a JavaScript reserved word | `Header.js:6` — `className="search-bar"` |
| **JavaScript in `{}`** | Embed any JS expression inside curly braces | `Product.js:38` — `{"⭐".repeat(Math.round(product.rating))}` |
| **Self-close empty tags** | Tags with no children must be self-closed | `Header.js:6` — `<input type="text" />` |
| **No `if/else` in JSX** | Use ternary (`? :`) or logical `&&` instead | `Product.js:14` — `className={hasDiscount ? "discounted" : "discounted-price"}` |

---

## 4. Components

A component is a **JavaScript function** that returns JSX. Components let you split the UI into independent, reusable pieces.

**The simplest component in this project — `Header.js`:**
```jsx
export default function Header({ onCartOpen }) {
  return (
    <header>
      <h1>💯 Buy-N-Sell</h1>
      <div className="search-bar">
        <input type="text" />
        <button>
          <img className="logo" src="/search.svg" alt="Search Icon" />
        </button>
      </div>
      <button className="cart-button" onClick={onCartOpen}>
        🛒
      </button>
    </header>
  );
}
```

### Two ways to write components:

| Style | Example | Used in this project? |
|---|---|---|
| **Function declaration** | `function Header() { ... }` | ✅ Yes — every component |
| **Arrow function** | `const Header = () => { ... }` | Not used here |

**File naming convention:** Each component gets its own file, named after the component:
```
src/components/
  App.js
  Header.js
  Product.js
  ProductModal.js
  ProductOnCart.js
  CartContainer.js
  Filters.js
```

---

## 5. Props

**Props** (short for "properties") are how you pass data from a **parent** component to a **child** component. Think of them like function arguments.

### Passing Props (Parent → Child)

In `App.js:112-118`:
```jsx
{products.map((product, index) => (
  <Product
    key={index}
    product={product}           // ← data prop
    onProductModal={handleProductModal}  // ← callback prop
  />
))}
```

### Receiving Props (Child)

In `Product.js:1`:
```jsx
export default function Product({ product, onProductModal }) {
  // product and onProductModal are props
  return (
    <div className="product-card" onClick={() => onProductModal(product)}>
      <img className="product-image" src={product.image} alt={product.name} />
      <p className="product-name">{product.name}</p>
    </div>
  );
}
```

### Props Destructuring

You can receive props as a single parameter or destructure them:

```jsx
// Without destructuring (not used in this project)
function Product(props) {
  return <p>{props.product.name}</p>;
}

// With destructuring (used everywhere in this project)
function Product({ product, onProductModal }) {
  return <p>{product.name}</p>;
}
```

**Golden rule:** Props are **read-only**. Never modify `props.product` inside the child component. If you need to change data, ask the parent to do it via a callback prop (see State Lifting).

### All props flowing through this project:

| Parent | Child | Props passed |
|---|---|---|
| App | Header | `onCartOpen` |
| App | Filters | `uniqueCategories` |
| App | Product (×10) | `product`, `onProductModal` |
| App | CartContainer | `isOpen`, `onCartOpen`, `cartItems`, `onRemoveToCart` |
| App | ProductModal | `isProductModalOpen`, `onProductModal`, `selectedProduct`, `onAddToCart` |
| CartContainer | ProductOnCart (×N) | `product`, `onSelectProduct` |

---

## 6. Component Composition

**Composition** means building a complex UI by combining smaller, focused components. Each component does one job.

```
App.js
 │
 ├─ Header         → shows logo, search bar, cart button
 ├─ Filters        → shows category, rating, price filters
 ├─ Product × 10   → shows each product card
 ├─ CartContainer  → manages the slide-out cart
 │   └─ ProductOnCart × N → shows each item in the cart
 └─ ProductModal   → shows product details in a popup
```

In `App.js:106-134`, the App component composes everything together:
```jsx
export default function App() {
  return (
    <>
      <div className="App">
        <Header onCartOpen={handleCartOpen} />
        <div className="main-container">
          <Filters uniqueCategories={uniqueCategories} />
          <div className="products-container">
            {products.map((product, index) => (
              <Product key={index} product={product} onProductModal={handleProductModal} />
            ))}
          </div>
        </div>
        <CartContainer ... />
      </div>
      <ProductModal ... />
    </>
  );
}
```

---

## 7. State — `useState` Hook

**State** is data that changes over time. Unlike props (which are set by the parent), state is managed **inside** the component itself. When state changes, React re-renders that component (and its children).

### The `useState` syntax

```jsx
const [value, setValue] = useState(initialValue);
//      ↑        ↑              ↑
//   current   function    starting value
//   value     to update
```

This is called **array destructuring**. `useState` returns an array of two items: the current value and a function to update it.

### All useState instances in this project

**In `App.js` (4 states):**
```jsx
const [cartItems, setCartItems] = useState([]);           // array of products in cart
const [isCartOpen, setIsCartOpen] = useState(false);      // is the cart panel visible?
const [isProductModalOpen, setProductModal] = useState(false);  // is the modal open?
const [selectedProduct, setSelectedProduct] = useState(null);   // which product to show in modal?
```

**In `ProductModal.js` (1 state):**
```jsx
const [quantity, setQuantity] = useState(1);  // how many of this item to add
```

**In `CartContainer.js` (1 state):**
```jsx
const [selectedProductsOnCart, setSelectedProductsOnCart] = useState([]);  // checked cart items
```

### How state triggers a re-render

```
User clicks "🛒" button
    │
    ▼
handleCartOpen() runs
    │
    ▼
setIsCartOpen(true)       ← state changes
    │
    ▼
React re-renders App()
    │
    ▼
CartContainer receives isOpen={true}
    │
    ▼
cart-container gets className="open"
    │
    ▼
Panel slides in from the right
```

### The three ways to use setState

**1. Set a new value directly:**
```jsx
setIsCartOpen(false);   // CartContainer.js:89 — closes cart when clicking outside
```

**2. Use a callback function (for when new state depends on old state):**
```jsx
// App.js:92 — toggle cart open/close
setIsCartOpen((isCartOpen) => !isCartOpen);

// App.js:96 — add item to cart
setCartItems((cartItems) => [...cartItems, newItem]);

// ProductModal.js:79 — decrease quantity (but not below 1)
setQuantity((quantity) => quantity > 1 ? quantity - 1 : quantity);
```

**3. Toggle with a callback (pattern used throughout):**
```jsx
// App.js:87 — toggle modal
setProductModal((isProductModalOpen) => !isProductModalOpen);
```

**Why use callbacks?** When your new state depends on the previous state, always use the callback form `(prev) => ...`. This ensures you're working with the most recent state, even if multiple state updates are batched together.

---

## 8. Side Effects — `useEffect` Hook

`useEffect` lets you perform **side effects** in function components. Side effects are things like:
- Fetching data from an API
- Adding/removing event listeners
- Syncing with external systems (localStorage, etc.)

### The syntax

```jsx
useEffect(() => {
  // Setup code (runs after render)

  return () => {
    // Cleanup code (runs before unmount or before next effect)
  };
}, [dependencies]);
//  ↑
//  Dependencies array: when any of these values change, the effect re-runs
```

### The useEffect in this project

In `CartContainer.js:83-96`, a click-outside listener is set up:

```jsx
const cartRef = useRef();

useEffect(() => {
  function handleClickOutside(event) {
    if (
      isOpen &&
      cartRef.current &&
      !cartRef.current.contains(event.target)
    ) {
      onCartOpen(); // closes the cart
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);  // cleanup!
  };
}, [isOpen, onCartOpen]);  // re-run when isOpen or onCartOpen changes
```

**What this does, step by step:**
1. When the cart opens (`isOpen` becomes `true`), the effect adds a `mousedown` listener to the whole document
2. Any click anywhere is checked — if it's **outside** the cart, close the cart
3. When the cart closes or the component unmounts, the **cleanup function** removes the listener
4. Without the cleanup, listeners would pile up (memory leak!)

### Cleanup in detail

```jsx
return () => {
  document.removeEventListener("mousedown", handleClickOutside);
};
```

This `return` inside `useEffect` is the **cleanup function**. React calls it:
- Before the component unmounts (prevents memory leaks)
- Before the effect re-runs due to dependency changes

---

## 9. Refs — `useRef` Hook

`useRef` gives you a **mutable reference** that persists across renders. Most commonly used to access DOM elements directly.

```jsx
const cartRef = useRef();
// cartRef.current = null (initially)

<div ref={cartRef} ...>  // now cartRef.current = this DOM element
  ...
</div>
```

**In this project (`CartContainer.js:82,99`):**
```jsx
const cartRef = useRef();

// Later in JSX:
<div ref={cartRef} className={`cart-container ${isOpen ? "open" : ""}`}>
```

Then in `useEffect` (line 87-88):
```jsx
cartRef.current.contains(event.target)  // checks if the clicked element is inside the cart
```

**Other uses of useRef (not in this project but good to know):**
- Store any mutable value without causing re-renders
- Keep references to timers or intervals
- Track previous state or props

---

## 10. Conditional Rendering

React lets you conditionally show or hide parts of the UI based on data.

### Technique 1: Guard clause (early return)

**`ProductModal.js:11`:**
```jsx
if (!isProductModalOpen || !selectedProduct) return null;
// If the modal isn't open or there's no product selected,
// don't render anything at all
```

### Technique 2: Logical `&&` (show if truthy)

**`Product.js:21-28`:**
```jsx
{hasDiscount && (
  <span className="discounted-price">₱{discountedPrice.toLocaleString(...)}</span>
)}
// Only show the discounted price span IF hasDiscount is true
```

Also used for  `{hasDiscount && `${product.storeDiscountPercentage}% off`}` in multiple files.

### Technique 3: Ternary `? :` (show one thing OR another)

**`CartContainer.js:107-123`:**
```jsx
{cartItems.length === 0 ? (
  <p>No items in cart.</p>
) : (
  cartItems.map((product, index) => (
    <ProductOnCart key={index} product={product} ... />
  ))
)}
// Show "No items in cart." OR render the cart items
```

**For CSS classes:**
```jsx
// Product.js:14 — apply strike-through if discounted
className={hasDiscount ? "discounted" : "discounted-price"}

// CartContainer.js:99 — show "open" class if cart is open
className={`cart-container ${isOpen ? "open" : ""}`}
```

### Technique 4: Condition in event toggle

```jsx
// App.js:88 — only set selected product if one was passed
setSelectedProduct(product ? product : null);
```

---

## 11. Rendering Lists with `.map()`

To render a list of items, you map over an array and return JSX for each item.

### Basic pattern

```jsx
{products.map((product, index) => (
  <Product
    key={index}
    product={product}
    onProductModal={handleProductModal}
  />
))}
```

### Where `.map()` is used in this project

| File | What's being mapped |
|---|---|
| `App.js:112` | `products` array → `<Product />` components |
| `CartContainer.js:110` | `cartItems` array → `<ProductOnCart />` components |
| `Filters.js:8` | `uniqueCategories` array → checkbox items |

### The `key` prop

Every item in a list needs a **unique key** so React can track which items changed, were added, or were removed.

```jsx
// ✅ Good: unique ID from data
{users.map(user => <UserCard key={user.id} user={user} />)}

// ⚠️ Used in this project — works but can cause bugs with sorting/deleting
{products.map((product, index) => <Product key={index} ... />)}

// ❌ Bad: no key at all
{products.map(product => <Product product={product} />)}
```

**In this project, `key={index}` is used.** The `productsData.js` file does include unique `id` fields — so `key={product.id}` would be better:
```jsx
{products.map((product) => (
  <Product key={product.id} product={product} onProductModal={handleProductModal} />
))}
```

---

## 12. Event Handling

React events are written in **camelCase** and use function references (not strings).

### onClick

**`Header.js:11`:**
```jsx
<button className="cart-button" onClick={onCartOpen}>
  🛒
</button>
```

**`Product.js:8`:**
```jsx
<div className="product-card" onClick={() => onProductModal(product)}>
  // Anonymous arrow function because we need to pass a parameter
</div>
```

### onChange (for checkboxes and inputs)

**`CartContainer.js:133`:**
```jsx
<input
  type="checkbox"
  id="select-all-on-cart"
  checked={selectedProductsOnCart.length === cartItems.length && cartItems.length > 0}
  onChange={(e) => handleSelectAllProduct(e.target.checked)}
/>
```

**`ProductOnCart.js:55-65`:**
```jsx
<input
  type="checkbox"
  checked={product.checked}
  onChange={() => onSelectProduct({ ...product })}
/>
```

### stopPropagation

**`ProductModal.js:30`:**
```jsx
// Modal overlay closes on click
<div className="modal-overlay" onClick={() => handleCloseModal()}>

  // But clicking inside the modal box should NOT close it
  <div className="modal-box" onClick={(e) => e.stopPropagation()}>
```

Without `e.stopPropagation()`, clicking anywhere inside the modal (including the "Add to cart" button) would also trigger the overlay's onClick and close the modal. `stopPropagation` stops the click from bubbling up.

### Common React events

| React Event | HTML Equivalent | Used in this project? |
|---|---|---|
| `onClick` | `onclick` | ✅ Everywhere |
| `onChange` | `onchange` | ✅ Cart checkboxes |
| `onSubmit` | `onsubmit` | Not used |
| `onMouseEnter` | `onmouseenter` | Not used |
| `onKeyDown` | `onkeydown` | Not used |

---

## 13. Lifting State Up

When multiple components need to share the same data, you **lift the state up** to their closest common ancestor.

### The problem

`ProductModal` needs to add items to the cart. `CartContainer` needs to display them. Both need access to the same list of cart items.

### The solution

The `cartItems` state lives in `App.js` — the common parent. It passes:
- `cartItems` → `CartContainer` (to display)
- `cartItems` → indirectly controls `ProductModal` via `onAddToCart`

```
App.js (state lives here)
 │
 ├─ cartItems, setCartItems
 │
 ├─ handleAddToCart(newItem) → setCartItems(prev => [...prev, newItem])
 │     ↓
 │   ProductModal → calls onAddToCart when user clicks "Add to Cart"
 │
 └─ handleRemoveToCart(ids) → setCartItems(prev => prev.filter(...))
       ↓
     CartContainer → calls onRemoveToCart when user clicks "Delete"
```

**This is called "unidirectional data flow":** data flows down as props, events flow up through callbacks.

### All lifted state in this project:

| State | Lives in | Shared with |
|---|---|---|
| `cartItems` | App | CartContainer (display), ProductModal (add) |
| `isCartOpen` | App | Header (trigger), CartContainer (display) |
| `isProductModalOpen` + `selectedProduct` | App | Product (trigger), ProductModal (display) |

---

## 14. Immutable State Updates

You should **never mutate state directly**. Always create a new copy with your changes.

### ❌ Wrong (mutating state)

```jsx
// These are BAD — they modify the existing array/object
cartItems.push(newItem);        // mutation!
cartItems.splice(index, 1);    // mutation!
product.price = 500;            // mutation!
```

### ✅ Correct (immutable updates)

From this project:

**Adding to an array (`App.js:96`):**
```jsx
setCartItems((cartItems) => [...cartItems, newItem]);
```

**Removing from an array (`App.js:100-102`):**
```jsx
setCartItems((cartItems) =>
  cartItems.filter((product) => !ids.includes(product.id))
);
```

**Toggling an item in a selection array (`CartContainer.js:54-65`):**
```jsx
function handleSelectProduct(selectedProduct) {
  setSelectedProductsOnCart((prevSelected) => {
    // Check if already selected (uses some, not mutation)
    const isAlreadySelected = prevSelected.some(
      (p) => p.id === selectedProduct.id
    );
    if (isAlreadySelected) {
      return prevSelected.filter((p) => p.id !== selectedProduct.id);  // new array
    } else {
      return [...prevSelected, selectedProduct];  // new array
    }
  });
}
```

### Key array methods used

| Method | What it does | Immutable? | Used in |
|---|---|---|---|
| `.map()` | Transforms each item, returns new array | ✅ | Rendering lists |
| `.filter()` | Keeps items that pass a test, returns new array | ✅ | Cart deletion, selection removal |
| `.reduce()` | Accumulates values into a single result | ✅ | Cart total calculations |
| `.some()` | Checks if at least one item passes a test | ✅ | Selection logic |
| `.flatMap()` | Maps then flattens nested arrays | ✅ | Getting unique categories |
| `.push()` | Adds to end (mutates original) | ❌ | Not used |
| `.splice()` | Removes/replaces items (mutates original) | ❌ | Not used |

---

## 15. Forms & Controlled Inputs

The project has form-like inputs, though their filtering logic isn't wired up yet.

### Checkbox inputs with `checked` and `onChange`

**From `CartContainer.js:129-134`:**
```jsx
<input
  type="checkbox"
  id="select-all-on-cart"
  checked={selectedProductsOnCart.length === cartItems.length && cartItems.length > 0}
  onChange={(e) => handleSelectAllProduct(e.target.checked)}
/>
```

**The `checked` attribute makes this a controlled input** — React owns the checkbox state, not the DOM.

### Text inputs (not controlled yet)

**From `Header.js:6`:**
```jsx
<input type="text" />  <!-- No state, no onChange — just a static input -->
```

To make it functional, you'd need:
```jsx
const [searchTerm, setSearchTerm] = useState("");

<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

### Quantity selector (controlled with +/- buttons)

**From `ProductModal.js:77-96`:**
```jsx
<button onClick={() =>
  setQuantity((quantity) => quantity > 1 ? quantity - 1 : quantity)
}>-</button>

<span>{quantity}</span>

<button onClick={() =>
  setQuantity((quantity) =>
    quantity < selectedProduct.stocks ? quantity + 1 : quantity
  )
}>+</button>
```

---

## 16. React Fragments

When a component needs to return multiple elements without a wrapper `<div>`, use a **fragment**.

### Two syntaxes

```jsx
// Full syntax
<React.Fragment>
  <ChildA />
  <ChildB />
</React.Fragment>

// Short syntax (used in this project)
<>
  <ChildA />
  <ChildB />
</>
```

### Where fragments are used

**`App.js:106,134`:**
```jsx
export default function App() {
  return (
    <>                                          {/* Fragment start */}
      <div className="App">...</div>
      <ProductModal ... />
    </>                                         {/* Fragment end */}
  );
}
```

Without the fragment, App would return two adjacent elements (`<div>` and `<ProductModal>`), which JSX doesn't allow. The fragment groups them without adding a real DOM element.

---

## 17. Styling in React

This project uses **plain CSS** in a single file (`src/index.css`).

### Approach: className with static and dynamic values

**Static class:**
```jsx
<div className="product-card">  // Product.js:8
```

**Dynamic class with template literal:**
```jsx
<div className={`cart-container ${isOpen ? "open" : ""}`}>  // CartContainer.js:99
```

**Conditional class with ternary:**
```jsx
<span className={hasDiscount ? "discounted" : "discounted-price"}>  // Product.js:14
```

### CSS structure

All 622 lines of `index.css` are in one file, organized by section comments:
```css
/* Header.css */     (lines 18-80)
/* main container */ (lines 83-90)
/* filter */         (lines 92-99)
/* Product.css */    (lines 101-191)
/* Filters.css */    (lines 193-269)
/* cart */           (lines 271-457)
/* ProductModal */   (lines 459-622)
```

### Styling patterns used

| Pattern | Example |
|---|---|
| Flexbox | `header`, `.main-container`, `.cart-container`, `.product-card-on-cart-footer` |
| CSS Grid | `.products-container` — `grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr))` |
| CSS Transitions | `.cart-container` — `transition: right 0.3s ease-in-out` |
| CSS Transforms (hover) | `.product-card:hover` — `transform: scale(1.03)` |
| Keyframes animation | `@keyframes fadeIn` — modal entrance animation |
| Fixed positioning | `.cart-container`, `.modal-overlay` — position fixed for overlay panels |

---

## 18. Component Tree & Data Flow

### Visual flow diagram

```
┌─────────────────────────────────────────────────────┐
│                       App.js                        │
│                                                     │
│  State:                                             │
│    cartItems = []                                    │
│    isCartOpen = false                                │
│    isProductModalOpen = false                        │
│    selectedProduct = null                            │
│                                                     │
│  Handlers:                                          │
│    handleProductModal()                             │
│    handleCartOpen()                                 │
│    handleAddToCart()                                │
│    handleRemoveToCart()                             │
└───────┬────────────┬──────────┬──────────┬─────────┘
        │            │          │          │
        ▼            ▼          ▼          ▼
   ┌────────┐  ┌─────────┐ ┌────────┐ ┌──────────┐
   │ Header │  │ Filters │ │Product │ │  Cart    │
   │        │  │  (UI    │ │ × 10   │ │Container │
   │Props:  │  │  only)  │ │        │ │          │
   │onCart  │  │         │ │Props:  │ │Props:    │
   │ Open   │  │Props:   │ │product │ │isOpen    │
   │        │  │unique   │ │onProd  │ │onCart    │
   └────────┘  │Categ..  │ │ Modal  │ │Open      │
               └─────────┘ │        │ │cartItems │
                           └────────┘ │onRemove  │
                                      │ToCart    │
                                      │          │
                                      │State:    │
                                      │selected  │
                                      │Products  │
                                      │OnCart    │
                                      │          │
                                      │uses:     │
                                      │useRef    │
                                      │useEffect │
                                      └────┬─────┘
                                           │
                                           ▼
                                      ┌──────────┐
                                      │ Product  │
                                      │ OnCart   │
                                      │ × N      │
                                      │          │
                                      │ Props:   │
                                      │ product  │
                                      │ onSelect │
                                      │ Product  │
                                      └──────────┘

   ┌──────────────┐
   │ProductModal  │
   │              │
   │State:        │
   │  quantity    │
   │              │
   │Props:        │
   │  isProdModal │
   │  Open        │
   │  onProdModal │
   │  selected    │
   │  Product     │
   │  onAddToCart │
   └──────────────┘
```

### Data flow pattern: props down, events up

```
┌────────────┐
│   Parent   │  ← state lives here
│  (App.js)  │
└─────┬──────┘
      │
      │ passes data DOWN as props
      │
      ▼
┌────────────┐
│   Child    │  ← renders data
│ (Header,   │
│  Product,  │
│  etc.)     │
└─────┬──────┘
      │
      │ calls callback UP to modify state
      │
      ▼
┌────────────┐
│   Parent   │  ← re-renders with new state
│  (App.js)  │
└────────────┘
```

---

## 19. Quick Reference Cheat Sheet

### Hook Quick Reference

| Hook | Purpose | Syntax | Used In |
|---|---|---|---|
| `useState` | Manage component state | `const [val, setVal] = useState(init);` | App, ProductModal, CartContainer |
| `useEffect` | Side effects (events, timers, API calls) | `useEffect(() => { ... }, [deps]);` | CartContainer |
| `useRef` | DOM references or mutable values | `const ref = useRef();` | CartContainer |

### Array Operations Quick Reference

| Operation | Code | Used In |
|---|---|---|
| Add to array | `[...arr, newItem]` | handleAddToCart |
| Remove from array | `arr.filter(item => item.id !== targetId)` | handleRemoveToCart |
| Map to JSX | `arr.map(item => <Comp key={item.id} ... />)` | Everywhere |
| Compute total | `arr.reduce((sum, item) => sum + item.price, 0)` | CartContainer totals |
| Check if exists | `arr.some(item => item.id === targetId)` | handleSelectProduct |
| Unique values | `[...new Set(arr.flatMap(item => item.tags))]` | uniqueCategories |
| Object spread | `{...obj, key: newValue}` | handleSelectProduct |
| Slice (not mutate) | `arr.slice(0, 3)` | Not used yet |

### Conditional Rendering Quick Reference

| Technique | Syntax | Used In |
|---|---|---|
| Guard return | `if (!data) return null;` | ProductModal |
| Logical AND | `{show && <Component />}` | Discount display |
| Ternary | `{cond ? <A /> : <B />}` | CSS classes, empty cart |
| Conditional CSS class | `className={cond ? "class-a" : "class-b"}` | Product.js, CartContainer |

### File Structure

```
buy-n-sell/
├── public/
│   └── index.html          ← Single HTML page
├── src/
│   ├── index.js            ← Entry point (ReactDOM.createRoot)
│   ├── index.css           ← All styles (622 lines)
│   └── components/
│       ├── App.js          ← Root component (state + composition)
│       ├── Header.js       ← Logo, search bar, cart button
│       ├── Filters.js      ← Category/rating/price filter UI
│       ├── Product.js      ← Product card
│       ├── ProductModal.js ← Product detail popup
│       ├── CartContainer.js← Slide-out cart with logic
│       ├── ProductOnCart.js← Individual cart item
│       └── productsData.js ← Product catalog data
├── package.json            ← Dependencies and scripts
└── README.md               ← CRA default readme
```

---

## Summary: What You Built

You built a **complete e-commerce UI** with:

| Feature | Implementation |
|---|---|
| Product listing | Array data → `.map()` → Product components |
| Product detail modal | Conditional rendering + state |
| Add to cart | State lifting + immutable updates |
| Slide-out cart panel | CSS transition + dynamic className |
| Cart item selection | Checkboxes + selection state array |
| Cart total calculation | `.reduce()` with discount math |
| Click-outside close | `useRef` + `useEffect` + event listener |
| Quantity selector | `useState` with min/max guards |
| Discount display | Conditional `&&` rendering |
| Responsive grid | CSS Grid `auto-fit` |
| Modal overlay | Fixed positioning + click-outside |
| Currency formatting | `toLocaleString("en-PH")` |

**Topics not yet covered in this project (next to learn):**
- `useContext` (global state without prop drilling)
- Custom hooks (extract reusable logic)
- React Router (multi-page navigation)
- Fetching data from APIs (with `useEffect`)
- Forms with multiple fields
- `useReducer` (complex state logic)
