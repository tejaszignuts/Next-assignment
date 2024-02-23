"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { DUMMY_API } from "../config/config";
import axios from "axios";
import Loading from "../components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const page = () => {
  const [products, setProducts] = useState(null);
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`${DUMMY_API}products`);
      setProducts(response.data.products);
    };
    getProducts();
  }, []);

  if (!user.email) {
    router.push("/login");
  }

  if (products) {
    return (
      <div>
        <Navbar />
        <div>
          <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 pt-48 mb-5">
            {products.map((item) => {
              return (
                <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                  <Link href={`/product/${item.id}`}>
                    <img
                      src={item.thumbnail}
                      alt="Product"
                      class="h-80 w-72 object-cover rounded-t-xl"
                    />
                    <div class="px-4 py-3 w-72">
                      <p class="text-lg font-bold text-black truncate block capitalize">
                        {item.title}
                      </p>
                      <p class="text-md  text-black truncate block capitalize">
                        {item.category}
                      </p>
                      <p class="text-md  text-black truncate block capitalize">
                        {item.rating}
                      </p>
                      <div class="flex justify-between items-center">
                        <p class="text-md font-semibold text-black cursor-auto my-3">
                          ${item.price}
                        </p>
                        <p class="text-md font-semibold text-black cursor-auto my-3">
                          -{item.discountPercentage}%
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default page;
