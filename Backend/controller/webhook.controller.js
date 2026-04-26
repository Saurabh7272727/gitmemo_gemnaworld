import crypto from 'crypto';
import { EventLog } from '../model/event.model.js';

export const handleWebhook = async (req, res) => {
    try {
        const signature = req.headers['x-hub-signature-256'];
        const eventType = req.headers['x-github-event'];
        const payload = req.body;

        if (!payload) {
            return res.status(400).json({ message: 'Webhook payload missing', success: false, status: 400 });
        }

        if (process.env.WEBHOOK_SECRET) {
            const payloadString = JSON.stringify(payload);
            const expected = crypto
                .createHmac('sha256', process.env.WEBHOOK_SECRET)
                .update(payloadString)
                .digest('hex');

            if (`sha256=${expected}` !== signature) {
                return res.status(401).json({ message: 'Invalid webhook signature', success: false, status: 401 });
            }
        }

        const repoPayload = payload.repository || {};
        const eventLog = new EventLog({
            eventType,
            payload,
            repository: {
                id: repoPayload.id,
                name: repoPayload.name,
                owner: repoPayload.owner?.login || repoPayload.owner?.name,
            },
        });

        await eventLog.save();

        return res.status(200).json({ message: 'Webhook event saved', success: true, status: 200 });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ message: error.message, success: false, status: 500 });
    }
};