import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthProvider } from "../../ContextProvider/ContextProvider";

const AddProducts = () => {
  const { user } = useContext(AuthProvider);
  const product = useLoaderData();
  const { title, _id } = product;
  console.log(product);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const phone = form.phone.value;
    const email = user?.email || "UnRegistered";
    const message = form.messageText.value;

    const order = {
      service: _id,
      serviceName: title,
      customer: name,
      email,
      phone,
      message,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Your Order Placed Now");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h1 className="text-2xl text-center my-10 text-orange-600 font-bold">
        {title.slice(0, 27)}
      </h1>
      <div className="grid grid-cols-2 gap-5">
        <input
          type="text"
          name="firstName"
          placeholder="Type First Name"
          className="input input-bordered input-success w-full max-w-xs mx-auto"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Type Last Name"
          className="input input-bordered input-success w-full max-w-xs mx-auto"
        />
        <input
          type="text"
          name="phone"
          placeholder="Type Phone Number"
          className="input input-bordered input-success w-full max-w-xs mx-auto"
        />
        <input
          type="email"
          name="email"
          placeholder="Type Email"
          className="input input-bordered input-success w-full max-w-xs mx-auto"
          readOnly
          defaultValue={user?.email}
        />
      </div>
      <div className="my-5 text-center">
        <textarea
          className="textarea textarea-secondary py-8 w-1/2 mx-auto "
          name="messageText"
          placeholder="Bio"
        ></textarea>
      </div>
      <div className="flex justify-center my-5">
        <button type="submit" className="btn btn-outline btn-secondary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddProducts;
