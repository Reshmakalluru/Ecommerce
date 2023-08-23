//https://fakestoreapi.com/products
//function for fetching the different products api data

let cartItems = [];

document.addEventListener("DOMContentLoaded", () => {
  cartItemsPresent = localStorage.getItem("cartitems");
  if (cartItemsPresent) {
    cartItems = JSON.parse(cartItemsPresent);
    updateCart();
    updateCartTotal();
    increaseQuantity();
  }
});



async function fetchProducts(url){
    try{
        //fetch method used for fetching the different apis or make the requirement
        const response= await fetch(url);
        console.log(response);
        //check if url response is successful
        if(!response.ok){
            throw new Error("Response is not ok");
        }
        //parse the response body as JSON
        return await response.json();
    }catch(error){
        //throw error if any error occured
        throw new Error("Error fetching the data: "+error.message);
    }
}

//function to display the fetched data
async function Display(){
    try{
        const Electronics=fetchProducts(
            "https://fakestoreapi.com/products/category/electronics"
        );

        const Jewelery=fetchProducts(
            "https://fakestoreapi.com/products/category/jewelery"
        );

        const Mens=fetchProducts(
            "https://fakestoreapi.com/products/category/men's clothing"
        );

        const Womens=fetchProducts(
            "https://fakestoreapi.com/products/category/women's clothing"
        );

        //wait for all data be fetched
        const [data1, data2, data3, data4]= await Promise.all([
            Electronics,
            Jewelery,
            Mens,
            Womens,
        ]);

        //Limit each category to 18 items
        const electronicsDataLimited=data1.slice(0,18);
        const jeweleryDataLimited=data2.slice(0,18);
        const mensDataLimited=data3.slice(0,18);
        const womensDataLimited=data4.slice(0,18);

        //access the elements where want to display the data
        const product1=document.getElementById("electronics-data");
        const product2=document.getElementById("jewelery-data");
        const product3=document.getElementById("mens-data");
        const product4=document.getElementById("womens-data");

        //create the HTML elements and papulate with data
        const ElectronicsDiv=Createproductlist(electronicsDataLimited);
        const JeweleryDiv=Createproductlist(jeweleryDataLimited);
        const MensDiv=Createproductlist(mensDataLimited);
        const WomensDiv=Createproductlist(womensDataLimited);

        //append the elements to data display data
        product1.appendChild(ElectronicsDiv);
        product2.appendChild(JeweleryDiv);
        product3.appendChild(MensDiv);
        product4.appendChild(WomensDiv);

        
    }catch(error){
        //handle the data and display it in ui
        const Errdisplay=document.getElementById("errorDisplay");
        Errdisplay.textContent="Error:"+error.message;
        console.error(error);
    }
}

    //helper function to create the list of products
    function Createproductlist(products){
        const divele=document.createElement('div');
        products.map((items)=>{
            const CardDiv=document.createElement('div');
            CardDiv.className='card';
            CardDiv.innerHTML=`<img src=${items.image} alt=${items.title}/>
            <h3>${items.title}</h3>
            <p>${items.price}</p>
            <button class='add-to-cart'>Add to cart</button>
            `;

            //add event listener for "add to cart" buttons
            const addToCartButton=CardDiv.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', ()=>handleAddToCart(items)); //pass the item to handleAddCart()

            divele.appendChild(CardDiv);
        });
        return divele;
    }

    function handleAddToCart(item){
        //your cart handling logic here
        addToCart(item);
        console.log('Add to cart:',item);
        localStorage.setItem("cartitems", JSON.stringify(cartItems));
    }

    //cart items array to store the added products
   

    document.addEventListener("DOMContentLoaded", () => {
        cartItemsPresent = localStorage.getItem("cartitems");
        if (cartItemsPresent) {
          cartItems = JSON.parse(cartItemsPresent);
        
        updateCart();
        updateCartTotal();
        increaseQuantity();
    }

    })

    //function to add the product to the cart
    function addToCart(product){
        const existingItem=cartItems.find(item=> item.id===product.id);
        if(existingItem){
            //if the product is already in the cart, increase the quantity
            existingItem.quantity++;
        }
        else{
            //if the product is not in the cart, add it with quantity 1
            cartItems.push({...product, quantity: 1});
        }
        updateCart();
        increaseQuantity();

        localStorage.setItem("cartitems", JSON.stringify(cartItems));
    }
    

