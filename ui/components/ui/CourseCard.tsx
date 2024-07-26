"use client";
import React from "react";
import { Product } from "../Explore";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CourseCardProps {
  product: Product;
}

const CourseCard: React.FC<CourseCardProps> = ({ product }) => {
  let picn = `/coursepic-${Math.floor(Math.random() * (4 - 1) + 1)}.png`;
  const router = useRouter();
  const handleSubmit = () => {
    const encodedProduct = encodeURIComponent(JSON.stringify(product));
    router.push(`/coursePage?product=${encodedProduct}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-visible min-w-96   p-4">
      <img
        src={picn}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Provider"
            className="h-6 w-6 mr-2"
          />
          <span className="font-semibold text-lg">{product.title}</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          {product.description.length > 50
            ? `${product.description.substring(0, 50)}...`
            : product.description}
          <button onClick={() => handleSubmit()}>
            <span className="text-blue-500 cursor-pointer">Read more</span>
          </button>
        </p>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <span className="text-sm">
            <i className="fas fa-signal mr-1"></i>
            {product.level} level
          </span>
          <span className="text-sm">
            <i className="fas fa-clock mr-1"></i>
            {product.duration} Months
          </span>
          <span className="text-sm">
            <i className="fas fa-certificate mr-1"></i>Professional Certificate
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-yellow-500 font-semibold text-sm">
            <i className="fas fa-star mr-1"></i>
            {product.stars} star
          </span>
          <span className="text-blue-500 font-semibold text-lg">
            ₹{product.price}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button className="text-red-500 hover:text-red-700 focus:outline-none">
            <i className="fas fa-heart"></i>
          </button>
          <div className="items-center">By {product.courseProvider}</div>
          <button
            onClick={() => handleSubmit()}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
