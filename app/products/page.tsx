"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  rewardAmount: number;
  rewardPercentage: number;
  category: string;
  recyclableType: string;
  imageUrl?: string;
  active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?active=true");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">EcoRewards</h1>
          </Link>
          <nav className="flex gap-4">
            <Link href="/scan">
              <Button variant="ghost">Scan QR</Button>
            </Link>
            <Link href="/wallet">
              <Button variant="ghost">Wallet</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Available Products</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Purchase these eco-friendly products and earn rewards when you
            recycle!
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No products available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                    <Badge variant="outline" className="text-green-600">
                      {product.recyclableType}
                    </Badge>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      <strong>Earn ₹{product.rewardAmount}</strong> when you
                      recycle properly!
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                      ({product.rewardPercentage.toFixed(2)}% cashback)
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
