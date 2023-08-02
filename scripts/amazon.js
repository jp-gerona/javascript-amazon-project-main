import {cart} from '../data/cart.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {

    //* This variable is used to store the timer ID of the "Added" message.
    //* It is declared outside the event listener function to create a closure, allowing the timer ID to persist between multiple button clicks.
    //* Because of closure, the function we give to button.addEventlistener() will get a unique ID of the addedMessageTimeoutId variable.
    //* This allows us to create multiple unique copies of the addedMessageTimeoutId variable and keep track of many timeOutIds (one for each product).
    let addedMessageTimeoutId;

    button.addEventListener('click', () => {
      const {productId} = button.dataset;

      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity =  Number(quantitySelector.value);

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity
        });
      }

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

      //* Display the green "Added" message.
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMessage.classList.add('added-to-cart-visible');

      //* If there is an existing timer for the message, clear it.
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      //* Set a new timer to remove the "Added" message after 2 seconds.
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      //* Store the timer ID in the addedMessageTimeoutId variable for future reference and so we can stop it later.
      addedMessageTimeoutId = timeoutId;
    });
  });