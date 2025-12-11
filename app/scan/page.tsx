"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Recycle, Camera, CheckCircle2 } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { DEMO_PRODUCT_ID, DEMO_USER_ID } from "@/lib/demoConfig";

interface BinInfo {
  binId: string;
  location: {
    name: string;
  };
  acceptedTypes: string[];
}

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [binInfo, setBinInfo] = useState<BinInfo | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [error, setError] = useState("");

  const startScanning = async () => {
    setScanning(true);
    setError("");

    try {
      const html5QrCode = new Html5Qrcode("reader");

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // Stop scanning
          await html5QrCode.stop();
          setScanning(false);

          // Verify bin
          await verifyBin(decodedText);
        },
        () => {
          // Ignore scan errors (happens continuously)
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      setError("Failed to start camera. Please check permissions.");
      setScanning(false);
    }
  };

  const verifyBin = async (binId: string) => {
    try {
      const response = await fetch("/api/scan/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binId }),
      });

      if (response.ok) {
        const data = await response.json();
        setBinInfo(data.bin);
      } else {
        setError("Invalid QR code or bin not found");
      }
    } catch {
      setError("Error verifying bin");
    }
  };

  const processDisposal = async (productId: string) => {
    if (!binInfo) return;

    try {
      // Mock user ID for demo - in production, get from auth
      const userId = DEMO_USER_ID;

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binId: binInfo.binId,
          productId,
          userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRewardAmount(data.reward);
        setShowSuccess(true);
        setBinInfo(null);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch {
      setError("Error processing disposal");
    }
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
            <Link href="/wallet">
              <Button variant="ghost">Wallet</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Scan Recycling Bin</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Scan the QR code on the recycling bin to verify proper disposal and
            earn rewards
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>QR Code Scanner</CardTitle>
            <CardDescription>
              Point your camera at the bin&apos;s QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!scanning && (
                <Button
                  onClick={startScanning}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Camera
                </Button>
              )}

              <div
                id="reader"
                className={
                  scanning ? "border-2 border-green-600 rounded-lg" : ""
                }
              ></div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bin Info Dialog */}
        <Dialog open={!!binInfo} onOpenChange={() => setBinInfo(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bin Verified</DialogTitle>
              <DialogDescription>
                Location: {binInfo?.location.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Accepted Materials:</h4>
                <div className="flex flex-wrap gap-2">
                  {binInfo?.acceptedTypes.map((type: string) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select the product you&apos;re disposing (this would be a
                dropdown in production)
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBinInfo(null)}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => processDisposal(DEMO_PRODUCT_ID)}
              >
                Confirm Disposal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <DialogTitle className="text-center">Reward Earned!</DialogTitle>
              <DialogDescription className="text-center">
                Congratulations! You&apos;ve successfully disposed your item
                responsibly.
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-green-600">
                ₹{rewardAmount}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                has been credited to your wallet
              </p>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => setShowSuccess(false)}
              >
                Great!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
