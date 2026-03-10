// src/constants/applicationStatus.js

export const APPLICATION_STATUSES = [
  "pending",
  "reviewing",
  "interview",
  "hired",
  "rejected",
];

export const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    bgColor: "bg-amber-100",
    textColor: "text-amber-800",
    borderColor: "border-amber-200",
  },
  reviewing: {
    label: "Reviewing",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
  },
  interview: {
    label: "Interview",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    borderColor: "border-purple-200",
  },
  hired: {
    label: "Hired",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-200",
  },
  rejected: {
    label: "Rejected",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    borderColor: "border-red-200",
  },
};
