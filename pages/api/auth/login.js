export default function handler(req, res) {
    if (req.method === 'POST') {
      console.log('Raw request body:', req.body); // Log raw body
  
      const { email, password } = req.body || {};
      console.log('Parsed email:', email); // Log parsed email
      console.log('Parsed password:', password); // Log parsed password
  
      const validEmail = 'user@example.com';
      const validPassword = 'password';
  
      if (email === validEmail && password === validPassword) 
        return res.status(200).json({
          token: 'mockToken123',
          user: { id: 1, email, name: 'Test User' },
        });
      }
  
      return res.status(401).json({ error: 'login.js2 Invalid credentials' });
    }
  
    return res.status(405).json({ error: 'Method not allowed' });
  }
  