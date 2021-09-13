
const loaderContainer = document.getElementById('loader-container');
const loading = (isLoading) => {
  console.log(isLoading);
  if(isLoading == false ){
    loaderContainer.style.visibility = 'hidden';
  }
  else{
    loaderContainer.style.visibility = '';
  }
}

// CALL API 
const loadProducts = () => {
  // Clear old products 
  document.getElementById("all-products").innerText = '';

  const url = 'https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json';
  // const url = `data.txt`;
  fetch(url)
    .then((response) => {
      loading(false);
      return response.json()
    })
    .then((data) => showProducts(data));
};
loadProducts();
// const jsonData = 'products.json';
// showProducts(jsonData);

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div class="product-img-shadow ">
        <img class="product-image" src=${image}></img>
        <div class="product-category-badge ">
          ${product.category}
        </div>
      </div>
      <div class="product-details-container">
        <div class="product-title d-flex flex-column justify-content-start ">
          <h4 >${product.title}</h4>
        </div>
        <p class="product-rating">     
          <i class="fas fa-star"></i> ${product.rating.rate} rated by ${product.rating.count} people        
        </p>

        <h2 class="product-price">Price: $ ${product.price}</h2>
        
        


        <div class="btn-group mt-3" role="group" >
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn  btn-outline-success btn-sm">ADD TO CART</button>
          <button id="details-btn" class="btn  btn-outline-info btn-sm ">DETAILS</button>
        </div>
      </div>
      
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  // Update product count 
  count = count + 1;
  document.getElementById("total-Products").innerText = count;

  // Update product price 
  updateProductPrice("price", price);

  // Calculate Tax & Delivery Charge 
  updateTaxAndCharge();
  
  // Update Grand Total Price
  updateTotal();
};

const getInputValue = (elementId) => {
  const element = document.getElementById(elementId).innerText;
  // console.log('updateProductPrice>getInputValue ',element);
  const  converted =  convertToFloatNumber(element) ;                      // convert innerText value to Float
  // const  converted =  parseFloat(element,2) ;                      // convert innerText value to Float
  return converted;
};

// Update Product Price , Calculate Tax , Calculated total Sum 
const updateProductPrice = (elementId, value) => {
  

  const oldProductPrice = getInputValue(elementId);
  const currentProductPrice = convertToFloatNumber(value);
  console.log(count, oldProductPrice,currentProductPrice );
  const total = oldProductPrice + currentProductPrice;
  document.getElementById(elementId).innerText = convertToFloatNumber(total) ; 
  
  // document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
  // document.getElementById(id).innerText = Math.round(value);
};

const convertToFloatNumber = (value) => {
  // return Number.parseFloat(value).toFixed(2);
  // const toFloat = parseFloat(value);
  // return Number.tot
    // return Number(parseFloat(value).toFixed(2));
    return Number(parseFloat(value).toFixed(2));
}

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const subTotalProductPrice = getInputValue("price");
  if (subTotalProductPrice > 200) {
    // console.log (convertToFloatNumber(subTotalProductPrice * 0.2));
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax",   convertToFloatNumber(subTotalProductPrice * 0.2) );
  }
  if (subTotalProductPrice > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", convertToFloatNumber(subTotalProductPrice * 0.3) );
  }
  if (subTotalProductPrice > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", convertToFloatNumber(subTotalProductPrice * 0.4) );
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = convertToFloatNumber(grandTotal);
};
