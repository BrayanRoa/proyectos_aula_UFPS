import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.API_KEY_SEND_GRID ?? '')

export default sgMail