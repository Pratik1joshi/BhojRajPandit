import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import nodemailer from 'nodemailer';
import { getServiceById } from '@/data/services';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    
    const appointments = await Appointment.find(query)
      .populate('service')
      .sort({ date: -1 });
    
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const appointment = await Appointment.create(body);
    
    // Get service details from static data
    const service = getServiceById(appointment.service);
    const serviceName = service ? service.title : appointment.service;
    
    const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Send emails
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      // Email template for customer
      const customerEmailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .info-box { background: #fff7ed; border-left: 4px solid #ea580c; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
            .info-label { font-weight: bold; color: #ea580c; width: 140px; }
            .info-value { color: #374151; flex: 1; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
            .om-symbol { font-size: 48px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="om-symbol">🕉️</div>
              <h1>Appointment Confirmed!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for booking with BhojRaj Pandit</p>
            </div>
            
            <div class="content">
              <h2 style="color: #ea580c; margin-top: 0;">Namaste ${appointment.name}! 🙏</h2>
              <p>Your appointment request has been received successfully. We will contact you within 24 hours to confirm all details.</p>
              
              <div class="info-box">
                <h3 style="margin-top: 0; color: #ea580c;">📅 Appointment Details</h3>
                
                <div class="info-row">
                  <div class="info-label">Service:</div>
                  <div class="info-value">${serviceName}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Date:</div>
                  <div class="info-value">${formattedDate}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Name:</div>
                  <div class="info-value">${appointment.name}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div class="info-value">${appointment.email}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">Phone:</div>
                  <div class="info-value">${appointment.phone}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">City:</div>
                  <div class="info-value">${appointment.city}</div>
                </div>
                
                <div class="info-row" style="border-bottom: none;">
                  <div class="info-label">Address:</div>
                  <div class="info-value">${appointment.address}</div>
                </div>
                
                ${appointment.message ? `
                <div class="info-row" style="border-bottom: none;">
                  <div class="info-label">Message:</div>
                  <div class="info-value">${appointment.message}</div>
                </div>
                ` : ''}
              </div>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e;"><strong>⏰ Next Steps:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px; color: #92400e;">
                  <li>We will call you within 24 hours to confirm</li>
                  <li>Please keep your phone accessible</li>
                  <li>Any changes? Contact us immediately</li>
                </ul>
              </div>
              
              <p style="margin-top: 20px;">If you have any questions, feel free to reach out to us.</p>
              <p style="margin: 5px 0;"><strong>May the divine bless you! 🙏</strong></p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;"><strong>BhojRaj Pandit - Religious Services</strong></p>
              <p style="margin: 5px 0;">Authentic Hindu Ceremonies & Spiritual Guidance</p>
              <p style="margin: 5px 0; font-size: 12px;">This is an automated confirmation. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      // Email template for admin
      const adminEmailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .alert-box { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
            .info-label { font-weight: bold; color: #1e40af; width: 140px; }
            .info-value { color: #374151; flex: 1; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Appointment Request</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Action Required</p>
            </div>
            
            <div class="content">
              <div class="alert-box">
                <p style="margin: 0; color: #991b1b;"><strong>⚠️ Please contact the customer within 24 hours to confirm this appointment.</strong></p>
              </div>
              
              <h3 style="color: #1e40af;">Customer Information</h3>
              
              <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value"><strong>${appointment.name}</strong></div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value"><a href="mailto:${appointment.email}">${appointment.email}</a></div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Phone:</div>
                <div class="info-value"><strong><a href="tel:${appointment.phone}">${appointment.phone}</a></strong></div>
              </div>
              
              <div class="info-row">
                <div class="info-label">City:</div>
                <div class="info-value">${appointment.city}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Address:</div>
                <div class="info-value">${appointment.address}</div>
              </div>
              
              <h3 style="color: #1e40af; margin-top: 30px;">Service Details</h3>
              
              <div class="info-row">
                <div class="info-label">Service:</div>
                <div class="info-value"><strong>${serviceName}</strong></div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Requested Date:</div>
                <div class="info-value"><strong>${formattedDate}</strong></div>
              </div>
              
              ${appointment.message ? `
              <div class="info-row" style="border-bottom: none;">
                <div class="info-label">Special Notes:</div>
                <div class="info-value" style="background: #fef3c7; padding: 10px; border-radius: 5px;">${appointment.message}</div>
              </div>
              ` : ''}
              
              <div style="background: #dbeafe; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <p style="margin: 0; color: #1e40af;"><strong>📋 Action Items:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px; color: #1e40af;">
                  <li>Call the customer to confirm availability</li>
                  <li>Discuss any specific requirements</li>
                  <li>Confirm the exact location and timing</li>
                  <li>Update appointment status in admin panel</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">Booking ID: ${appointment._id}</p>
                <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">Received: ${new Date().toLocaleString()}</p>
              </div>
            </div>
            
            <div class="footer">
              <p style="margin: 0;"><strong>BhojRaj Pandit - Admin Notification</strong></p>
              <p style="margin: 5px 0; font-size: 12px;">This is an automated notification from your booking system.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      // Send email to customer
      await transporter.sendMail({
        from: `"BhojRaj Pandit Services" <${process.env.SMTP_USER}>`,
        to: appointment.email,
        subject: '✅ Appointment Confirmation - BhojRaj Pandit',
        html: customerEmailHTML,
      });
      
      // Send email to admin
      await transporter.sendMail({
        from: `"Booking System" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: `🔔 New Appointment: ${appointment.name} - ${serviceName}`,
        html: adminEmailHTML,
        replyTo: appointment.email,
      });
      
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
