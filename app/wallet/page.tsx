"use client";

import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Recycle, Wallet, TrendingUp } from "lucide-react";
import { DEMO_USER_ID } from "@/lib/demoConfig";

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
  metadata?: {
    productName?: string;
    binLocation?: string;
  };
}

export default function WalletPage() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      // Mock user ID for demo
      const response = await fetch(`/api/rewards?userId=${DEMO_USER_ID}`);
      const data = await response.json();

      setWalletBalance(data.walletBalance || 0);
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">EcoRewards</h1>
          </Link>
          <nav className="flex gap-4">
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/scan">
              <Button variant="ghost">Scan QR</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">My Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your eco-rewards and transaction history
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ₹{walletBalance.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Available for withdrawal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Recycled
              </CardTitle>
              <Recycle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{transactions.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Items disposed responsibly
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earned
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ₹
                {transactions
                  .reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0)
                  .toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Lifetime rewards
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent eco-rewards activity</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-gray-600">
                Loading transactions...
              </p>
            ) : transactions.length === 0 ? (
              <p className="text-center py-8 text-gray-600">
                No transactions yet. Start recycling to earn rewards!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="text-sm">
                        {formatDate(transaction.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          {transaction.metadata?.productName && (
                            <p className="text-xs text-gray-600">
                              {transaction.metadata.productName}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.type === "reward"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            transaction.amount > 0
                              ? "text-green-600 font-semibold"
                              : "text-red-600"
                          }
                        >
                          {transaction.amount > 0 ? "+" : ""}₹
                          {transaction.amount.toFixed(2)}
                        </span>
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
