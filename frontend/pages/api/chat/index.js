export default async function handler(req, res) {

    const { userID, conversationID, message } = req.body;

    console.log(userID, conversationID, message);

    const url = "http://20.98.104.160:8000/invoke";
    const cookies = 'user_id=' + userID;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies
        },
        body: JSON.stringify({
            input: { human_input: message },
            config: {
                configurable: {
                    conversation_id: conversationID
                }
            },
            kwargs: {}
        })
    }
    )

    const data = await response.json();
    console.log(data);

    res.status(200).json(data);
}
