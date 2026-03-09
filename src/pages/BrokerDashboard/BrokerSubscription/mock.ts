import type {
  CurrentPlanSummary,
  InvoiceDetails,
  InvoiceRow,
  PaymentMethod,
  PricingPlan,
  SeatUsageSummary,
} from "./types";

export const currentPlanMock: CurrentPlanSummary = {
  planName: "Professional Plan",
  price: 149,
  priceSuffix: "/month",
  features: [
    { id: "f1", label: "Up to 100 active deals" },
    { id: "f2", label: "Unlimited referral partners" },
    { id: "f3", label: "Automated commission calculations" },
    { id: "f4", label: "Email notifications" },
    { id: "f5", label: "Basic reporting" },
    { id: "f6", label: "Up to 5 broker seats included" },
  ],
  nextBillingDate: "Jan 01, 2026",
  billingCycleLabel: "Monthly",
  activeDealsLimit: 100,
  referralPartnersLimit: "Unlimited",
  brokerSeatsIncluded: 5,
};

export const seatUsageMock: SeatUsageSummary = {
  usedSeats: 3,
  totalSeats: 5,
  additionalSeatMonthlyCost: 29,
};

export const paymentMethodsMock: PaymentMethod[] = [
  {
    id: "pm-1",
    type: "card",
    label: "Visa ending in 4242",
    subLabel: "Expires 12/28",
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "bank",
    label: "Bank Direct Debit",
    subLabel: "BSB: ••• Account: ••• 5678",
    isDefault: false,
  },
];

export const invoicesMock: InvoiceRow[] = [
  {
    id: "inv-9201",
    invoiceDate: "Dec 01, 2025",
    planName: "Professional Plan",
    invoiceRef: "INV-9201",
    amount: 149,
    status: "Paid",
  },
  {
    id: "inv-9200",
    invoiceDate: "Nov 01, 2025",
    planName: "Professional Plan",
    invoiceRef: "INV-9200",
    amount: 149,
    status: "Paid",
  },
  {
    id: "inv-9199",
    invoiceDate: "Oct 01, 2025",
    planName: "Professional Plan",
    invoiceRef: "INV-9199",
    amount: 149,
    status: "Paid",
  },
];

export const pricingPlansMock: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for individual brokers",
    priceLabel: "$49",
    priceSuffix: "/Month",
    features: [
      "Up to 25 active deals",
      "5 referral partners",
      "$5 per additional referral partner",
      "Automated calculations",
      "Email notifications",
      "Basic reporting",
    ],
    ctaLabel: "Start Free Trail",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing brokerages",
    priceLabel: "$149",
    priceSuffix: "/Month",
    features: [
      "Up to 100 active deals",
      "Unlimited referral partners",
      "Advanced automation",
      "Email & SMS notifications",
      "Advanced reporting & exports",
      "Priority support",
      "Start Free Trial",
    ],
    ctaLabel: "Start Free Trail",
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large organizations",
    priceLabel: "Custom",
    features: [
      "contact sales",
      "Unlimited deals",
      "Unlimited users",
      "Custom integrations",
      "White-label options",
      "Dedicated account manager",
      "24/7 premium support",
      "24/7 premium support",
    ],
    ctaLabel: "Contact Sales",
  },
];

export const invoiceDetailsMock: InvoiceDetails = {
  invoiceId: "INV-9201",
  issueDate: "Dec 01, 2025",
  status: "Paid",
  fromName: "ReferNow",
  fromDepartment: "Billing Department",
  fromEmail: "support@refernow.com",
  billToName: "PrimeEstates",
  billToContact: "Tom Harris",
  billToEmail: "tom@primeestates.com",
  items: [
    {
      id: "line-1",
      description: "Professional Plan (Monthly)",
      quantity: 1,
      unitPrice: 149,
      amount: 149,
    },
    {
      id: "line-2",
      description: "Additional Broker Seat",
      quantity: 1,
      unitPrice: 29,
      amount: 29,
    },
  ],
  subtotal: 178,
  taxLabel: "Tax (GST 10%)",
  taxAmount: 17.8,
  totalPaid: 195.8,
  paymentMethodLabel: "Payment Method",
  paymentMethodValue: "Visa ending 4242",
  paidOnLabel: "Paid on",
  paidOnValue: "Dec 01, 2025",
  footerNote:
    "Thank you for your business. For questions about this invoice, contact support@refernow.com",
};
