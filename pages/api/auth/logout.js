//pages/api/auth/logout.js
export default function handler(req, res) {
    if (req.method === "POST") {
        return res.status(200).json({ message: "Logged out successfully" });
    }
    res.status(405).json({ message: "Method not allowed" });
}
