// repositories/profile/supabase-profile-repository.ts
import { supabase } from "@/lib/supabase";
import { mapPostgres } from "@/lib/supabase-postgres-helper";
import type { ProfileEntity } from "@/types/profile";
import type { ProfileRepository } from "./profile-repository-interface";
import type { Option } from "@/lib/option";

export const supabaseProfileRepository: ProfileRepository = {
  async create(profile: ProfileEntity): Promise<Option<ProfileEntity>> {
    const { data, error, status } = await supabase
      .from("profiles")
      .insert(profile)
      .select();

    if (error) throw mapPostgres(error, status);

    return data && data.length > 0 ? (data[0] as ProfileEntity) : null;
  },

  async findById(id: string): Promise<Option<ProfileEntity>> {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);

    if (error) throw mapPostgres(error, status);

    return data && data.length > 0 ? (data[0] as ProfileEntity) : null;
  },
};
