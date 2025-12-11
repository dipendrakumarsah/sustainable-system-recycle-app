"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Recycle, Plus, Download } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  rewardAmount: number;
  category: string;
  recyclableType: string;
}

interface Bin {
  _id: string;
  binId: string;
  location: {
    name: string;
    address: string;
  };
  acceptedTypes: string[];
  qrCode: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bins, setBins] = useState<Bin[]>([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showBinDialog, setShowBinDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    rewardAmount: 0,
    category: "beverage",
    recyclableType: "plastic",
  });
  const [newBin, setNewBin] = useState({
    locationName: "",
    locationAddress: "",
    acceptedTypes: [] as string[],
  });

  const fetchProducts = async () => {
    const response = await fetch("/api/admin?type=products");
    const data = await response.json();
    setProducts(data.products || []);
  };

  const fetchBins = async () => {
    const response = await fetch("/api/admin?type=bins");
    const data = await response.json();
    setBins(data.bins || []);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      await fetchBins();
    };
    void loadData();
  }, []);

  const createProduct = async () => {
    const rewardPercentage = (newProduct.rewardAmount / newProduct.price) * 100;

    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "product",
        data: {
          ...newProduct,
          rewardPercentage,
        },
      }),
    });

    setShowProductDialog(false);
    fetchProducts();
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      rewardAmount: 0,
      category: "beverage",
      recyclableType: "plastic",
    });
  };

  const createBin = async () => {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "bin",
        data: {
          location: {
            name: newBin.locationName,
            address: newBin.locationAddress,
          },
          acceptedTypes: newBin.acceptedTypes,
        },
      }),
    });

    setShowBinDialog(false);
    fetchBins();
    setNewBin({
      locationName: "",
      locationAddress: "",
      acceptedTypes: [],
    });
  };

  const downloadQRCode = (bin: Bin) => {
    const link = document.createElement("a");
    link.download = `bin-${bin.binId}.png`;
    link.href = bin.qrCode;
    link.click();
  };

  const toggleAcceptedType = (type: string) => {
    setNewBin((prev) => ({
      ...prev,
      acceptedTypes: prev.acceptedTypes.includes(type)
        ? prev.acceptedTypes.filter((t) => t !== type)
        : [...prev.acceptedTypes, type],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">
              EcoRewards Admin
            </h1>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage products, bins, and view analytics
          </p>
        </div>

        {/* Products Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage recyclable products and rewards
                </CardDescription>
              </div>
              <Dialog
                open={showProductDialog}
                onOpenChange={setShowProductDialog}
              >
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Create a new recyclable product with reward information
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        placeholder="e.g., Eco Drink Bottle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        placeholder="Product description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="reward">Reward Amount (₹)</Label>
                        <Input
                          id="reward"
                          type="number"
                          value={newProduct.rewardAmount}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              rewardAmount: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="recyclableType">Recyclable Type</Label>
                      <select
                        id="recyclableType"
                        value={newProduct.recyclableType}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            recyclableType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="plastic">Plastic</option>
                        <option value="glass">Glass</option>
                        <option value="metal">Metal</option>
                        <option value="paper">Paper</option>
                        <option value="organic">Organic</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowProductDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={createProduct}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Create Product
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-center py-8 text-gray-600">
                No products yet. Add your first product!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell className="text-green-600">
                        ₹{product.rewardAmount}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {product.recyclableType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{product.category}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Bins Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recycling Bins</CardTitle>
                <CardDescription>
                  Manage bin locations and QR codes
                </CardDescription>
              </div>
              <Dialog open={showBinDialog} onOpenChange={setShowBinDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Bin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Register New Bin</DialogTitle>
                    <DialogDescription>
                      Create a new recycling bin with QR code
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="locationName">Location Name</Label>
                      <Input
                        id="locationName"
                        value={newBin.locationName}
                        onChange={(e) =>
                          setNewBin({ ...newBin, locationName: e.target.value })
                        }
                        placeholder="e.g., Central Park Entrance"
                      />
                    </div>
                    <div>
                      <Label htmlFor="locationAddress">Address</Label>
                      <Input
                        id="locationAddress"
                        value={newBin.locationAddress}
                        onChange={(e) =>
                          setNewBin({
                            ...newBin,
                            locationAddress: e.target.value,
                          })
                        }
                        placeholder="Full address"
                      />
                    </div>
                    <div>
                      <Label>Accepted Material Types</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["plastic", "glass", "metal", "paper", "organic"].map(
                          (type) => (
                            <Button
                              key={type}
                              type="button"
                              variant={
                                newBin.acceptedTypes.includes(type)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => toggleAcceptedType(type)}
                            >
                              {type}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowBinDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={createBin}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Create Bin
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {bins.length === 0 ? (
              <p className="text-center py-8 text-gray-600">
                No bins registered yet. Add your first bin!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bin ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Accepted Types</TableHead>
                    <TableHead>QR Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bins.map((bin) => (
                    <TableRow key={bin._id}>
                      <TableCell className="font-mono text-sm">
                        {bin.binId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{bin.location.name}</p>
                          <p className="text-sm text-gray-600">
                            {bin.location.address}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {bin.acceptedTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="secondary"
                              className="text-xs"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadQRCode(bin)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
