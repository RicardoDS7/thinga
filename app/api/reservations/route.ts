// app/api/reservations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

interface ReservationData {
  // User details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Booking details
  listingId: string;
  listingTitle: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  
  // Pricing breakdown
  pricePerDay: number;
  subtotal: number;
  depositAmount: number;
  serviceFee: number;
  taxes: number;
  total: number;
  currency: string;
  
  // Optional listing details
  category?: string;
  location?: string;
  ownerName?: string;
  ownerEmail?: string;
}

export async function POST(request: NextRequest) {
  try {
    const reservationData: ReservationData = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'listingId', 'listingTitle', 'startDate', 'endDate'];
    const missingFields = requiredFields.filter(field => !reservationData[field as keyof ReservationData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if Gmail credentials are available
    if (!process.env.GMAIL_ADDRESS || !process.env.GOOGLE_APP_PASSWORD) {
      console.error('Gmail credentials not found in environment variables');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: reservationData.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    // Format dates
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Email content
    const emailSubject = `🎯 New Reservation Request: ${reservationData.listingTitle}`;
    
    const emailText = `
NEW RESERVATION REQUEST

📋 LISTING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Listing ID:     ${reservationData.listingId}
• Item:           ${reservationData.listingTitle}
• Category:       ${reservationData.category || 'Not specified'}
• Location:       ${reservationData.location || 'Not specified'}
• Owner:          ${reservationData.ownerName || 'Not specified'}

📅 RENTAL PERIOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Start Date:     ${formatDate(reservationData.startDate)}
• End Date:       ${formatDate(reservationData.endDate)}
• Duration:       ${reservationData.numberOfDays} ${reservationData.numberOfDays === 1 ? 'day' : 'days'}

💰 PRICING BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Daily Rate:     ${formatCurrency(reservationData.pricePerDay)} × ${reservationData.numberOfDays} days
• Rental Cost:    ${formatCurrency(reservationData.subtotal)}
• Security Deposit: ${formatCurrency(reservationData.depositAmount)}
• Service Fee:    ${formatCurrency(reservationData.serviceFee)}
• Taxes:          ${formatCurrency(reservationData.taxes)}
• ─────────────────────────────────────────
• TOTAL:          ${formatCurrency(reservationData.total)}
${reservationData.depositAmount > 0 ? `  (Includes ${formatCurrency(reservationData.depositAmount)} refundable deposit)` : ''}

👤 CUSTOMER CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Name:           ${reservationData.firstName} ${reservationData.lastName}
• Email:          ${reservationData.email}
• Phone:          ${reservationData.phone}

🔔 NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contact the customer to confirm availability
2. Arrange pickup/delivery details
3. Process payment and security deposit
4. Update booking status in admin panel

⏰ Request submitted: ${new Date().toLocaleString()}
    `.trim();

    // HTML version for better formatting
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #10b981; margin-bottom: 30px; text-align: center;">🎯 New Reservation Request</h1>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0369a1; margin-top: 0;">📋 Listing Details</h2>
            <p><strong>Listing ID:</strong> ${reservationData.listingId}</p>
            <p><strong>Item:</strong> ${reservationData.listingTitle}</p>
            <p><strong>Category:</strong> ${reservationData.category || 'Not specified'}</p>
            <p><strong>Location:</strong> ${reservationData.location || 'Not specified'}</p>
            <p><strong>Owner:</strong> ${reservationData.ownerName || 'Not specified'}</p>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #15803d; margin-top: 0;">📅 Rental Period</h2>
            <p><strong>Start Date:</strong> ${formatDate(reservationData.startDate)}</p>
            <p><strong>End Date:</strong> ${formatDate(reservationData.endDate)}</p>
            <p><strong>Duration:</strong> ${reservationData.numberOfDays} ${reservationData.numberOfDays === 1 ? 'day' : 'days'}</p>
          </div>

          <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #ca8a04; margin-top: 0;">💰 Pricing Breakdown</h2>
            <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 10px;">
              <p><strong>Daily Rate:</strong> ${formatCurrency(reservationData.pricePerDay)} × ${reservationData.numberOfDays} days</p>
              <p><strong>Rental Cost:</strong> ${formatCurrency(reservationData.subtotal)}</p>
              <p><strong>Security Deposit:</strong> ${formatCurrency(reservationData.depositAmount)}</p>
              <p><strong>Service Fee:</strong> ${formatCurrency(reservationData.serviceFee)}</p>
              <p><strong>Taxes:</strong> ${formatCurrency(reservationData.taxes)}</p>
            </div>
            <p style="font-size: 18px; font-weight: bold; color: #dc2626;">
              <strong>TOTAL: ${formatCurrency(reservationData.total)}</strong>
              ${reservationData.depositAmount > 0 ? `<br><small style="font-size: 14px; color: #6b7280;">(Includes ${formatCurrency(reservationData.depositAmount)} refundable deposit)</small>` : ''}
            </p>
          </div>

          <div style="background-color: #fdf2f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #be185d; margin-top: 0;">👤 Customer Contact Details</h2>
            <p><strong>Name:</strong> ${reservationData.firstName} ${reservationData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${reservationData.email}">${reservationData.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${reservationData.phone}">${reservationData.phone}</a></p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <h2 style="color: #374151; margin-top: 0;">🔔 Next Steps</h2>
            <ol style="color: #4b5563;">
              <li>Contact the customer to confirm availability</li>
              <li>Arrange pickup/delivery details</li>
              <li>Process payment and security deposit</li>
              <li>Update booking status in admin panel</li>
            </ol>
          </div>

          <p style="text-align: center; color: #6b7280; margin-top: 30px; font-size: 14px;">
            ⏰ Request submitted: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `;

    // Send email to admin
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_ADDRESS,
        to: process.env.GMAIL_ADDRESS, // Send to yourself
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Failed to send admin email:', emailError);
      // Continue execution - we'll still try to send customer email
    }

    // Optional: Send confirmation email to customer
    const customerEmailSubject = `Reservation Request Received - ${reservationData.listingTitle}`;
    const customerEmailText = `
Hi ${reservationData.firstName},

Thank you for your reservation request! We've received your request for:

${reservationData.listingTitle}
${formatDate(reservationData.startDate)} - ${formatDate(reservationData.endDate)}
Total: ${formatCurrency(reservationData.total)}

We'll review your request and get back to you within 24 hours to confirm availability and arrange the next steps.

Best regards,
The Thingo Team
    `;

    // Send confirmation to customer
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_ADDRESS,
        to: reservationData.email,
        subject: customerEmailSubject,
        text: customerEmailText,
      });
    } catch (emailError) {
      console.error('Failed to send customer email:', emailError);
      // Don't fail the entire request if customer email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Reservation request submitted successfully',
        reservationId: `RES-${Date.now()}` // Generate a simple reservation ID
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing reservation:', error);
    return NextResponse.json(
      { error: 'Failed to process reservation request' },
      { status: 500 }
    );
  }
}