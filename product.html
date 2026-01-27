<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>تفاصيل المنتج</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body { 
    margin: 0; 
    font-family: "Segoe UI", Tahoma, Arial, sans-serif; 
    background: linear-gradient(to bottom, #f9f5f0 0%, #d4af7f 20%, #d4af7f 80%, #f9f5f0 100%); 
    color: #333; 
    text-align:center; 
}

.header { 
    background: #d4af7f; 
    padding: 20px; 
    font-size: 24px; 
    font-weight: bold; 
    color: white; 
}

.product-container { 
    background: #fff8f0; 
    margin: 30px auto; 
    border-radius: 15px; 
    padding: 20px; 
    width: 90%; 
    max-width: 500px; 
    box-shadow: 0 10px 25px rgba(212,175,127,0.4); 
    display: flex; 
    flex-direction: column; 
    align-items: center;
}

.img-wrapper{
    position: relative;
    width:100%;
}

.product-img { 
    width: 100%; 
    aspect-ratio: 1 / 1;
    border-radius: 15px; 
    margin-bottom: 20px; 
    background-color: #eee; 
    background-size: contain;
    background-position: center; 
    background-repeat: no-repeat;
}

/* زر المفضلة */
.favorite-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.favorite-btn.active {
    color: red;
}

.product-name { 
    font-size: 24px; 
    font-weight: bold; 
    margin-bottom: 10px; 
    color: #8b5e3c; 
}

.product-price { 
    font-size: 20px; 
    color: #d49f5f; 
    margin-bottom: 10px; 
}

.product-store { 
    font-size: 18px; 
    color: #7b5fcf; 
    margin-bottom: 10px; 
}

.product-status { 
    font-size: 18px; 
    color: #a67c52; 
    margin-bottom: 20px; 
}

.btn-order, .btn-back { 
    padding: 12px; 
    width: 100%; 
    margin-bottom: 10px; 
    border: none; 
    border-radius: 12px; 
    font-weight: bold; 
    cursor: pointer; 
}

.btn-order { 
    background: linear-gradient(45deg, #d4af7f, #f7e1b5); 
    color: #333; 
}

.btn-back { 
    background: #f7f0e0; 
    color: #8b5e3c; 
}

@media (max-width: 600px) {
    .product-container {
        max-width: 95%;
    }
}
</style>
</head>

<body>

<div class="header">تفاصيل المنتج</div>

<div class="product-container">

    <div class="img-wrapper">
        <button class="favorite-btn" id="favBtn">♡</button>
        <div class="product-img" id="product-img"></div>
    </div>

    <div class="product-name" id="product-name"></div>
    <div class="product-price" id="product-price"></div>
    <div class="product-store" id="product-store"></div>
    <div class="product-status" id="product-status"></div>

    <button class="btn-order" id="order-btn">اطلب الآن</button>
    <button class="btn-back" onclick="window.history.back();">عودة</button>
</div>

<script src="products.js"></script>
<script>
const userName = localStorage.getItem("userName") || "مستخدم";
const userRegion = localStorage.getItem("userRegion") || "";

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('productId'));

const product = products.find(p => p.id === productId) || products[0];

document.getElementById("product-name").innerText = product.name;
document.getElementById("product-price").innerText = product.price;
document.getElementById("product-store").innerText = product.store;
document.getElementById("product-status").innerText = product.status;
document.getElementById("product-img").style.backgroundImage = `url('${product.image}')`;

/* الطلب */
document.getElementById("order-btn").onclick = () => {
    const msg =
        `الاسم: ${userName}%0A` +
        `المنطقة: ${userRegion}%0A` +
        `المنتج: ${product.name}%0A` +
        `السعر: ${product.price}%0A` +
        `المتجر: ${product.store}`;
    window.open(`https://wa.me/967774257557?text=${msg}`, '_blank');
};

/* المفضلة */
const favBtn = document.getElementById("favBtn");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function isFav(id){
    return favorites.includes(id);
}

function updateFavBtn(){
    if(isFav(product.id)){
        favBtn.innerText = "❤";
        favBtn.classList.add("active");
    }else{
        favBtn.innerText = "♡";
        favBtn.classList.remove("active");
    }
}

favBtn.onclick = (e) => {
    e.stopPropagation();
    if(isFav(product.id)){
        favorites = favorites.filter(f => f !== product.id);
    }else{
        favorites.push(product.id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavBtn();
};

updateFavBtn();
</script>

</body>
</html>
