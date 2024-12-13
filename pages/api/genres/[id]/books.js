import { connectToDB } from '../lib/mongodb';

export default async function handler(req, res) {
  try {
    console.log('API called: /api/genres'); // Changed API endpoint

    // Step 1: Connect to MongoDB
    console.log('Connecting to the database...');
    const db = await connectToDB();
    console.log('Database connection successful.');

    // Step 2: Access the genres collection
    console.log('Accessing genres collection...');
    const genresCollection = db.collection('genres'); // Changed collection name

    // Step 3: Fetch genres from MongoDB
    console.log('Fetching genres from the database...');
    const genres = await genresCollection
      .find({}, { projection: { id: 1, name: 1, description: 1 } }) // Adjust projection for genres
      .toArray();

    // Debugging: Log the fetched genres
    console.log('Fetched genres:', genres);

    // Step 4: Return genres data
    if (!genres || genres.length === 0) {
      console.log('No genres found in the database.');
      return res.status(404).json({ message: 'No genres found' });
    }

    res.status(200).json({ genres });
  } catch (error) {
    // Debugging: Log the error details
    console.error('Error occurred while fetching genres:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
