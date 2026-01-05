export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DaySchedule = {
  enabled: boolean;
  open?: string;
  close?: string;
};

export type OpeningHours = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

export type StoreSettings = {
  isOpen: boolean;          // calculado
  acceptOrders: boolean;   // calculado
  manuallyPaused: boolean; // 👈 CONTROLA PAUSE
  openingHours: OpeningHours;
};