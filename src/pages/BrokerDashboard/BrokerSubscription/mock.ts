import type {
  CurrentPlanSummary,
  InvoiceDetails,
  InvoiceRow,
  PaymentMethod,
  PlanConfig,
  PricingPlan,
  SeatUsageSummary,
} from "./types";

export const planConfigsMock: Record<string, PlanConfig> = {
  solo: {
    id: "solo",
    name: "Solo",
    activeDealsLimit: 25,
    referralPartnersLimit: 3,
    brokerSeatsIncluded: 1,
    monthlyPrice: 69,
    yearlyPrice: 745.2,
    priceSuffixMonthly: "/month + GST",
    priceSuffixYearly: "/year + GST",
    features: [
      { id: "solo-f1", label: "1 paid seat plus admin" },
      { id: "solo-f2", label: "Custom branding for referrer partners" },
      { id: "solo-f3", label: "3 included referral partners" },
      { id: "solo-f4", label: "$5 per additional referral partner" },
      { id: "solo-f5", label: "14-day free trial" },
    ],
  },
  mediumOffice: {
    id: "mediumOffice",
    name: "Medium Office",
    activeDealsLimit: 100,
    referralPartnersLimit: 15,
    brokerSeatsIncluded: 3,
    monthlyPrice: 138,
    yearlyPrice: 1490.4,
    priceSuffixMonthly: "/month + GST",
    priceSuffixYearly: "/year + GST",
    features: [
      { id: "mo-f1", label: "3 paid seats for the price of 2" },
      { id: "mo-f2", label: "2 admin seats included" },
      { id: "mo-f3", label: "Reporting access & text updates" },
      { id: "mo-f4", label: "Direct feed into CRM (API/Zapier)" },
      { id: "mo-f5", label: "5 referral partners per broker included" },
      { id: "mo-f6", label: "$5 per extra referral partner set up above 5/broker" },
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    activeDealsLimit: "Unlimited",
    referralPartnersLimit: "Unlimited",
    brokerSeatsIncluded: 5,
    monthlyPrice: null,
    yearlyPrice: null,
    priceSuffixMonthly: "",
    priceSuffixYearly: "",
    features: [
      { id: "ent-f1", label: "5 paid user seats" },
      { id: "ent-f2", label: "Custom pricing for additional seats" },
      { id: "ent-f3", label: "All premium features" },
      { id: "ent-f4", label: "Premium support" },
      { id: "ent-f5", label: "14-day free trial" },
    ],
  },
};

export const currentPlanMock: CurrentPlanSummary = {
  planId: "mediumOffice",
  planName: "Medium Office",
  price: 138,
  priceSuffix: "/month + GST",
  features: planConfigsMock.mediumOffice.features,
  nextBillingDate: "Jan 01, 2026",
  billingCycle: "monthly",
  billingCycleLabel: "Monthly",
  activeDealsLimit: 100,
  referralPartnersLimit: 15,
  brokerSeatsIncluded: 3,
};

export const seatUsageMock: SeatUsageSummary = {
  usedSeats: 2,
  totalSeats: 3,
  additionalSeatMonthlyCost: 69,
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
    subLabel: "BSB: ••• ••• • Account: ••• 5678",
    isDefault: false,
  },
];

export const invoicesMock: InvoiceRow[] = [
  {
    id: "inv-9201",
    invoiceDate: "Dec 01, 2025",
    planName: "Medium Office Plan",
    invoiceRef: "INV-9201",
    amount: 138,
    status: "Paid",
  },
  {
    id: "inv-9200",
    invoiceDate: "Nov 01, 2025",
    planName: "Medium Office Plan",
    invoiceRef: "INV-9200",
    amount: 138,
    status: "Paid",
  },
  {
    id: "inv-9199",
    invoiceDate: "Oct 01, 2025",
    planName: "Medium Office Plan",
    invoiceRef: "INV-9199",
    amount: 138,
    status: "Paid",
  },
];

export const pricingPlansMock: PricingPlan[] = [
  {
    id: "solo",
    name: "Solo",
    tagline: "Perfect for individual brokers",
    monthly: {
      amount: 69,
      label: "$69",
      suffix: "/month + GST",
    },
    yearly: {
      amount: 745.2,
      label: "$745.20",
      suffix: "/year + GST",
    },
    features: [
      "1 paid seat plus admin",
      "Custom branding for partners",
      "3 included referral partners",
      "$5 per additional partner",
      "14-day free trial",
    ],
    ctaLabel: "Choose Solo",
  },
  {
    id: "mediumOffice",
    name: "Medium Office",
    tagline: "For growing brokerages",
    monthly: {
      amount: 138,
      label: "$138",
      suffix: "/month + GST",
    },
    yearly: {
      amount: 1490.4,
      label: "$1,490.40",
      suffix: "/year + GST",
    },
    features: [
      "3 paid seats for the price of 2",
      "2 admin seats included",
      "5 referral partners per broker",
      "Reporting access",
      "Text updates to partners",
      "Direct feed into CRM",
    ],
    ctaLabel: "Choose Medium Office",
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large organizations",
    monthly: {
      amount: null,
      label: "Contact Support",
    },
    yearly: {
      amount: null,
      label: "Contact Support",
    },
    features: [
      "Premium support",
      "5 paid user seats",
      "Custom pricing for additions",
      "All features included",
      "14-day free trial",
    ],
    ctaLabel: "Contact Support",
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
