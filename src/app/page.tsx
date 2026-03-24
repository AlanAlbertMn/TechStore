'use client';

import { motion } from "framer-motion";
import { ShoppingCart, User, Search, Star, X } from "lucide-react";
import { useState } from "react";
import {amazonData} from '../../assets/amazonData.js';
import Image from "next/image.js";
import { Product } from "@/types/Product.js";
import Navbar from "@/components/navbar.js";
import Products from "./Products/page.js";


export default function Ecommerce() {
  
  const products: Product[] = amazonData;

  // const addToCart = (product: Product) => {
  //   setCart([...cart, product]);
  // };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen">
      <Navbar />
      {/* HERO */}
      <section className="pt-64 mb-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6"
        >
          Discover the Future of Tech
        </motion.h1>

        <p className="text-slate-400 mb-8">
          Latest gadgets curated for you
        </p>

        <button className="bg-blue-500 px-6 py-3 rounded-2xl">
          Shop Now
        </button>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto py-16">
        <h2 className="text-3xl mb-10">Products</h2>

        <div className="grid md:grid-cols-5 gap-6">
          <Products products={products} />
        </div>
      </section>

     

      {/* FOOTER */}
      <footer className="text-center text-slate-500 py-10 border-t border-slate-800">
        © 2026 TechStore
      </footer>
    </div>
  );
}