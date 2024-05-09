document.addEventListener("DOMContentLoaded", function () {
  var addToCartButtons = document.querySelectorAll(".card-btn");
  var cartTotal = 0;

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      var product = {
        name: button.dataset.name,
        image: button.dataset.image,
        amount: button.dataset.amount,
        quantity: 1,
        subtotal: parseFloat(button.dataset.amount),
      };

      var cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cartTotal = JSON.parse(localStorage.getItem("cartTotal"));

      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      cartTotal += product.subtotal;
      localStorage.setItem("cartTotal", cartTotal.toFixed(2));
    });
  });

  var cart = JSON.parse(localStorage.getItem("cart") || "[]");
  var cartTableBody = document.querySelector(".cart tbody");

  cart.forEach(function (product) {
    var row = document.createElement("tr");

    var removeCell = document.createElement("td");
    var removeLink = document.createElement("a");
    removeLink.href = "#";
    var removeImage = document.createElement("img");
    removeImage.classList.add("cart");
    removeImage.src = "BAGIMG/delete.jpeg";
    removeLink.appendChild(removeImage);
    removeCell.appendChild(removeLink);
    row.appendChild(removeCell);

    var imageCell = document.createElement("td");
    var productImage = document.createElement("img");
    productImage.src = product.image;
    imageCell.appendChild(productImage);
    row.appendChild(imageCell);

    var nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    var priceCell = document.createElement("td");
    priceCell.textContent = product.amount;
    row.appendChild(priceCell);

    var quantityCell = document.createElement("td");
    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = product.quantity;
    quantityInput.addEventListener("input", function (event) {
      var newQuantity = parseInt(event.target.value);

      var index = cart.findIndex(function (item) {
        return (
          item.name === product.name &&
          item.image === product.image &&
          item.amount === product.amount
        );
      });

      if (index !== -1) {
        cart[index].quantity = newQuantity;
        cart[index].subtotal = newQuantity * parseFloat(product.amount);
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      subtotalCell.textContent = cart[index].subtotal.toFixed(2);

      cartTotal = calculateCartTotal(cart);
      localStorage.setItem("cartTotal", cartTotal.toFixed(2));
    });
    quantityCell.appendChild(quantityInput);
    row.appendChild(quantityCell);

    var subtotalCell = document.createElement("td");
    subtotalCell.textContent = product.subtotal.toFixed(2);
    row.appendChild(subtotalCell);

    cartTableBody.appendChild(row);
  });
});

function calculateCartTotal(cart) {
  var total = 0;
  cart.forEach(function (product) {
    total += product.subtotal;
  });
  return total;
}
