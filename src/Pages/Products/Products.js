import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductsCard from "./ProductsCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  useEffect(() => {
    const uri = `http://localhost:5000/products?page=${page}&size=${size}`;
    fetch(uri)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);

  const pages = Math.ceil(count / size);

  return (
    <div>
      <h1 className="text-center text-yellow-500 font-bold text-2xl">
        All Products:{products.length}
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product}></ProductsCard>
        ))}
      </div>
      <div>
        <h1>
          selected page:{page} and size:{size}
        </h1>
        {[...Array(pages).keys()].map((number) => (
          <button key={number} onClick={() => setPage(number)} className="btn">
            {number}
          </button>
        ))}
        <select
          name=""
          id=""
          className="border border-amber-400"
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="5" selected>
            5
          </option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};

export default Products;
