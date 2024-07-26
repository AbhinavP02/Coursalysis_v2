"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";

interface Product {
  _id: string;
  user: string;
  title: string;
  description: string;
  price: number;
  image: string;
  duration: number;
  stars: number;
  level: string;
  courseProvider: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const CoursePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = JSON.parse(
    decodeURIComponent(searchParams.get("product") as string)
  ) as Product;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Provider"
            className="h-6 w-6 mr-2"
          />
          <span className="font-semibold text-2xl">{product.title}</span>
        </div>
        <div className="flex">
          <img
            src={`/coursepic-${Math.floor(Math.random() * (4 - 1) + 1)}.png`}
            alt={product.title}
            className="w-1/3 h-64 object-cover rounded-lg"
          />
          <div className="ml-4">
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
                <i className="fas fa-certificate mr-1"></i>Professional
                Certificate
              </span>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-yellow-500 font-semibold text-sm">
                <i className="fas fa-star mr-1"></i>
                {product.stars} star
              </span>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link
                  target="_blank"
                  href={
                    "https://www.coursera.org/professional-certificates/google-ux-design"
                  }
                >
                  Go to {product.courseProvider}
                </Link>
              </button>
              <span className="text-blue-500 font-semibold text-lg">
                ₹{product.price}
              </span>
            </div>
            <button
              onClick={() => router.back()}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              <i className="fas fa-arrow-left mr-2"></i>Back
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">What you'll learn</h2>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
            tortor non sem volutpat faucibus non eu nisl. Integer quis malesuada
            felis. Donec congue sed nibh blandit semper. Nam sagittis a sem at
            pellentesque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