//function to display cart items in ui
function displayCartItem(product){
    const cartList=document.getElementById('cartList');
    const cartItem=document.createElement('div');
    cartItem.className='cart-item';
    cartItem.innerHTML=`
        <img src=${product.image} alt=${product.title}/>
        <div class="content">
            <h3>${product.title}</h3>
            <p>Quantity:${product.quantity}</p>
            <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
            <button class="remove-button">Remove</button>
        </div>
    `;

    //add event listener for "remove" button
    const removeButton=cartItem.querySelector('.remove-button');
    removeButton.addEventListener('click', ()=> handleRemoveFromCart(product));
    cartList.appendChild(cartItem);
}

// let openShopping=document.querySelector(".cart_icon");
// openShopping.addEventListener('click', ()=>{
//     body.cartList.add('active');
// })

// let closeShopping=document.querySelector('.closeShopping');
// closeShopping.addEventListener('click', ()=>{
//     body.cartList.remove('active');
// })
// openShopping.addEventListener('click',displayCartItem);

let spanele=document.querySelector('.qnt');
// addToCartButton.addEventListener('click',increaseQuantity)
function increaseQuantity(){
    const itemCount = cartItems.reduce((total,item)=>total+item.quantity,0);
    spanele.textContent = itemCount;
}

// var cart=document.getElementsByClassName("cart_icon");
// var select=document.querySelector('.select');
// var button=document.getElementsByClassName("add-to-cart");
// for(but of button){
//     but.addEventListener('click',(e)=>{
//         var add=Number(cart.getAttribute('data-count')||0);
//         cart.setAttribute('data-count', add+1);
//         cart.cartList.add('zero');

//         var parent=e.target.parentNode;
//         var clone=parent.closeNode(true);
//         select.appendChild(clone);
//         clone.lastElementChile.innertext="Buy-now";
//         if(clone){
//             cart.onclick=()=>{
//                 select.classList.toggle('display');
//             }
//         }
        
//     })

// }

//function to remove
function handleRemoveFromCart(item){
    //find the index of the item in the cartItems array
    const index=cartItems.findIndex(cartItem=>cartItem.id===item.id);
    const existingItem = cartItems[index];
    // If the item quantity is greater than 1, reduce the quantity
    if (existingItem.quantity > 1) {
      existingItem.quantity--;
    } 
    else {
      // If the item quantity is 1 or less, remove it from the cartItems array
      cartItems.splice(index, 1);
    }
    
    updateCart(); //update the cart display after removal
    increaseQuantity();
    
    localStorage.setItem("cartitems", JSON.stringify(cartItems)); 

}

function updateCart(){
    //clear the cart list before displaying the updated items
    const cartList=document.getElementById('cartList');
    cartList.innerHTML='';

    //display each item in the cart
    cartItems.forEach(item=>{
        displayCartItem(item);
    });

    //update the cart total
    updateCartTotal();
    increaseQuantity();
    
   
}

//function to update the cart total
function updateCartTotal(){
    const totalElement=document.getElementById('total');
    const total=cartItems.reduce((sum,item)=>sum+item.price,0);
    totalElement.textContent=`Total: $${total.toFixed(2)}`;
   
}

//cart functionality
let cartlist=document.querySelector(".cart_icon");
cartlist.addEventListener("click",()=>{
    body.cartList.add('active');
});


Display();

var myIndex=0;
carousel();
function carousel(){
    var i;
    var x=document.getElementsByClassName("mySlides");
    for(i=0;i<x.length;i++){
        x[i].style.display="none";
    }
    myIndex++;
    if(myIndex>x.length){
        myIndex=1
    }
    x[myIndex-1].style.display="block";
    setTimeout(carousel,3000);
}