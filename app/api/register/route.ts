import { NextRequest, NextResponse } from 'next/server';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || ''; // e.g. whatsapp:+14155238886
const YOUR_WHATSAPP_NUMBER = process.env.YOUR_WHATSAPP_NUMBER || ''; // e.g. whatsapp:+65XXXXXXXX

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, mobile, email, preferredUnit, request, consentContact, consentMarketing } = body;

        // Validate required fields
        if (!name || !mobile || !email || !request) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Format WhatsApp message
        const message = [
            `🏠 *New Lead from River Modern*`,
            ``,
            `👤 *Name:* ${name}`,
            `📱 *Mobile:* ${mobile}`,
            `📧 *Email:* ${email}`,
            `🏢 *Preferred Unit:* ${preferredUnit}`,
            `📋 *Request:* ${request}`,
            `✅ *Contact Consent:* ${consentContact ? 'Yes' : 'No'}`,
            `📣 *Marketing Consent:* ${consentMarketing ? 'Yes' : 'No'}`,
            ``,
            `🕐 *Submitted:* ${new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' })}`,
        ].join('\n');

        // Send via Twilio WhatsApp API
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

        const twilioResponse = await fetch(twilioUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                From: TWILIO_WHATSAPP_FROM,
                To: YOUR_WHATSAPP_NUMBER,
                Body: message,
            }),
        });

        const twilioResult = await twilioResponse.json();

        if (!twilioResponse.ok) {
            console.error('Twilio error:', twilioResult);
            return NextResponse.json(
                { success: false, message: 'Failed to send WhatsApp notification' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Registration submitted successfully' });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}