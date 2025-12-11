# MongoDB Connection Troubleshooting

## Issue

The MongoDB connection is timing out when trying to connect to MongoDB Atlas.

## Common Causes

### 1. **IP Address Not Whitelisted** (Most Common)

MongoDB Atlas requires you to whitelist your IP address.

**Solution:**

1. Go to [MongoDB Atlas Console](https://cloud.mongodb.com/)
2. Select your project (sustainable-rewards)
3. Click "Network Access" in the left sidebar
4. Click "Add IP Address"
5. Either:
   - Click "Add Current IP Address" to whitelist your current IP
   - Enter `0.0.0.0/0` to allow all IPs (⚠️ only for development!)
6. Click "Confirm"
7. Wait 1-2 minutes for the change to propagate

### 2. **Firewall Blocking Port 27017**

Your firewall or antivirus might be blocking MongoDB's port.

**Solution:**

- Temporarily disable firewall/antivirus
- Or add an exception for port 27017

### 3. **WSL Network Issues**

WSL might have connectivity issues with external services.

**Solution:**
Try running from Windows PowerShell instead:

```powershell
cd C:\Users\sanjay\Desktop\sustainable
npx tsx test-connection.ts
```

### 4. **Incorrect Connection String**

Verify your connection string is correct.

**Current Connection String:**

```text
mongodb+srv://sanjay17126_db_user:0jmZgE82KTyzkmDv@cluster0.v5aro13.mongodb.net/sustainable-rewards?retryWrites=true&w=majority
```

**To verify:**

1. Go to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Update `.env.local` if different

## Quick Test

After whitelisting your IP, run:

```bash
npm run seed
```

Or test connection:

```bash
npx tsx test-connection.ts
```

## Next Steps Once Connected

1. ✅ Seed the database: `npm run seed`
2. ✅ Start the dev server: `npm run dev`
3. ✅ Visit <http://localhost:3000>
4. ✅ Go to Admin page and download QR codes
5. ✅ Test the scan functionality

---

**Most Likely Fix:** Whitelist your IP address in MongoDB Atlas Network Access settings.
