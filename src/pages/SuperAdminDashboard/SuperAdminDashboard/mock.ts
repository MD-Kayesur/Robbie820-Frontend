import type { DashboardMockData, ToneStyle, Tone } from "./types";

export const toneStyles: Record<Tone, ToneStyle> = {
  indigo: { iconWrap: "bg-indigo-50", icon: "text-indigo-600" },
  blue: { iconWrap: "bg-sky-50", icon: "text-sky-600" },
  emerald: { iconWrap: "bg-emerald-50", icon: "text-emerald-600" },
  amber: { iconWrap: "bg-amber-50", icon: "text-amber-600" },
};

export const dashboardMock: DashboardMockData = {
  licensedUsers: [
    {
      name: "John Smith",
      email: "john@example.com",
      date: "Feb 15, 2026",
      status: "Active",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      date: "Feb 14, 2026",
      status: "Active",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      date: "Feb 13, 2026",
      status: "Active",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      date: "Feb 12, 2026",
      status: "Active",
    },
    {
      name: "David Wilson",
      email: "david@example.com",
      date: "Feb 11, 2026",
      status: "Inactive",
    },
  ],

  registeredAccounts: [
    {
      name: "John Smith",
      email: "john@example.com",
      date: "Feb 15, 2026",
      status: "Active",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      date: "Feb 14, 2026",
      status: "Active",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      date: "Feb 13, 2026",
      status: "Active",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      date: "Feb 12, 2026",
      status: "Active",
    },
    {
      name: "David Wilson",
      email: "david@example.com",
      date: "Feb 11, 2026",
      status: "Inactive",
    },
  ],

  subscriptions: [
    {
      plan: "Pro Plan - Acme Corp",
      email: "billing@acme.com",
      price: "$299/mo",
      status: "Active",
    },
    {
      plan: "Enterprise - TechCo",
      email: "finance@techco.com",
      price: "$999/mo",
      status: "Active",
    },
    {
      plan: "Pro Plan - StartupXYZ",
      email: "admin@startupxyz.com",
      price: "$299/mo",
      status: "Active",
    },
    {
      plan: "Business - GlobalInc",
      email: "billing@globalinc.com",
      price: "$599/mo",
      status: "Active",
    },
  ],

  annualRevenue: [
    { label: "Pro Plan Revenue", value: "$45,600" },
    { label: "Enterprise Revenue", value: "$89,400" },
    { label: "Business Plan Revenue", value: "$23,800" },
  ],

  ranges: [
    "Month to Date (MTD)",
    "Year to Date (YTD)",
    "Last 6 Months",
    "Custom Range",
  ],

  systemHealth: [
    { label: "CRM Sync Status", status: "healthy" },
    { label: "Payment Gateway Status", status: "healthy" },
    { label: "Email Delivery Service", status: "warning" },
    { label: "API Performance", status: "healthy" },
    { label: "Background Job Queue", status: "healthy" },
  ],
};
