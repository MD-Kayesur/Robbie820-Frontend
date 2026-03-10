export type HelpItem = {
  id: number;
  question: string;
  answer: string;
};
export const helpItems: HelpItem[] = [
  {
    id: 1,
    question: "What is ReferNow?",
    answer:
      "ReferNow is a platform designed to automate referral tracking and commission management for brokers and referral partners.",
  },
  {
    id: 2,
    question: "How do I create an account?",
    answer:
      "Click the Get Started button on the homepage and follow the registration process to create your account.",
  },
  {
    id: 3,
    question: "How are commissions calculated?",
    answer:
      "ReferNow automatically calculates commissions based on the rules and agreements configured in your dashboard.",
  },
  {
    id: 4,
    question: "Can I manage multiple referral partners?",
    answer:
      "Yes. The platform allows you to manage unlimited referral partners depending on your selected plan.",
  },
  {
    id: 5,
    question: "Is my data secure?",
    answer:
      "Yes. ReferNow uses secure storage, role-based access control, and encryption to protect sensitive business data.",
  },
  {
    id: 6,
    question: "How do I contact support?",
    answer:
      "You can contact support through the platform dashboard or email support@refernow.com for assistance.",
  },
];
