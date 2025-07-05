import {defineSecret} from "firebase-functions/params";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import nodemailer from "nodemailer";

// ✅ Define secrets (DO NOT CALL .value() here!)
export const gmailAddress = defineSecret("GMAIL_ADDRESS");
export const gmailPassword = defineSecret("GMAIL_APP_PASSWORD");


export const onNewListing = onDocumentCreated(
  {
    document: "listings/{listingId}",
    region: "europe-west1",
    secrets: [gmailAddress, gmailPassword],
  },
  async (event) => {
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
• Full Name:     ${data.fullName || "Unknown"}
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
