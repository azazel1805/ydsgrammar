export default async function handler(req, res) {
  // Vercel auto-parses JSON requests
  const code = req.body?.code;

  if (!code) {
    return res.status(400).send("Missing code");
  }

  if (code === process.env.AI_SECRET_CODE) {
    return res.status(200).json({ success: true });
  }

  return res.status(403).send("Invalid code");
}