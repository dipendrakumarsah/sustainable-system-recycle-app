# 🔴 IMPORTANT - Read Before Starting

## ⚠️ Critical Configuration Required

### 1. MongoDB Atlas Setup (MUST DO FIRST)

**This project WILL NOT WORK without MongoDB configuration!**

```env
# Edit .env.local and replace these values:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/sustainable-rewards

# Example:
MONGODB_URI=mongodb+srv://john:mypassword123@cluster0.abc123.mongodb.net/sustainable-rewards
```

**How to get this:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster (M0 Free tier)
4. Create database user
5. Whitelist IP: 0.0.0.0/0 (for development)
6. Get connection string
7. Replace username and password in the string

### 2. Generate Secret (MUST DO)

```bash
# Run this command:
openssl rand -base64 32

# Copy the output and add to .env.local:
NEXTAUTH_SECRET=paste_generated_secret_here
```

### 3. Seed Database (MUST DO)

```bash
# After configuring MongoDB, run:
npm run seed

# This creates sample products and bins
# Without this, pages will be empty!
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do This
- ❌ Don't skip MongoDB setup
- ❌ Don't commit .env.local to git
- ❌ Don't use placeholder values in .env.local
- ❌ Don't forget to whitelist IP in MongoDB
- ❌ Don't forget to run seed script
- ❌ Don't use HTTP for camera in production

### ✅ Do This Instead
- ✅ Complete MongoDB setup first
- ✅ Use real credentials in .env.local
- ✅ Keep .env.local secret
- ✅ Whitelist 0.0.0.0/0 for development
- ✅ Run seed script before testing
- ✅ Use HTTPS in production

---

## 📋 Startup Sequence (Follow This Order)

```bash
# 1. Install dependencies
npm install

# 2. Configure .env.local (see above)

# 3. Seed database
npm run seed

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:3000
```

---

## 🎯 Quick Test Checklist

After setup, verify these work:

1. **Homepage** → http://localhost:3000
   - Should show green EcoRewards landing page
   
2. **Products** → http://localhost:3000/products
   - Should show 4 sample products
   
3. **Admin** → http://localhost:3000/admin
   - Should show products and bins tables
   - Download a QR code
   
4. **Scan** → http://localhost:3000/scan
   - Click "Start Camera"
   - Scan the downloaded QR code
   - Should show bin info
   
5. **Wallet** → http://localhost:3000/wallet
   - Should show balance and transactions

---

## 🔧 Troubleshooting

### "MongoServerError: bad auth"
**Problem**: Wrong username/password in MONGODB_URI  
**Solution**: Check credentials in MongoDB Atlas and update .env.local

### "No products available"
**Problem**: Database not seeded  
**Solution**: Run `npm run seed`

### "Connection timeout"
**Problem**: IP not whitelisted  
**Solution**: In MongoDB Atlas → Network Access → Add IP → 0.0.0.0/0

### Camera not working
**Problem**: No permissions or HTTPS required  
**Solution**: 
- Grant camera permissions in browser
- Use HTTPS in production
- Check browser console for errors

### Port already in use
**Problem**: Port 3000 occupied  
**Solution**: Kill process or use different port:
```bash
npm run dev -- -p 3001
```

---

## 📱 Demo User IDs (For Testing)

The code uses mock user IDs:
- User ID: `674000000000000000000000`
- Product ID: `674000000000000000000001`

**In production**: Replace with real authenticated user IDs

---

## 🔐 Security Notes

### Development
- ✅ .env.local is gitignored
- ✅ 0.0.0.0/0 IP whitelist is OK for local dev
- ✅ Mock user IDs are fine for testing

### Production
- 🔴 Use specific IP whitelisting
- 🔴 Implement real authentication
- 🔴 Use environment variables in hosting platform
- 🔴 Enable HTTPS (required for camera)
- 🔴 Add rate limiting
- 🔴 Validate all user inputs
- 🔴 Use real user sessions

---

## 📚 File Reference

- **README.md** → Project overview and features
- **SETUP.md** → Detailed setup guide with troubleshooting
- **QUICKSTART.md** → 5-minute quick start
- **PROJECT_SUMMARY.md** → Complete implementation details
- **CHECKLIST.md** → Verification checklist
- **THIS FILE** → Critical configuration and warnings

---

## 🎓 Learning Resources

- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Next.js: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/docs

---

## 💡 Key Concepts

### How It Works
1. **Products** have a price and reward amount
2. **Bins** accept specific material types (plastic, glass, etc.)
3. **Users** scan bin QR codes after using products
4. **System** verifies bin accepts the product's material
5. **Reward** credited instantly to user's wallet
6. **Transactions** logged for history

### Example Flow
```
User buys: Eco Drink (₹95, Plastic bottle)
User finishes drink
User finds bin that accepts: [Plastic, Glass, Metal]
User scans bin QR code
System checks: Bin accepts Plastic? ✅ Yes
User confirms disposal
Wallet updated: +₹5 reward
Transaction logged
```

---

## 🚀 Next Steps After Setup

1. **Test the Flow**
   - Go to admin, download bin QR
   - Go to scan, scan the QR
   - Verify reward credited

2. **Customize**
   - Add your own products
   - Create bins for your locations
   - Adjust reward amounts

3. **Deploy**
   - See SETUP.md for deployment guide
   - Configure production MongoDB
   - Set up authentication
   - Enable HTTPS

4. **Enhance**
   - Add payment gateway
   - Implement geolocation
   - Create mobile app
   - Add analytics

---

## ❓ Need Help?

1. Check error messages in browser console (F12)
2. Check terminal output for server errors
3. Review SETUP.md troubleshooting section
4. Verify .env.local configuration
5. Ensure MongoDB connection works
6. Try restarting dev server

---

## 🎉 Success Indicators

You're ready to go when you see:

✅ Dev server runs without errors  
✅ Homepage loads with green theme  
✅ Products page shows sample items  
✅ Admin page shows tables  
✅ QR scanning works  
✅ Rewards credit successfully  

---

**Everything ready? Great! Now configure MongoDB and let's make recycling profitable! 🌍💚**

**Important**: Don't skip the MongoDB setup - the app requires it!
