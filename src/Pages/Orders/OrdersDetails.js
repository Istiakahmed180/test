import React, { useEffect, useState } from "react";

const OrdersDetails = ({ order, handleDelete }) => {
  const [serviceImg, setServiceImg] = useState("");
  console.log(serviceImg);
  const { serviceName, customer, email, phone, message, service, _id } = order;

  useEffect(() => {
    fetch(`http://localhost:5000/products/${service}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServiceImg(data);
      });
  }, [service]);

  return (
    <div>
      <tr>
        <th>
          <button onClick={() => handleDelete(_id)} className="btn btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                {serviceImg?.img && (
                  <>
                    <img
                      src={serviceImg?.img}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="font-bold">{customer}</div>
              <div className="text-sm opacity-50">{phone}</div>
            </div>
          </div>
        </td>
        <td>
          {email}
          <br />
          <span className="badge badge-ghost badge-sm">{serviceName}</span>
        </td>
        <td>{message}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </div>
  );
};

export default OrdersDetails;
