import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recycle, Leaf, Coins, QrCode } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">EcoRewards</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/scan">
              <Button variant="ghost">Scan QR</Button>
            </Link>
            <Link href="/wallet">
              <Button variant="ghost">Wallet</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Get Rewarded for{" "}
            <span className="text-green-600">Sustainable Choices</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Buy recyclable products, dispose them responsibly, and earn cashback
            rewards. Make a difference while earning money!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Browse Products
              </Button>
            </Link>
            <Link href="/scan">
              <Button size="lg" variant="outline">
                <QrCode className="mr-2 h-5 w-5" />
                Scan & Earn
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <CardTitle>Purchase Products</CardTitle>
              <CardDescription>
                Buy eco-friendly products from our marketplace. For example, a
                drink for ₹95.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <CardTitle>Use & Dispose Responsibly</CardTitle>
              <CardDescription>
                After using the product, find a designated recycling bin and
                scan the QR code.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <CardTitle>Earn Rewards</CardTitle>
              <CardDescription>
                Get instant cashback (e.g., ₹5) credited to your wallet for
                proper recycling!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-green-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose EcoRewards?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">
                Environmental Impact
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Contribute to a cleaner planet by ensuring proper waste
                segregation
              </p>
            </div>
            <div className="text-center">
              <Coins className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Earn Money</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Get rewarded with real cashback for every responsible disposal
              </p>
            </div>
            <div className="text-center">
              <QrCode className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Easy & Quick</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Simple QR code scanning process takes just seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 EcoRewards. Making sustainability profitable.</p>
        </div>
      </footer>
    </div>
  );
}
