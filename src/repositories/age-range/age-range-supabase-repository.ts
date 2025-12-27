import { supabase } from "@/lib/supabase";
import { mapPostgres } from "@/lib/supabase-postgres-helper";
import type { AgeRangeEntity } from "@/types/age-range";
import type { AgeRangeRepository } from "./age-range-repository-interface";
import type { Option } from "@/lib/option";

export const supabaseAgeRangeRepository: AgeRangeRepository = {
  async findByCode(code: string): Promise<Option<AgeRangeEntity>> {
    const { data, error, status } = await supabase
      .from("age_ranges")
      .select("*")
      .eq("code", code);

    if (error) throw mapPostgres(error, status);

    return data && data.length > 0 ? (data[0] as AgeRangeEntity) : null;
  },
};
