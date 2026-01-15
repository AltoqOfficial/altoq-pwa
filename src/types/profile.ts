// domain/profile/profile-entity.ts
export interface ProfileEntity {
  id: string;
  full_name: string;
  age_range_id: number;
  motivation_id: number;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export class Profile implements ProfileEntity {
  id!: string;
  full_name!: string;
  age_range_id!: number;
  motivation_id!: number;
  status!: string;
  created_at!: string;
  updated_at!: string | null;

  private constructor(props: ProfileEntity) {
    Object.assign(this, props);
  }

  /**
   * Factory para crear un nuevo perfil vinculado a un usuario existente.
   */
  static create(params: {
    id: string; // viene del user.id de Auth
    fullName: string;
    ageRangeId: number;
    motivationId: number;
  }): Profile {
    const now = new Date().toISOString();
    return new Profile({
      id: params.id,
      full_name: params.fullName,
      age_range_id: params.ageRangeId,
      motivation_id: params.motivationId,
      status: "ACTIVE",
      created_at: now,
      updated_at: null, // aún no hay actualizaciones
    });
  }

  /**
   * Factory para actualizar un perfil existente.
   */
  static update(
    existing: ProfileEntity,
    changes: Partial<ProfileEntity>
  ): Profile {
    return new Profile({
      ...existing,
      ...changes,
      updated_at: new Date().toISOString(),
    });
  }
}

export interface AgeRangeEntity {
  id: number;
  label: string;
  min_age: number;
  max_age: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MotivationEntity {
  id: number;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}
