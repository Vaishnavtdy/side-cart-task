export type PriceType = "one-time" | "monthly";
export type Currency = "%" | "€";

export interface Discount {
  id: number;
  name: string;
  amount: number;
  currency: Currency;
  type: PriceType;
  enabled: boolean;
  isManual?: boolean;
  duration?: string;
  newPrice?: string;
}
