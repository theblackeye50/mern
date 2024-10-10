import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import iphone from "../assets/iphone.jpeg"; // Unused import, can be removed if not needed

function Card() {

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
  
  let total_price=0;
  if(data.length > 0)
  {
    data.forEach((item)=>{
      total_price=total_price+item.price
    })
  }


  return (
    <div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className='items'>
            <img src={item.image} alt={item.name} />
            <div className='details'>
              <div className='name'>
                <h4>{item.name}</h4>
                <p>{item.color}</p>
              </div>
              <div className='price'>${item.price}</div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Card;
