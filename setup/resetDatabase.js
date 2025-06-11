import { Thought } from "../models/thought";
import thoughtData from "../data.json"

export const resetDatabase = () => {
  if (process.env.RESET_DB) {
    const seedDatabase = async () => {
      console.log("🌱 Resetting and seeding database...");
      await Thought.deleteMany({});
      thoughtData.forEach(thought => {
        new Thought(thought).save();
      });
      console.log("✅ Seeding complete.");
    };
    seedDatabase();
  }
}