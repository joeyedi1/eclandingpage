import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, mobile, email, preferredUnit, request, consentContact, consentMarketing } = body;

        // 1. Validate fields
        if (!name || !mobile || !email || !request) {
            return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        const timestamp = new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' });

        // ======================================================================
        // PREPARE PARALLEL TASKS
        // ======================================================================
        const tasks = [];

        // ----------------------------------------------------------------------
        // TASK A: TELEGRAM BOT (With Logs)
        // ----------------------------------------------------------------------
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (BOT_TOKEN && CHAT_ID) {
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

            const telegramTask = async () => {
                try {
                    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: CHAT_ID,
                            text: telegramMessage,
                            parse_mode: 'HTML'
                        }),
                    });
                    const result = await response.json();
                    if (!response.ok) console.error("❌ TELEGRAM FAILED:", result);
                    else console.log("✅ TELEGRAM SENT:", result);
                } catch (e) {
                    console.error("❌ TELEGRAM ERROR:", e);
                }
            };
            tasks.push(telegramTask());
        }

        // ----------------------------------------------------------------------
        // TASK B: TWILIO WHATSAPP (With Logs)
        // ----------------------------------------------------------------------
        const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
        const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
        const FROM_NUMBER = process.env.TWILIO_WHATSAPP_FROM;
        const TO_NUMBER = process.env.YOUR_WHATSAPP_NUMBER;

        if (ACCOUNT_SID && AUTH_TOKEN && FROM_NUMBER && TO_NUMBER) {
            const whatsappMessage = `
🏠 *New Lead: River Modern*

👤 *Name:* ${name}
📱 *Mobile:* ${mobile}
📧 *Email:* ${email}
🏢 *Unit:* ${preferredUnit}
📋 *Request:* ${request}
✅ *Contact:* ${consentContact ? 'Yes' : 'No'}
📣 *Marketing:* ${consentMarketing ? 'Yes' : 'No'}

🕐 *Time:* ${timestamp}
            `.trim();

            const twilioTask = async () => {
                try {
                    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`;
                    const response = await fetch(twilioUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64'),
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            From: FROM_NUMBER,
                            To: TO_NUMBER,
                            Body: whatsappMessage,
                        }),
                    });

                    const result = await response.json();
                    
                    if (!response.ok) {
                        console.error("❌ TWILIO FAILED:", result); 
                    } else {
                        console.log("✅ TWILIO SENT (SID):", result.sid);
                    }
                } catch (e) {
                    console.error("❌ TWILIO ERROR:", e);
                }
            };
            tasks.push(twilioTask());
        } else {
            console.error("⚠️ TWILIO KEYS MISSING: Check Vercel Variables");
        }

        // ----------------------------------------------------------------------
        // TASK C: CALLMEBOT WHATSAPP (With Logs)
        // ----------------------------------------------------------------------
        const CMB_PHONE = process.env.CALLMEBOT_PHONE;
        const CMB_API_KEY = process.env.CALLMEBOT_API_KEY;

        if (CMB_PHONE && CMB_API_KEY) {
            const cmbMessage = `
🏠 *New Lead: River Modern*

👤 *Name:* ${name}
📱 *Mobile:* ${mobile}
📧 *Email:* ${email}
🏢 *Unit:* ${preferredUnit}
📋 *Request:* ${request}
✅ *Contact:* ${consentContact ? 'Yes' : 'No'}
📣 *Marketing:* ${consentMarketing ? 'Yes' : 'No'}

🕐 *Time:* ${timestamp}
            `.trim();

            const callMeBotTask = async () => {
                try {
                    // CallMeBot requires URL-encoded text
                    const encodedMessage = encodeURIComponent(cmbMessage);
                    const cmbUrl = `https://api.callmebot.com/whatsapp.php?phone=${CMB_PHONE}&text=${encodedMessage}&apikey=${CMB_API_KEY}`;
                    
                    const response = await fetch(cmbUrl, {
                        method: 'GET', // CallMeBot uses GET
                    });

                    // CallMeBot usually returns plain HTML/text, not JSON
                    const resultText = await response.text();
                    
                    if (!response.ok || resultText.toLowerCase().includes('error')) {
                        console.error("❌ CALLMEBOT FAILED:", resultText); 
                    } else {
                        console.log("✅ CALLMEBOT SENT");
                    }
                } catch (e) {
                    console.error("❌ CALLMEBOT ERROR:", e);
                }
            };
            tasks.push(callMeBotTask());
        } else {
            console.error("⚠️ CALLMEBOT KEYS MISSING: Check Vercel Variables");
        }

        // ======================================================================
        // EXECUTE ALL
        // ======================================================================
        await Promise.allSettled(tasks);

        return NextResponse.json({ success: true, message: 'Submitted successfully' });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}