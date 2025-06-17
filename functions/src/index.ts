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
A new product has just been listed on Thinga:

• Title:    ${data.title}
• Category: ${data.category}
• Price:    ${data.price}
      `.trim(),
    });
  }
);
