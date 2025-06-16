Task 2: Basic CRUD Operations (queries.js)
javascript
// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author
db.books.find({ author: "J.R.R. Tolkien" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 11.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });
️⃣ Task 3: Advanced Queries (queries.js)
javascript
// 1. Books in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// 2. Projection - only title, author, price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. Sorting by price (ascending/descending)
db.books.find().sort({ price: 1 });  // Ascending
db.books.find().sort({ price: -1 }); // Descending

// 4. Pagination (5 books per page)
const page = 1;
db.books.find()
  .skip((page - 1) * 5)
  .limit(5);
️⃣ Task 4: Aggregation Pipeline (queries.js)
javascript
// 1. Average price by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      avgPrice: { $avg: "$price" }
    }
  }
]);

// 2. Author with most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// 3. Books count by publication decade
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);
️⃣ Task 5: Indexing (queries.js)
javascript
// 1. Create index on title
db.books.createIndex({ title: 1 });

// 2. Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 3. Performance comparison
// Without index
db.books.find({ title: "1984" }).explain("executionStats");

// After index creation
db.books.find({ title: "1984" }).explain("executionStats");
