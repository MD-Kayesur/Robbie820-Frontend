export type BillingCycle = "monthly" | "yearly";
export type PaymentMethodType = "card" | "bank";
export type SubscriptionPlanKey = "starter" | "professional" | "enterprise";
export type InvoiceStatus = "Paid" | "Pending";

export type CurrentPlanFeature = {
  id: string;
  label: string;
};

export type CurrentPlanSummary = {
  planId: SubscriptionPlanKey;
  planName: string;
  price: number;
  priceSuffix: string;
  features: CurrentPlanFeature[];
  nextBillingDate: string;
  billingCycle: BillingCycle;
  billingCycleLabel: string;
  activeDealsLimit: number | "Unlimited";
  referralPartnersLimit: number | "Unlimited";
  brokerSeatsIncluded: number | "Unlimited";
};

export type SeatUsageSummary = {
  usedSeats: number;
  totalSeats: number;
  additionalSeatMonthlyCost: number;
};

export type PaymentMethod = {
  id: string;
  type: PaymentMethodType;
  label: string;
  subLabel: string;
  isDefault: boolean;
};

export type InvoiceRow = {
  id: string;
  invoiceDate: string;
  planName: string;
  invoiceRef: string;
  amount: number;
  status: InvoiceStatus;
};

export type PricingPlanPrice = {
  amount: number | null;
  label: string;
  suffix?: string;
};

export type PricingPlan = {
  id: SubscriptionPlanKey;
  name: string;
  tagline: string;
  monthly: PricingPlanPrice;
  yearly: PricingPlanPrice;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
};

export type PaymentMethodFormCard = {
  type: "card";
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isDefault: boolean;
};

export type PaymentMethodFormBank = {
  type: "bank";
  accountName: string;
  bsb: string;
  accountNumber: string;
  isDefault: boolean;
};

export type PaymentMethodForm = PaymentMethodFormCard | PaymentMethodFormBank;

export type InvoiceLineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type InvoiceDetails = {
  invoiceId: string;
  issueDate: string;
  status: InvoiceStatus;
  fromName: string;
  fromDepartment: string;
  fromEmail: string;
  billToName: string;
  billToContact: string;
  billToEmail: string;
  items: InvoiceLineItem[];
  subtotal: number;
  taxLabel: string;
  taxAmount: number;
  totalPaid: number;
  paymentMethodLabel: string;
  paymentMethodValue: string;
  paidOnLabel: string;
  paidOnValue: string;
  footerNote: string;
};

export type PlanConfig = {
  id: SubscriptionPlanKey;
  name: string;
  activeDealsLimit: number | "Unlimited";
  referralPartnersLimit: number | "Unlimited";
  brokerSeatsIncluded: number | "Unlimited";
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  priceSuffixMonthly: string;
  priceSuffixYearly: string;
  features: CurrentPlanFeature[];
};
