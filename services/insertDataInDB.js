// 1. Install Mongoose: npm install mongoose

// 2. Import Mongoose
const mongoose = require("mongoose");

// Replace with your MongoDB connection URI
const uri =
  "mongodb+srv://Arshpreet_Singh:arsh1234@cluster1.lkij2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

async function connectAndInsert() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // 3. Define a Schema
    const planSchema = new mongoose.Schema({
      title: String,
      price: String,
      duration: String,
      jobPostings: Number,
      candidateViews: Number,
      jobDescriptionLength: String,
      resumeDownloadLimit: Number,
      jobVisibilityDays: Number,
      featuredJobs: Boolean,
      emailAlerts: Boolean,
      profileAnalytics: Boolean,
      supportPriority: String,
      branding: Boolean,
    });

    // 4. Create a Model
    const Plan = mongoose.model("Plan", planSchema, "jobPlans"); // 'jobPlans' is the name of your collection

    // Your data
    const planData = [
      {
        title: "Basic",
        price: "$119.00",
        duration: "30 Day(s)",
        jobPostings: 3,
        candidateViews: 10,
        jobDescriptionLength: "500 words",
        resumeDownloadLimit: 5,
        jobVisibilityDays: 30,
        featuredJobs: false,
        emailAlerts: false,
        profileAnalytics: false,
        supportPriority: "Basic",
        branding: false,
      },
      {
        title: "Standard",
        price: "$399.00",
        duration: "60 Day(s)",
        jobPostings: 10,
        candidateViews: 50,
        jobDescriptionLength: "1000 words",
        resumeDownloadLimit: 20,
        jobVisibilityDays: 60,
        featuredJobs: true,
        emailAlerts: true,
        profileAnalytics: true,
        supportPriority: "Standard",
        branding: false,
      },
      {
        title: "Prime",
        price: "$629.00",
        duration: "120 Day(s)",
        jobPostings: 30,
        candidateViews: 200,
        jobDescriptionLength: "Unlimited",
        resumeDownloadLimit: 100,
        jobVisibilityDays: 90,
        featuredJobs: true,
        emailAlerts: true,
        profileAnalytics: true,
        supportPriority: "Priority",
        branding: true,
      },
      {
        title: "Ultimate",
        price: "$1149.00",
        duration: "180 Day(s)",
        jobPostings: 100,
        candidateViews: 500,
        jobDescriptionLength: "Unlimited",
        resumeDownloadLimit: 300,
        jobVisibilityDays: 180,
        featuredJobs: true,
        emailAlerts: true,
        profileAnalytics: true,
        supportPriority: "Priority",
        branding: true,
      },
    ];

    // 5. Insert the Data
    const result = await Plan.insertMany(planData);
    console.log("Data inserted successfully:", result);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

connectAndInsert();
