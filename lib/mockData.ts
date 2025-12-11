import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { Product, ProductInput } from "./models/Product";
import { Bin, BinInput } from "./models/Bin";
import { User, UserInput } from "./models/User";
import { Transaction } from "./models/Transaction";
import { DEMO_USER_ID, DEMO_PRODUCT_ID } from "./demoConfig";

const placeholderQr = (binId: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
    <rect width="100%" height="100%" fill="#e2e8f0"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-size="16" font-family="Arial" fill="#0f172a">${binId}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

const seededProducts: Product[] = [
  {
    _id: new ObjectId(DEMO_PRODUCT_ID),
    name: "Eco Fresh Drink",
    description: "Refreshing beverage in a recyclable plastic bottle",
    price: 95,
    rewardAmount: 5,
    rewardPercentage: 5.26,
    category: "beverage",
    recyclableType: "plastic",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("674000000000000000000002"),
    name: "Glass Water Bottle",
    description: "Premium glass bottled water",
    price: 120,
    rewardAmount: 10,
    rewardPercentage: 8.33,
    category: "beverage",
    recyclableType: "glass",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("674000000000000000000003"),
    name: "Organic Juice Can",
    description: "Aluminum can with organic juice",
    price: 85,
    rewardAmount: 6,
    rewardPercentage: 7.05,
    category: "beverage",
    recyclableType: "metal",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("674000000000000000000004"),
    name: "Eco Snack Box",
    description: "Biodegradable snack packaging",
    price: 150,
    rewardAmount: 12,
    rewardPercentage: 8,
    category: "food",
    recyclableType: "paper",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seededBins: Bin[] = [
  {
    _id: new ObjectId("684000000000000000000001"),
    binId: "BIN-DEL-001",
    location: {
      name: "Central Park, Delhi",
      address: "Gate 2, Connaught Place, New Delhi",
    },
    acceptedTypes: ["plastic", "paper"],
    qrCode: placeholderQr("BIN-DEL-001"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("684000000000000000000002"),
    binId: "BIN-MUM-002",
    location: {
      name: "Marine Drive Mall, Mumbai",
      address: "Level 3, South Wing",
    },
    acceptedTypes: ["plastic", "glass", "metal"],
    qrCode: placeholderQr("BIN-MUM-002"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("684000000000000000000003"),
    binId: "BIN-BLR-003",
    location: {
      name: "Metro Station, Bengaluru",
      address: "MG Road Metro Exit",
    },
    acceptedTypes: ["metal", "glass", "plastic"],
    qrCode: placeholderQr("BIN-BLR-003"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("684000000000000000000004"),
    binId: "BIN-PUN-004",
    location: {
      name: "University Campus, Pune",
      address: "Hostel Block Recycling Hub",
    },
    acceptedTypes: ["paper", "organic"],
    qrCode: placeholderQr("BIN-PUN-004"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seededUsers: User[] = [
  {
    _id: new ObjectId(DEMO_USER_ID),
    email: "eco.user@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "Eco Warrior",
    phone: "+91 90000 00000",
    walletBalance: 35,
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("674000000000000000000099"),
    email: "admin@ecorewards.app",
    password: bcrypt.hashSync("admin123", 10),
    name: "Program Admin",
    phone: "+91 98888 88888",
    walletBalance: 0,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seededTransactions: Transaction[] = [
  {
    _id: new ObjectId(),
    userId: new ObjectId(DEMO_USER_ID),
    productId: new ObjectId(DEMO_PRODUCT_ID),
    binId: seededBins[0]._id!,
    type: "reward",
    amount: 5,
    description: "Reward for recycling Eco Fresh Drink",
    status: "completed",
    metadata: {
      productName: "Eco Fresh Drink",
      binLocation: seededBins[0].location.name,
      recyclableType: "plastic",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

const state = {
  products: [...seededProducts],
  bins: [...seededBins],
  users: [...seededUsers],
  transactions: [...seededTransactions],
};

const wait = async (ms = 20) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const sameId = (objectId?: ObjectId, other?: string | ObjectId) => {
  if (!objectId || !other) return false;
  const first = objectId.toHexString();
  const second = typeof other === "string" ? other : other.toHexString();
  return first === second;
};

const shallowClone = <T extends object>(value: T): T => ({ ...(value as T) });

export const mockDb = {
  async listProducts(
    filter: { category?: string | null; active?: boolean | null } = {}
  ) {
    await wait();
    return state.products
      .filter((product) => {
        if (filter.category && product.category !== filter.category) {
          return false;
        }
        if (
          typeof filter.active === "boolean" &&
          product.active !== filter.active
        ) {
          return false;
        }
        return true;
      })
      .map((product) => shallowClone(product));
  },

  async getProductById(id: string) {
    await wait();
    const product = state.products.find((item) => sameId(item._id, id));
    return product ? shallowClone(product) : null;
  },

  async createProduct(data: ProductInput) {
    await wait();
    const product: Product = {
      _id: new ObjectId(),
      ...data,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    state.products.unshift(product);
    return shallowClone(product);
  },

  async updateProduct(id: string, updates: Partial<ProductInput>) {
    await wait();
    const product = state.products.find((item) => sameId(item._id, id));
    if (!product) return null;
    Object.assign(product, updates, { updatedAt: new Date() });
    return shallowClone(product);
  },

  async deleteProduct(id: string) {
    await wait();
    const index = state.products.findIndex((item) => sameId(item._id, id));
    if (index >= 0) {
      state.products.splice(index, 1);
      return true;
    }
    return false;
  },

  async listBins() {
    await wait();
    return state.bins.map((bin) => shallowClone(bin));
  },

  async getBinById(id: string) {
    await wait();
    const bin = state.bins.find((item) => sameId(item._id, id));
    return bin ? shallowClone(bin) : null;
  },

  async getBinByIdentifier(binId: string) {
    await wait();
    const bin = state.bins.find((item) => item.binId === binId && item.active);
    return bin ? shallowClone(bin) : null;
  },

  async createBin(data: BinInput) {
    await wait();
    const binId = `BIN-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`;
    const bin: Bin = {
      _id: new ObjectId(),
      binId,
      location: data.location,
      acceptedTypes: data.acceptedTypes,
      qrCode: placeholderQr(binId),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    state.bins.unshift(bin);
    return shallowClone(bin);
  },

  async updateBin(id: string, updates: Partial<Bin>) {
    await wait();
    const bin = state.bins.find((item) => sameId(item._id, id));
    if (!bin) return null;
    Object.assign(bin, updates, { updatedAt: new Date() });
    return shallowClone(bin);
  },

  async deleteBin(id: string) {
    await wait();
    const index = state.bins.findIndex((item) => sameId(item._id, id));
    if (index >= 0) {
      state.bins.splice(index, 1);
      return true;
    }
    return false;
  },

  async findUserByEmail(email: string) {
    await wait();
    const user = state.users.find((item) => item.email === email);
    return user ? shallowClone(user) : null;
  },

  async getUserById(id: string) {
    await wait();
    const user = state.users.find((item) => sameId(item._id, id));
    return user ? shallowClone(user) : null;
  },

  async createUser(data: UserInput & { password: string }) {
    await wait();
    const user: User = {
      _id: new ObjectId(),
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      walletBalance: 0,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    state.users.push(user);
    return shallowClone(user);
  },

  async creditWallet(userId: string, amount: number) {
    await wait();
    const user = state.users.find((item) => sameId(item._id, userId));
    if (!user) return null;
    user.walletBalance += amount;
    user.updatedAt = new Date();
    return shallowClone(user);
  },

  async addTransaction(transaction: Omit<Transaction, "_id">) {
    await wait();
    const newTransaction: Transaction = {
      _id: new ObjectId(),
      ...transaction,
    };
    state.transactions.unshift(newTransaction);
    return shallowClone(newTransaction);
  },

  async listTransactionsByUser(userId: string) {
    await wait();
    return state.transactions
      .filter((tx) => sameId(tx.userId, userId))
      .map((tx) => shallowClone(tx));
  },
};

export type MockDb = typeof mockDb;
