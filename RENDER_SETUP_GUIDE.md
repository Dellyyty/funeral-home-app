# 🚀 Render PostgreSQL Setup Guide

Your app has been migrated from SQLite to PostgreSQL! Follow these steps to get persistent storage working on Render (100% FREE).

## ✅ What Changed

- ❌ **Before**: SQLite (data resets on app restart)
- ✅ **Now**: PostgreSQL (data persists forever, even on free tier!)

## 📋 Setup Steps on Render

### Step 1: Wait for Automatic Deployment
1. Go to your Render dashboard: https://dashboard.render.com
2. Your app should automatically start deploying the new changes
3. Wait for the deployment to complete (2-3 minutes)

### Step 2: Verify PostgreSQL Database Was Created
1. In your Render dashboard, look for a new **PostgreSQL** service called `funeral-home-db`
2. It should have been automatically created from the `render.yaml` file
3. Status should show as "Available"

### Step 3: Check Environment Variables
1. Click on your `funeral-home-app` web service
2. Go to **Environment** tab
3. You should see:
   - `DATABASE_URL` (automatically linked to your PostgreSQL database)
   - `NODE_ENV` = production

### Step 4: Test Your App
1. Visit your app: https://funeral-home-app.onrender.com
2. Submit a test form
3. Go to admin dashboard: https://funeral-home-app.onrender.com/admin
4. Verify the submission appears

### Step 5: Test Data Persistence
1. Wait 15+ minutes for the app to go to sleep (or manually restart it)
2. Visit the app again (it will wake up)
3. Check the admin dashboard
4. **Your data should still be there!** 🎉

## 🔍 Troubleshooting

### If PostgreSQL Database Wasn't Created Automatically:

1. **Create it manually:**
   - In Render dashboard, click **"New +"** → **"PostgreSQL"**
   - Name: `funeral-home-db`
   - Database: `funeral_home`
   - User: `funeral_home_user`
   - Region: Same as your web service
   - Plan: **Free**
   - Click **"Create Database"**

2. **Link it to your web service:**
   - Go to your `funeral-home-app` service
   - Click **Environment** tab
   - Click **"Add Environment Variable"**
   - Key: `DATABASE_URL`
   - Value: Copy the **Internal Database URL** from your PostgreSQL service
   - Click **"Save Changes"**

### If You See "Error connecting to PostgreSQL":

1. Check that `DATABASE_URL` environment variable is set
2. Make sure the PostgreSQL database status is "Available"
3. Try manually restarting your web service

### If Data Still Doesn't Persist:

1. Verify you're using the **Internal Database URL** (not External)
2. Check the logs in your web service for any database errors
3. Make sure the PostgreSQL database is in the same region as your web service

## 📊 PostgreSQL Free Tier Limits

- **Storage**: 1 GB
- **Connections**: 97 concurrent
- **Expiration**: 90 days (you'll get an email reminder to create a new one)
- **Data Persistence**: ✅ YES! Data never resets

## 🎯 What You Get Now

✅ **Persistent Storage** - Data survives app restarts
✅ **Free Forever** - No monthly costs
✅ **Professional** - Production-ready database
✅ **Automatic Backups** - Render handles this
✅ **Scalable** - Easy to upgrade if needed

## 🔄 Local Development (Optional)

If you want to test locally with PostgreSQL:

1. **Install PostgreSQL locally** (or use Docker)

2. **Create a `.env` file:**
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/funeral_home
   NODE_ENV=development
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the app:**
   ```bash
   npm start
   ```

## 📞 Need Help?

If something doesn't work:
1. Check Render logs (click on your service → Logs tab)
2. Verify PostgreSQL database is "Available"
3. Confirm `DATABASE_URL` is set correctly
4. Try manual restart of the web service

---

**Your app is now ready for production use with persistent storage! 🎉**
