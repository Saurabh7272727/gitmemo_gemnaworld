import crypto from "crypto";

export const handleWebhook = (req, res) => {
    const signature = req.headers["x-hub-signature-256"];
    const payload = JSON.stringify(req.body);

    const hmac = crypto
        .createHmac("sha256", process.env.WEBHOOK_SECRET)
        .update(payload)
        .digest("hex");

    if (`sha256=${hmac}` !== signature) {
        return res.status(401).send("Invalid signature");
    }

    const event = req.headers["x-github-event"];

    console.log("Event:", event);

    // console.log("Event:", req.body);

    res.status(200).send("Webhook received");
};