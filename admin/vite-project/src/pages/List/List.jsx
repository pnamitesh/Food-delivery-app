import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  // const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food removed");
        await fetchlist();
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className='list add flex-col'>
      <h2>All Foods List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((food, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${food.image}`} alt={food.name} />
            <p>{food.name}</p>
            <p>{food.category}</p>
            <p>{food.price}</p>
            <p onClick={() => removeFood(food._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
