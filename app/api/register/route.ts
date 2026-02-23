import { NextRequest, NextResponse } from 'next/server';

/* --------------------------------------------------------------------------
   TWILIO CONFIGURATION (CURRENTLY DISABLED)
   To re-enable: Uncomment these lines and the block below in the POST function.
-------------------------------------------------------------------------- */
// const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
// const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
// const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || ''; 
// const YOUR_WHATSAPP_NUMBER = process.env.YOUR_WHATSAPP_NUMBER || '';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, mobile, email, preferredUnit, request, consentContact, consentMarketing } = body;

        // 1. Validate fields
        if (!name || !mobile || !email || !request) {
            return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        // ----------------------------------------------------------------------
        // OPTION A: TELEGRAM BOT (DEBUG MODE)
        // ----------------------------------------------------------------------
        
        // Get Telegram Credentials
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        // LOGGING: Check if keys exist in Vercel
        console.log("🔍 Debug - Checking Keys:", { 
            HasToken: !!BOT_TOKEN, 
            ChatID: CHAT_ID 
        });

        if (BOT_TOKEN && CHAT_ID) {
            const timestamp = new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' });
            
            // HTML Formatted Message for Telegram
            const telegramMessage = `
🚀 <b>NEW LEAD: RIVER MODERN</b>
──────────────────
👤 <b>Name:</b> ${name}
📱 <b>Mobile:</b> ${mobile}
📧 <b>Email:</b> ${email}
🏢 <b>Unit:</b> ${preferredUnit}
📋 <b>Request:</b> ${request}
──────────────────
✅ <b>Contact:</b> ${consentContact ? 'Yes' : 'No'}
📣 <b>Marketing:</b> ${consentMarketing ? 'Yes' : 'No'}
🕐 <b>Time:</b> ${timestamp}
            `.trim();

            const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            
            // --- UPDATED SEND LOGIC ---
            const response = await fetch(telegramUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramMessage,
                    parse_mode: 'HTML'
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("❌ TELEGRAM API ERROR:", result); 
            } else {
                console.log("✅ TELEGRAM SUCCESS:", result);
            }
            // ---------------------------

        } else {
             console.error('❌ KEYS MISSING: Telegram keys are missing in Vercel');
        }

        /* ----------------------------------------------------------------------
           OPTION B: TWILIO WHATSAPP (DISABLED)
        ---------------------------------------------------------------------- */
        /*
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

        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

        await fetch(twilioUrl, {
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
        */
        // ----------------------------------------------------------------------

        return NextResponse.json({ success: true, message: 'Submitted successfully' });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}