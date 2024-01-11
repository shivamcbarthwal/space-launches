import { Launch } from "./Launch";

export interface LaunchData {
  results: Launch[];
  count: number;
  next: string | null;
  previous: string | null;
}