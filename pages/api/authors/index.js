import {connectToDB} from '../lib/mongodb';

export default async function handler(req, res) {
  try {
    console.log('API called: /api/authors'); 

    // Step 1: Connect to MongoDB
    console.log('Connecting to the database...');
    const db = await connectToDB();
    console.log('Database connection successful.');

    // Step 2: Access the authors collection
    console.log('Accessing authors collection...');
    const authorsCollection = db.collection('authors');

    // Step 3: Fetch authors from MongoDB
    console.log('Fetching authors from the database...');
    const authors = await authorsCollection
      .find({}, { projection: { id: 1, name: 1, bio: 1 } })
      .toArray();

    // Debugging: Log the fetched authors
    console.log('Fetched authors:', authors);

    // Step 4: Return authors data
    if (!authors || authors.length === 0) {
      console.log('No authors found in the database.');
      return res.status(404).json({ message: 'No authors found' });
    }

    res.status(200).json({ authors });
  } catch (error) {
    // Debugging: Log the error details
    console.error('Error occurred while fetching authors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}