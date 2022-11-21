const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

const url = `https://henrymedia.dk/copenhagen-cartel-backend/wp-json/wp/v2/product?_embed&include=${id}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => handleProductList(data));

// Just checking
function handleProductList(data) {
  console.log(data);
  data.forEach(showProduct);
}

function showProduct(product) {
  //Selecting template and cloning
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  const colors = product._embedded["wp:term"][0];
  // Change stuff
  clone.querySelector("h2").textContent = product.title.rendered;
  clone.querySelector(".price-single span").textContent = product.price;
  // color
  colors.forEach((color) => {
    const liEl = document.createElement("li");
    liEl.style.backgroundColor = color.slug;
    console.log("testing", liEl);
    clone.querySelector(".colour-single ul").appendChild(liEl);
  });
  //stock
  clone.querySelector(".inStock-single span").textContent = product.stock;

  clone.querySelector("p.details").textContent = product.details;
  clone.querySelector("img").src =
    product._embedded[
      "wp:featuredmedia"
    ][0].media_details.sizes.medium_large.source_url;
  //Selection where i want the clone
  const parent = document.querySelector("main .product-feed");
  //Appending it
  parent.appendChild(clone);
}
