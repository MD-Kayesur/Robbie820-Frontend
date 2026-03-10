export type PrivacySection = {
  id: number;
  title: string;
  content: string;
};

export const privacySections: PrivacySection[] = [
  {
    id: 1,
    title: "Information We Collect",
    content:
      "We may collect personal information that you provide directly to us, including your name, email address, phone number, company details, billing details, and account credentials. We may also collect platform usage data, device information, log data, and cookies to improve performance and user experience.",
  },
  {
    id: 2,
    title: "How We Use Your Information",
    content:
      "We use your information to provide and improve our services, manage your account, process payments, communicate important updates, provide support, monitor platform performance, and help maintain security across the ReferNow platform.",
  },
  {
    id: 3,
    title: "Sharing of Information",
    content:
      "We do not sell your personal information. We may share your data with trusted third-party providers that support essential business functions such as cloud hosting, analytics, customer support, and payment processing. These providers only receive access necessary to perform their services.",
  },
  {
    id: 4,
    title: "Cookies and Tracking",
    content:
      "We use cookies and similar technologies to remember preferences, analyze traffic, improve functionality, and enhance user experience. You can control cookie settings through your browser, though some parts of the platform may not function properly if cookies are disabled.",
  },
  {
    id: 5,
    title: "Data Security",
    content:
      "We use administrative, technical, and physical safeguards to protect your information from unauthorized access, loss, misuse, or disclosure. While no system is completely secure, we work to maintain strong protection standards for stored and transmitted data.",
  },
  {
    id: 6,
    title: "Data Retention",
    content:
      "We retain personal information only as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements. When retention is no longer required, data is deleted or securely anonymized.",
  },
  {
    id: 7,
    title: "Your Rights",
    content:
      "Depending on your location, you may have rights to access, update, correct, or delete your personal information. You may also request restrictions on certain processing activities. To make a request, contact us using the details below.",
  },
  {
    id: 8,
    title: "Third-Party Services",
    content:
      "Our platform may contain links or integrations with third-party tools and services. We are not responsible for the privacy practices of those external services, and we encourage users to review their respective privacy policies.",
  },
  {
    id: 9,
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Updated versions will be posted on this page with a revised effective date.",
  },
  {
    id: 10,
    title: "Contact Us",
    content:
      "If you have questions about this Privacy Policy or how your data is handled, please contact us at support@refernow.com.",
  },
];
