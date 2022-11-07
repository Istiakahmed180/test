import React from "react";
import { Link } from "react-router-dom";

const ProductsCard = ({ product }) => {
  const { img, title, _id } = product;
  return (
    <div>
      <div className="card w-96 bg-base-100  image-full mx-auto">
        <figure>
          <img src={img} alt="Shoes" className="" />
        </figure>
        <div className="card-body">
          <p>{title}</p>
          <div className="card-actions justify-end">
            <Link to={`/addproduct/${_id}`}>
              <button className="btn btn-primary">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
