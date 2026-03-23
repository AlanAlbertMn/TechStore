'use client';

import { motion } from "framer-motion";
import { ShoppingCart, User, Search, Star, X } from "lucide-react";
import { useState } from "react";
import {amazonData} from '../../assets/amazonData.js';
import Image from "next/image.js";
type Product = {
      asin: string | undefined | null,
      product_title: string | undefined | null,
      product_price: string | undefined | null,
      product_original_price: string | undefined | null,
      currency: string | undefined | null,
      product_star_rating: string | undefined | null,
      product_num_ratings: number | undefined | null,
      product_url: string | undefined | null,
      product_photo: string | undefined | null,
      product_num_offers: number | undefined | null,
      product_minimum_offer_price: string | undefined | null,
      is_best_seller: boolean | undefined | null,
      is_amazon_choice: boolean | undefined | null,
      is_prime: boolean | undefined | null,
      climate_pledge_friendly: boolean | undefined | null,
      sales_volume: string | undefined | null,
      delivery: string | undefined | null,
      coupon_text?: string | undefined | null,
      has_variations: boolean | undefined | null,
    }

export default function Ecommerce() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const products = amazonData[0].data.products;

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-slate-950/70 backdrop-blur border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-lg">TechStore</h1>

          <div className="hidden md:flex gap-6 items-center">
            <div className="flex items-center bg-slate-900 px-3 py-2 rounded-xl">
              <Search size={16} />
              <input
                className="bg-transparent ml-2 outline-none text-sm"
                placeholder="Buscar..."
              />
            </div>

            <button onClick={() => setCartOpen(true)}>
              <ShoppingCart />
            </button>

            <User />
          </div>
        </div>
      </nav>

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
          {products.map((product) => (
            <motion.div
              key={product.asin}
              whileHover={{ y: -8 }}
              className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
            >
              <Image
                src={product.product_photo}
                alt={product.product_title}
                height={300}
                width={300}
                className="rounded-xl mb-4 size-full max-h-36"
              />

              <h3 className="font-semibold">{`${product.product_title.substring(0, 30).trim()}...`}</h3>

              <p className="text-blue-400">{product.product_price}</p>

              <div className="flex items-center mb-3">
                <p className="mr-1">{product.product_star_rating}</p>
                {[...Array(parseInt(product.product_star_rating))].map((_, i) => 
                    <Star key={i} size={14} color="yellow"/>
                )}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 py-2 rounded-xl"
              >
                Add to cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-slate-900 p-6">
            <div className="flex justify-between mb-6">
              <h2>Cart</h2>
              <button onClick={() => setCartOpen(false)}>
                <X />
              </button>
            </div>

            {cart.length === 0 && <p>No items</p>}

            {cart.map((item, i) => (
              <div key={i} className="mb-4">
                <p>{item.product_title}</p>
                <p className="text-sm text-slate-400">{item.product_price}</p>
              </div>
            ))}

            <button className="mt-6 w-full bg-blue-500 py-3 rounded-xl">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center text-slate-500 py-10 border-t border-slate-800">
        © 2026 TechStore
      </footer>
    </div>
  );
}