"use client";
import Loading from "@/app/components/Loading";
import Navbar from "@/app/components/Navbar";
import { DUMMY_API } from "@/app/config/config";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const getProductData = async () => {
      const response = await axios.get(`${DUMMY_API}products/${id}`);
      setProduct(response.data);
    };
    getProductData();
  }, []);

  if (!user.email) {
    router.push("/login");
  }
  if (product) {
    return (
      <div>
        <Navbar />
        <div className=" pt-48  ">
          <div className=" rounded-md lg:w-2/3 mx-auto flex gap-10 justify-center flex-col items-center px-10 py-3 lg:py-10 lg:px-5 border-2 border-white lg:flex-row">
            <div className="lg:w-1/2 w-full">
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                  <img src={product.images[0]} alt="..." />
                  <img src={product.images[1]} alt="..." />
                  <img src={product.images[2]} alt="..." />
                </Carousel>
              </div>
            </div>
            <div className="lg:w-1/2 w-full px-10">
              <div class="px-4 py-3  bg-white">
                <p class="text-lg font-bold text-black truncate block capitalize">
                  {product.title}
                </p>
                <p class="text-md  text-black truncate block capitalize">
                  {product.brand}
                </p>
                <p class="text-md  text-black truncate block capitalize">
                  {product.description}
                </p>
                <p class="text-md  text-black truncate block capitalize">
                  category : {product.category}
                </p>
                <p class="text-md  text-black truncate block capitalize">
                  stock : {product.stock}
                </p>

                <p class="text-md font-semibold text-black cursor-auto my-1">
                  price : ${product.price}
                </p>
                <p class="text-md font-semibold text-black cursor-auto my-1">
                  -{product.discountPercentage}%
                </p>
                <p class="text-md font-semibold text-black cursor-auto my-1">
                  {product.rating}⭐
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default page;
