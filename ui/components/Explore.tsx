import React from "react";
import useSwr from "swr";
import fetcher from "@/utils/fetcher";
import { CourseCard } from "./ui";

export interface Product {
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

const Explore = () => {
  const { data, error } = useSwr<Product[]>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/products/product_7zkx6yzauw`,
    fetcher
  );
  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className=" bg-slate-100 py-12 ">
      <div className="justify-center font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-8">
        <p>
          <span className="text-red-600">Explore</span> most
        </p>
        <p>popular courses</p>
      </div>

      <div className="relative flex items-center overflow-x-auto space-x-10 px-4 scroll-smooth scrollbar-hide">
        {data.map((product) => (
          <CourseCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
