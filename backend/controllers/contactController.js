import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send contact form email to admin
export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const transporter = createTransporter();
        const adminEmail = process.env.EMAIL_USER; // Send to your email

        // Email to admin (you)
        const mailOptions = {
            from: `"QuEventHub Contact Form" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            replyTo: email, // So you can reply directly to the user
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: #00466a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
                        <p style="margin: 5px 0 0 0; opacity: 0.9;">QuEventHub Contact Form</p>
                    </div>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #00466a; margin-bottom: 10px; font-size: 18px;">Contact Details</h3>
                            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #00466a; text-decoration: none;">${email}</a></p>
                        </div>
                        
                        <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
                            <h3 style="color: #00466a; margin-bottom: 10px; font-size: 18px;">Message</h3>
                            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #00466a; margin-top: 10px;">
                                <p style="margin: 0; line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
                            <p style="color: #666; font-size: 14px; margin: 0;">
                                You can reply directly to this email to respond to ${name}
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                        <p>This email was sent from the QuEventHub contact form</p>
                    </div>
                </div>
            `,
            text: `
New Contact Form Submission from QuEventHub

Contact Details:
Name: ${name}
Email: ${email}

Message:
${message}

---
You can reply directly to this email to respond to ${name}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        console.log(`[Contact] Email sent to admin from ${name} (${email})`);

        // Optional: Send confirmation email to user
        try {
            const userConfirmationOptions = {
                from: `"QuEventHub" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Thank you for contacting QuEventHub',
                html: `
                    <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background-color: #00466a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                            <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
                        </div>
                        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <p>Hi ${name},</p>
                            <p>Thank you for reaching out to QuEventHub! We have received your message and will get back to you as soon as possible.</p>
                            <p style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
                                <strong>Your Message:</strong><br>
                                <em style="color: #666;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</em>
                            </p>
                            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                                Best regards,<br>
                                <strong>QuEventHub Team</strong>
                            </p>
                        </div>
                    </div>
                `
            };
            
            await transporter.sendMail(userConfirmationOptions);
            console.log(`[Contact] Confirmation email sent to ${email}`);
        } catch (confirmationError) {
            // Don't fail the request if confirmation email fails
            console.error('[Contact] Failed to send confirmation email:', confirmationError.message);
        }

        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you soon.'
        });

    } catch (error) {
        console.error('[Contact] Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send your message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
