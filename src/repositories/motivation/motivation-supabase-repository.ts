import { supabase } from "@/lib/supabase";
import { mapPostgres } from "@/lib/supabase-postgres-helper";
import type { MotivationEntity } from "@/types/motivation";
import type { MotivationRepository } from "./motivation-repository-interface";
import type { Option } from "@/lib/option";

export const supabaseMotivationRepository: MotivationRepository = {
  async findByCode(code: string): Promise<Option<MotivationEntity>> {
    const { data, error, status } = await supabase
      .from("motivations")
      .select("*")
      .eq("code", code);

    if (error) throw mapPostgres(error, status);

    return data && data.length > 0 ? (data[0] as MotivationEntity) : null;
  },
};
