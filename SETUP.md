# 🚀 EcoRewards Setup Guide

Complete step-by-step guide to get your sustainable rewards platform running.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Git (optional)

## Step 1: MongoDB Atlas Setup

### 1.1 Create Account and Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free M0 tier)
4. Choose your preferred cloud provider and region

### 1.2 Configure Database Access

1. In Atlas, go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Create a username and password
4. Set permissions to **Read and write to any database**
5. Click **Add User**

### 1.3 Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
   - IP: `0.0.0.0/0`
4. Click **Confirm**

### 1.4 Get Connection String

1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Select **Driver: Node.js** and **Version: 5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 2: Project Configuration

### 2.1 Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js, React, TypeScript
- MongoDB driver
- shadcn/ui components
- QR code libraries
- Authentication utilities

### 2.2 Configure Environment Variables

1. Open `.env.local` file in the project root
2. Replace the MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/sustainable-rewards?retryWrites=true&w=majority
```

**Important**: Replace:
- `your-username` - with your MongoDB username
- `your-password` - with your MongoDB password
- `cluster` - with your actual cluster name

3. Generate a secure NextAuth secret:

```bash
# On Linux/Mac/WSL:
openssl rand -base64 32

# On Windows (PowerShell):
$bytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

4. Add the generated secret to `.env.local`:

```env
NEXTAUTH_SECRET=your-generated-secret-here
```

### 2.3 Seed the Database

Populate your database with sample products and recycling bins:

```bash
npm run seed
```

This creates:
- 4 sample products (drinks and snacks)
- 4 recycling bins with QR codes at different locations

## Step 3: Run the Application

### Development Mode

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Step 4: Explore the Application

### User Pages

1. **Home** (`/`) - Landing page explaining the concept
2. **Products** (`/products`) - Browse available recyclable products
3. **Scan QR** (`/scan`) - Scan bin QR codes (requires camera access)
4. **Wallet** (`/wallet`) - View balance and transaction history

### Admin Pages

1. **Admin Dashboard** (`/admin`) - Manage products and bins
   - Add new products with rewards
   - Register new recycling bins
   - Download QR codes for printing

## Step 5: Test the Complete Flow

### Create Sample Products (via Admin)

1. Navigate to `/admin`
2. Click **Add Product**
3. Fill in details:
   - Name: "Test Drink"
   - Description: "Sample beverage"
   - Price: ₹95
   - Reward Amount: ₹5
   - Recyclable Type: Plastic
4. Click **Create Product**

### Create Sample Bins (via Admin)

1. Still in `/admin`, scroll to Bins section
2. Click **Add Bin**
3. Fill in details:
   - Location Name: "Test Location"
   - Address: "123 Test Street"
   - Accepted Types: Select "plastic"
4. Click **Create Bin**
5. Click **Download** to get the QR code
6. Print or display the QR code on your screen

### Test QR Scanning

1. Navigate to `/scan`
2. Click **Start Camera**
3. Grant camera permissions
4. Point camera at the QR code you downloaded
5. System verifies the bin
6. Select a product to dispose
7. Confirm disposal
8. See reward credited! 🎉

### Check Wallet

1. Navigate to `/wallet`
2. View your balance
3. See transaction history

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: bad auth`
- Check username and password in `.env.local`
- Ensure password is URL-encoded (no special characters unencoded)

**Error**: `Connection timeout`
- Check Network Access in MongoDB Atlas
- Ensure `0.0.0.0/0` is whitelisted

### Camera Not Working

**Error**: `Permission denied`
- Allow camera access in browser settings
- Use HTTPS in production (required for camera)

**Error**: `Camera not found`
- Ensure device has a camera
- Check if another app is using the camera

### Build Errors

**Error**: `Module not found`
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error**: TypeScript errors
```bash
npm run lint
```

## Database Schema

### Collections Created

1. **users** - User accounts and wallet balances
2. **products** - Recyclable products with reward info
3. **bins** - Recycling bin locations and QR codes
4. **transactions** - Disposal history and rewards

### Indexes

The seed script creates these indexes for performance:
- users: email (unique)
- bins: binId (unique)
- transactions: userId + createdAt
- products: active + category

## Production Deployment

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
```

### Recommended Hosting

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**

### Important Security Notes

1. **Never commit `.env.local`** to git
2. Use strong passwords for MongoDB
3. Restrict IP access in production
4. Implement proper authentication
5. Add rate limiting to APIs
6. Enable HTTPS for camera access

## Next Steps

After setup, consider:

1. **Authentication** - Implement user login/registration
2. **Payment Gateway** - Add UPI/wallet integration
3. **Geolocation** - Show nearest bins on map
4. **Analytics** - Track recycling metrics
5. **Mobile App** - Create React Native version
6. **Notifications** - Reward alerts and reminders

## Support

If you encounter issues:

1. Check `.env.local` configuration
2. Verify MongoDB Atlas setup
3. Review browser console for errors
4. Check terminal output for server errors

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Happy coding! Let's make sustainability profitable! 🌍💚**
