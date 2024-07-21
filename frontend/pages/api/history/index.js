export default async function handler(req, res) {
    const { userID } = req.body;
    const resp = await fetch("http://20.98.104.160:8000/conversations/" + userID);
    const data = await resp.json();
    res.status(200).json(data);
}