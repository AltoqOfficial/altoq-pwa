// repositories/profile/profile-repository-interface.ts
import type { ProfileEntity } from "@/types/profile";
import type { Option } from "@/lib/option";

export interface ProfileRepository {
  create(profile: ProfileEntity): Promise<Option<ProfileEntity>>;
  findById(id: string): Promise<Option<ProfileEntity>>;
}
