import { MotivationEntity } from "@/types/motivation";
import type { Option } from "@/lib/option";

export interface MotivationRepository {
  findByCode: (code: string) => Promise<Option<MotivationEntity>>;
}
