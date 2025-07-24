import {defineSecret} from "firebase-functions/params";
import {
  onDocumentCreated,
  FirestoreEvent,
  QueryDocumentSnapshot,
} from "firebase-functions/v2/firestore";
import * as nodemailer from "nodemailer";

// ✅ Define secrets (DO NOT CALL .value() here!)
export const gmailAddress = defineSecret("GMAIL_ADDRESS");
export const gmailPassword = defineSecret("GMAIL_APP_PASSWORD");

// Helper function to format currency
const formatCurrency = (amount: number, currency = "ZAR"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

// ===== EXISTING FUNCTION: New Listing Notifications =====
export const onNewListing = onDocumentCreated(
  {
    document: "listings/{listingId}",
    region: "europe-west1",
    secrets: [gmailAddress, gmailPassword],
  },
  async (
    event: FirestoreEvent<
      QueryDocumentSnapshot | undefined,
      { listingId: string }
    >
  ) => {
    const data = event.data?.data();
    if (!data) return;

    // ✅ Only call .value() inside the function body
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailAddress.value(),
        pass: gmailPassword.value(),
      },
    });

    await transporter.sendMail({
      from: gmailAddress.value(),
      to: gmailAddress.value(),
      subject: `New Listing: ${data.title || "Untitled"}`,
      text: `
A new product has just been requested to listed on Thingo:

## Product Details
• Title:    ${data.title}
• Category: ${data.category}
• Description: ${data.description || "No description provided"}
• Condition: ${data.condition || "Not specified"}
• Images:   ${data.photos}

• Daily Rental Price:    ${data.price || "Not specified"}
• Deposit:  ${data.depositAmount || "No deposit required"}
• Insurance: ${data.insurance ? "Yes" : "No"}

## User Details
• Full Name:     ${data.firstName || "Unknown"} ${data.lastName || "Unknown"}
• Email:    ${data.email || "Unknown"}
• Phone:    ${data.phone || "Unknown"}
• Address:  ${data.streetAddress || "Unknown"}
• City:     ${data.city || "Unknown"}
• Postal Code: ${data.postalcode || "Unknown"}
• Province:  ${data.province || "Unknown"}
• Consent:  ${data.consent ? "Yes" : "No"}

      `.trim(),
    });
  }
);

