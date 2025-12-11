# ⚡ Quick Start Guide

Get your EcoRewards platform running in 5 minutes!

## 🎯 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (create free at mongodb.com/cloud/atlas)

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

1. Create MongoDB Atlas cluster (free tier)
2. Get your connection string
3. Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainable-rewards
NEXTAUTH_SECRET=run-openssl-rand-base64-32-to-generate
```

### 3. Seed Database

```bash
npm run seed
```

This creates sample products and bins with QR codes.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📱 What You Get

### User Pages

- **/** - Landing page explaining the concept
- **/products** - Browse eco-friendly products
- **/scan** - Scan bin QR codes to earn rewards
- **/wallet** - View balance & transaction history

### Admin Pages

- **/admin** - Manage products and recycling bins

## 🧪 Test the Flow

1. Go to `/admin`
2. Download a bin QR code
3. Go to `/scan`
4. Scan the QR code with your camera
5. See the reward credited! 💰

## 🔧 Key Features

✅ Buy recyclable products (e.g., ₹95 drink)  
✅ Scan QR code at recycling bin  
✅ Earn instant cashback (e.g., ₹5)  
✅ Track wallet balance  
✅ Admin dashboard for management  

## 📚 Detailed Guides

- See **SETUP.md** for comprehensive setup instructions
- See **README.md** for project documentation

## 🆘 Common Issues

**MongoDB connection fails**
- Check username/password in .env.local
- Whitelist your IP in MongoDB Atlas (0.0.0.0/0 for development)

**Camera not working**
- Grant camera permissions in browser
- Use HTTPS in production

**Seed script fails**
- Ensure MongoDB connection is configured
- Check MONGODB_URI in .env.local

## 🌟 What's Next?

1. Customize products and rewards in admin panel
2. Print bin QR codes and place them
3. Test the complete user journey
4. Add real authentication
5. Deploy to production!

---

**Made with 💚 for a sustainable future**

Need help? Check SETUP.md for detailed troubleshooting.
