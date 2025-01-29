import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, feedback, email } = req.body;

  if (!feedback || !subject || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a test account using Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: '"PhyNews Feedback" <feedback@phynews.com>',
      to: email,
      subject: subject,
      text: feedback,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">PhyNews Feedback</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p style="margin-bottom: 20px;">${feedback}</p>
          </div>
        </div>
      `,
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return res.status(500).json({ error: 'Failed to send feedback' });
  }
}