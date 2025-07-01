module.exports = {
  async up(db) {
    await db.createCollection("my_waybook", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "description"],
          properties: {
            title: { bsonType: "string" },
            description: { bsonType: "string" },
            image: { bsonType: "string" },
            voblers: {
              bsonType: "array",
              items: { bsonType: "string" }
            }
          }
        }
      }
    });

    await db.collection("my_waybook").insertOne({ title: "Title1", image: "https://example.com/images/news1.jpg", description: "Description text to show", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title2", image: "https://example.com/images/news1.jpg", description: "Description text to show but suuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuper loooooooooooooooong", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title3", image: "https://example.com/images/news1.jpg", description: "Description text to show", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title4", image: "https://example.com/images/news1.jpg", description: "Description text to show but suuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuper loooooooooooooooong", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title5", image: "https://example.com/images/news1.jpg", description: "Description text to show", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title6", image: "https://example.com/images/news1.jpg", description: "Description text to show", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title7", image: "https://example.com/images/news1.jpg", description: "Description text to show but suuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuper loooooooooooooooong", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title8", image: "https://example.com/images/news1.jpg", description: "Description text to show", voblers: ["news", "test"] });
    await db.collection("my_waybook").insertOne({ title: "Title9", image: "https://example.com/images/news1.jpg", description: "Description text to show", voblers: ["news", "test"] });
  },


  async down(db) {
    await db.collection("my_waybook").drop();
  }
};