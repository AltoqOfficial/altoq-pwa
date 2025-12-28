import { AgeRangeEntity } from "@/types/age-range";
import type { Option } from "@/lib/option";

export interface AgeRangeRepository {
  findByCode: (code: string) => Promise<Option<AgeRangeEntity>>;
}
