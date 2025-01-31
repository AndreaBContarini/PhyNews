import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente dal file .env
dotenv.config();

const app = express();

// Configurazione CORS aggiornata per includere Netlify
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://phynewsbeta1.netlify.app'
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Configurazione del trasporto email con Hostinger
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',  // Server SMTP di Hostinger
  port: 465,  // Porta per SSL/TLS
  secure: true,  // Usa SSL/TLS
  auth: {
    user: 'andrea@martes-ai.com',
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    // Non verificare il certificato
    rejectUnauthorized: false
  }
});

// Verifica la configurazione del trasporto
transporter.verify(function (error, success) {
  if (error) {
    console.log('Server SMTP error:', error);
  } else {
    console.log('Server SMTP is ready to take our messages');
  }
});

// Endpoint per l'invio del feedback
app.post('/api/feedback', async (req, res) => {
  const { subject, feedback } = req.body;

  if (!subject || !feedback) {
    return res.status(400).json({ error: 'Subject and feedback are required' });
  }

  try {
    console.log('Attempting to send email...');
    const info = await transporter.sendMail({
      from: '"PhyNews Feedback" <andrea@martes-ai.com>',
      to: 'andrea@martes-ai.com',
      subject: subject,
      text: feedback,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">PhyNews Feedback</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p style="margin-bottom: 20px;">${feedback}</p>
          </div>
        </div>
      `
    });
    console.log('Email sent successfully:', info);
    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).json({ error: 'Failed to send feedback: ' + error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 