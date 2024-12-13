//pages/api/books/[id].js
const books = [
    { id: 1, title: "Book 1", genre: "Fiction", author: "Author 1" },
    { id: 2, title: "Book 2", genre: "Non-fiction", author: "Author 2" },
];

export default function handler(req, res) {
    const { id } = req.query;
    const book = books.find((b) => b.id === parseInt(id));
    if (book) return res.status(200).json(book);
    res.status(404).json({ message: "Book not found" });
}
import { connectToDB } from '../../pages/lib/mongodb';

export async function getAllBooks() {
  try {
    const db = await connectToDB();
    const booksCollection = db.collection('books');

    const booksWithAuthors = await booksCollection.aggregate([
      {
        $lookup: {
          from: "authors", // The collection to join with
          localField: "authorId", // The field in the books collection
          foreignField: "id", // The field in the authors collection
          as: "authorDetails", // The new field for joined data
        },
      },
      {
        $unwind: {
          path: "$authorDetails", // Unwind the array to a single object
          preserveNullAndEmptyArrays: true, // Avoid errors if no match is found
        },
      },
      {
        $project: {
          _id: { $toString: "$_id" }, // Convert _id to string
          title: 1,
          summary: 1,
          publishedDate: 1,
          price: 1,
          rating: 1,
          "authorDetails.name": 1, // Include only the author's name
          "authorDetails.bio": 1,  // Include the author's bio if needed
        },
      },
    ]).toArray();


    return booksWithAuthors;
  } catch (error) {
    console.error("Error fetching books with authors:", error);
    return [];
  }
}