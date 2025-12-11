# EcoRewards - Sustainable Development Rewards Platform

A Next.js application that incentivizes responsible recycling by rewarding users with cashback when they properly dispose of recyclable products.

## 🌱 Concept

Users purchase eco-friendly products (e.g., ₹95 drink), and when they dispose of the recyclable packaging in designated bins, they scan a QR code to verify proper disposal and receive instant cashback rewards (e.g., ₹5).

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **Database**: MongoDB Atlas
- **QR Code**: html5-qrcode for scanning, qrcode for generation
- **Authentication**: bcryptjs for password hashing

## 📋 Features

### User Features
- **Landing Page**: Explains the sustainable rewards system
- **Products Catalog**: Browse available recyclable products with reward information
- **QR Scanner**: Scan bin QR codes using device camera
- **Wallet**: Track balance and transaction history
- **Instant Rewards**: Get cashback credited immediately upon proper disposal

### Admin Features
- **Product Management**: Add, edit, and manage recyclable products
- **Bin Registration**: Register new recycling bins with auto-generated QR codes
- **Material Types**: Configure which materials each bin accepts
- **QR Code Downloads**: Download bin QR codes for printing

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB Atlas

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `.env.local` with your MongoDB URI:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainable-rewards?retryWrites=true&w=majority
```

### 3. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Add it to `.env.local`:

```env
NEXTAUTH_SECRET=your-generated-secret-here
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
sustainable/
├── app/
│   ├── page.tsx              # Landing page
│   ├── products/page.tsx     # Products catalog
│   ├── scan/page.tsx         # QR scanner
│   ├── wallet/page.tsx       # User wallet & history
│   ├── admin/page.tsx        # Admin dashboard
│   └── api/
│       ├── auth/             # Authentication endpoints
│       ├── products/         # Product management
│       ├── scan/             # QR verification & disposal
│       ├── rewards/          # Wallet & transactions
│       └── admin/            # Admin operations
├── lib/
│   ├── db.ts                 # MongoDB connection
│   ├── initDb.ts             # Database initialization
│   └── models/               # Data models
│       ├── User.ts
│       ├── Product.ts
│       ├── Bin.ts
│       └── Transaction.ts
└── components/ui/            # shadcn/ui components
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products

- `GET /api/products` - List all active products
- `GET /api/products?category=beverage` - Filter by category

### Scanning & Disposal

- `POST /api/scan/verify` - Verify bin QR code
- `POST /api/scan` - Process disposal and credit reward

### Rewards

- `GET /api/rewards?userId={id}` - Get wallet balance and transaction history

### Admin

- `GET /api/admin?type=products` - List all products
- `GET /api/admin?type=bins` - List all bins
- `POST /api/admin` - Create product or bin
- `PUT /api/admin` - Update product or bin
- `DELETE /api/admin?type={type}&id={id}` - Delete resource

## 💡 How It Works

1. **Purchase**: User buys a product (e.g., ₹95 drink) from the marketplace
2. **Consume**: User enjoys the product
3. **Locate Bin**: Find a nearby designated recycling bin
4. **Scan QR**: Use the app to scan the bin's QR code
5. **Verify**: System checks if bin accepts the product's material type
6. **Dispose**: User confirms disposal in the correct bin
7. **Reward**: Instant cashback (e.g., ₹5) credited to wallet

## 🎯 Next Steps

- [ ] Integrate real authentication (NextAuth.js)
- [ ] Add user registration/login flow
- [ ] Implement actual payment gateway for wallet withdrawals
- [ ] Add geolocation to find nearest bins
- [ ] Create mobile app version
- [ ] Add admin analytics dashboard
- [ ] Implement tiered reward system
- [ ] Add social features (leaderboards, achievements)

## 🌍 Environmental Impact

This platform encourages:

- ✅ Proper waste segregation
- ✅ Increased recycling rates
- ✅ Reduced environmental pollution
- ✅ Sustainable consumer behavior
- ✅ Circular economy principles

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
