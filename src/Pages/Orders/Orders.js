import React, { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../ContextProvider/ContextProvider";
import OrdersDetails from "./OrdersDetails";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthProvider);

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      `are you sure you want to delete this order`
    );
    if (proceed) {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount) {
            alert("Deleted Successfully");
            const remaining = orders.filter((order) => order._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-orange-500 text-center font-bold">
        Your Order:{orders.length}
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrdersDetails
                key={order._id}
                order={order}
                handleDelete={handleDelete}
              ></OrdersDetails>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
