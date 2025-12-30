import { ConvexHttpClient } from "convex/browser";
import { api } from "./src/convex/_generated/api.js";

const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL);

async function deleteData() {
  try {
    console.log("Attempting to delete all flight deals...");
    const result = await convex.mutation(api.flights.deleteAllFlights);
    console.log(`Successfully deleted ${result.deleted} flight deals.`);
  } catch (error) {
    console.error("Failed to delete flights:", error);
    process.exit(1);
  }
}

deleteData();