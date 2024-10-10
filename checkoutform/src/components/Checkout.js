import { useState,useEffect} from "react";
import axios from   "axios";
import React from "react";
import "./Checkout.css";
import Card from "./Card";

function Checkout() {
  
  const [credential, setcredential]=useState({
    name:"",
    Email:"",
    country:"",
    pincode:""
  });

   const onchange = (e)=>{
    setcredential({...credential,[e.target.name]:e.target.value});
   }

    
   const handlesubmit = async (e) => {
    e.preventDefault();  // Prevents the default form submission behavior
  
    try {
      
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',  // Use 'POST' as a string
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({
          name: credential.name,
          Email: credential.Email,
          country: credential.country,
          pincode: credential.pincode
        })
      });
  
      // Parse the JSON response
      const resp = await response.json();
      console.log("Response data:", resp);
  
      // Check for success and show appropriate message
      if (response.ok && resp.success) {  // Use 'resp' instead of 'json'
        alert("Order is placed");
      } else {
        alert(resp.error || "Failed to create account. Please check your credentials.");
      }
  
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error occurred while sending:", error.message);
      alert("An error occurred while creating your account. Please try again.");
    }
  };
  



  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        // Assuming the actual data is in response.data
        setData(response.data);
        console.log(response.data);  // Check the data structure here
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  
  let total_price = 0;
  if (data.length > 0) {
    data.forEach((item) => {
      total_price += parseInt(item.price, 10);  
    });
  }

  let tax=(total_price*10)/100;

  let checkout_price=total_price+tax

  return (
    <>
      <h1>Checkout</h1>
      <div className="container">
        <div className="item-details">
          <div className="product">
            <Card />
          </div>

          <div className="line"></div>
          <div className="cashout">
            <div className="coupon">
              <input type="text" placeholder="Enter coupon code" />
              <button>Apply coupon</button>
            </div>
            <div className="checkout-price">
              <div>
                <span>subtotal</span>
                <span>${total_price}</span>
              </div>
              <div>
                <span>tax</span>
                <span>${tax}</span>
              </div>
              <div>
                <span>total</span>
                <span>${checkout_price}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-detail">
          <h4> contact information</h4>
          <div className="form">
            <form onSubmit={handlesubmit}>
              <label htmlFor="FullName">Full Name</label>
              <input type="text" id="FullName" name="name" value={credential.name}  onChange={onchange}/>

              <label htmlFor="Email">Email</label>
              <input type="text" id="Email" name="Email" value={credential.Email} onChange={onchange}/>

              <div className="location">
                <div className="field">
                  <label htmlFor="Country">Country</label>
                  <input type="text" id="Country" name="country"  value={credential.country} onChange={onchange}/>
                </div>

                <div className="field">
                  <label htmlFor="Pincode">Pincode</label>
                  <input type="text" id="Pincode" name="pincode"  value={credential.pincode} onChange={onchange}/>
                </div>
              </div>
            </form>
          </div>
          <button className="continue-btn" onClick={handlesubmit}>continue</button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