// ===== NEW FUNCTION: Reservation Notifications =====
export const onNewReservation = onDocumentCreated(
  {
    document: "reservations/{reservationId}",
    region: "europe-west1",
    secrets: [gmailAddress, gmailPassword],
  },
  async (
    event: FirestoreEvent<
      QueryDocumentSnapshot | undefined,
      { reservationId: string }
    >
  ) => {
    const data = event.data?.data();
    if (!data) return;

    // ✅ Only call .value() inside the function body
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailAddress.value(),
        pass: gmailPassword.value(),
      },
    });

    // Extract data from the reservation document
    const {
      listingId,
      listingTitle,
      dateRange,
      numberOfDays,
      calculations,
      pricePerDay,
      currency,
      userDetails,
      createdAt,
    } = data;

    const startDate = dateRange?.startDate ?
      formatDate(dateRange.startDate) :
      "Not specified";
    const endDate = dateRange?.endDate ?
      formatDate(dateRange.endDate) :
      "Not specified";

    const emailSubject = `🔔 New Reservation Request: ${
      listingTitle || "Rental Item"
    }`;

    const depositSection = calculations?.depositAmount > 0 ?
      `
                    <div class="price-row">
                        <span>Security Deposit 
                        <span class="badge">Refundable</span></span>
                        <span>${formatCurrency(
    calculations.depositAmount,
    currency
  )}</span>
                    </div>
                    ` :
      "";

    const serviceFeeSection = calculations?.serviceFee > 0 ?
      `
                    <div class="price-row">
                        <span>Service Fee</span>
                        <span>${formatCurrency(
    calculations.serviceFee,
    currency
  )}</span>
                    </div>
                    ` :
      "";

    const taxSection = calculations?.taxes > 0 ?
      `
                    <div class="price-row">
                        <span>Taxes</span>
                        <span>${formatCurrency(
    calculations.taxes,
    currency
  )}</span>
                    </div>
                    ` :
      "";

    await transporter.sendMail({
      from: gmailAddress.value(),
      to: gmailAddress.value(),
      subject: emailSubject,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 
            'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #10b981, #14b8a6); 
            color: white; 
            padding: 30px; 
            border-radius: 12px 12px 0 0; 
            text-align: center; 
        }
        .content { 
            background: white; 
            border: 1px solid #e5e7eb; 
            border-radius: 0 0 12px 12px; 
        }
        .section { 
            padding: 25px; 
            border-bottom: 1px solid #f3f4f6; 
        }
        .section:last-child { 
            border-bottom: none; 
        }
        .section-title { 
            font-size: 18px; 
            font-weight: 600; 
            color: #1f2937; 
            margin-bottom: 15px; 
            display: flex; 
            align-items: center; 
        }
        .detail-row { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 8px; 
        }
        .detail-label { 
            color: #6b7280; 
        }
        .detail-value { 
            font-weight: 500; 
        }
        .price-breakdown { 
            background: #f9fafb; 
            padding: 20px; 
            border-radius: 8px; 
            margin-top: 15px; 
        }
        .price-row { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 10px; 
        }
        .price-total { 
            border-top: 2px solid #e5e7eb; 
            padding-top: 15px; 
            margin-top: 15px; 
            font-size: 18px; 
            font-weight: 700; 
        }
        .contact-info { 
            background: #eff6ff; 
            padding: 20px; 
            border-radius: 8px; 
        }
        .badge { 
            background: #10b981; 
            color: white; 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: 600; 
        }
        .icon { 
            margin-right: 8px; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">
                🎉 New Reservation Request!
            </h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">
                Someone wants to rent your item
            </p>
        </div>
        
        <div class="content">
            <!-- Rental Details -->
            <div class="section">
                <h2 class="section-title">
                    <span class="icon">📦</span>
                    Rental Details
                </h2>
                <div class="detail-row">
                    <span class="detail-label">Item:</span>
                    <span class="detail-value">
                        ${listingTitle || "Rental Item"}
                    </span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Listing ID:</span>
                    <span class="detail-value">${listingId || "N/A"}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Rental Period:</span>
                    <span class="detail-value">
                        ${numberOfDays || 0} 
                        ${numberOfDays === 1 ? "day" : "days"}
                    </span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Start Date:</span>
                    <span class="detail-value">${startDate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">End Date:</span>
                    <span class="detail-value">${endDate}</span>
                </div>
            </div>

            <!-- Pricing Breakdown -->
            <div class="section">
                <h2 class="section-title">
                    <span class="icon">💰</span>
                    Pricing Breakdown
                </h2>
                <div class="price-breakdown">
                    <div class="price-row">
                        <span>Rental Cost (
                            ${formatCurrency(pricePerDay || 0, currency)} × 
                            ${numberOfDays || 0} days)
                        </span>
                        <span>
                            ${formatCurrency(
    calculations?.subtotal || 0,
    currency
  )}
                        </span>
                    </div>
                    ${depositSection}
                    ${serviceFeeSection}
                    ${taxSection}
                    <div class="price-row price-total">
                        <span>Total Amount</span>
                        <span>
                            ${formatCurrency(
    calculations?.total || 0,
    currency
  )}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Customer Details -->
            <div class="section">
                <h2 class="section-title">
                    <span class="icon">👤</span>
                    Customer Information
                </h2>
                <div class="contact-info">
                    <div class="detail-row">
                        <span class="detail-label">Full Name:</span>
                        <span class="detail-value">
                            ${userDetails?.firstName || "N/A"} 
                            ${userDetails?.surname || ""}
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">
                            <a href="mailto:${userDetails?.email || ""}" 
                               style="color: #2563eb; text-decoration: none;">
                                ${userDetails?.email || "N/A"}
                            </a>
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">
                            <a href="tel:${userDetails?.phone || ""}" 
                               style="color: #2563eb; text-decoration: none;">
                                ${userDetails?.phone || "N/A"}
                            </a>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="section">
                <h2 class="section-title">
                    <span class="icon">⚡</span>
                    Next Steps
                </h2>
                <ol style="margin: 0; padding-left: 20px; color: #4b5563;">
                    <li style="margin-bottom: 8px;">
                        <strong>Contact the customer</strong> 
                        within 24 hours to confirm availability
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>Verify the rental details</strong> 
                        and arrange pickup/delivery
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>Collect payment and deposit</strong> 
                        before releasing the item
                    </li>
                    <li>
                        <strong>Update the reservation status</strong> 
                        in your dashboard
                    </li>
                </ol>
                
                <div style="margin-top: 20px; padding: 15px; 
                            background: #fef3c7; border-radius: 8px; 
                            border-left: 4px solid #f59e0b;">
                    <strong style="color: #92400e;">
                        ⏰ Time Sensitive:
                    </strong>
                    <span style="color: #92400e;">
                        This customer is expecting a response. 
                        Quick replies lead to better reviews and more bookings!
                    </span>
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; 
                    color: #6b7280; font-size: 14px;">
            <p>
                This email was sent automatically when a new reservation 
                was created on Thingo.
            </p>
            <p>
                Reservation created: 
                ${createdAt ? new Date(createdAt).toLocaleString() : "Just now"}
            </p>
        </div>
    </div>
</body>
</html>
        `,
      text: `
🎉 NEW RESERVATION REQUEST

=== RENTAL DETAILS ===
• Item: ${listingTitle || "Rental Item"}
• Listing ID: ${listingId || "N/A"}
• Duration: ${numberOfDays || 0} ${numberOfDays === 1 ? "day" : "days"}
• Start Date: ${startDate}
• End Date: ${endDate}

=== PRICING BREAKDOWN ===
• Rental Cost: ${formatCurrency(calculations?.subtotal || 0, currency)}
${
  calculations?.depositAmount > 0 ?
    `• Security Deposit (Refundable): ${formatCurrency(
      calculations.depositAmount,
      currency
    )}` :
    ""
}
${
  calculations?.serviceFee > 0 ?
    `• Service Fee: ${formatCurrency(calculations.serviceFee, currency)}` :
    ""
}
${
  calculations?.taxes > 0 ?
    `• Taxes: ${formatCurrency(calculations.taxes, currency)}` :
    ""
}
• TOTAL: ${formatCurrency(calculations?.total || 0, currency)}

=== CUSTOMER INFORMATION ===
• Name: ${userDetails?.firstName || "N/A"} ${userDetails?.surname || ""}
• Email: ${userDetails?.email || "N/A"}
• Phone: ${userDetails?.phone || "N/A"}

=== NEXT STEPS ===
1. Contact the customer within 24 hours to confirm availability
2. Verify rental details and arrange pickup/delivery  
3. Collect payment and deposit before releasing the item
4. Update reservation status in your dashboard

⏰ TIME SENSITIVE: Quick responses lead to better reviews!

---
Reservation created: ${
  createdAt ? new Date(createdAt).toLocaleString() : "Just now"
}
        `.trim(),
    });
  }
);
