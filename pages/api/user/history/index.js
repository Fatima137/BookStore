//pages/api/user/history/index.js

let userHistory = [];

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json(userHistory);
    }
    if (req.method === "POST") {
        const { query } = req.body;
        userHistory.push(query);
        return res.status(201).json({ message: "Query added" });
    }
    res.status(405).json({ message: "Method not allowed" });
}
