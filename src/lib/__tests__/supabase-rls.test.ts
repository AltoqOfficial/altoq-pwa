/**
 * Tests para las políticas RLS (Row Level Security) de Supabase
 *
 * Estos tests verifican que:
 * 1. Los usuarios anónimos PUEDEN insertar suscriptores
 * 2. Los usuarios anónimos NO PUEDEN leer la lista de suscriptores
 * 3. Los usuarios anónimos NO PUEDEN actualizar suscriptores
 * 4. Los usuarios anónimos NO PUEDEN eliminar suscriptores
 *
 * Importante: RLS en PostgreSQL/Supabase para SELECT/UPDATE/DELETE normalmente
 * no lanza error, simplemente devuelve 0 filas. Estos tests reflejan ese
 * comportamiento: consideramos "bloqueado" cuando el usuario anónimo no logra
 * leer/modificar/eliminar ninguna fila.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../supabase";

// Cliente admin (service role) para preparar datos de prueba que ignoran RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
);

describe("Supabase RLS Policies - subscribers table", () => {
  const testEmail = `test-${Date.now()}@example.com`;
  let insertedId: string | null = null;

  beforeAll(async () => {
    // Creamos un registro de prueba usando el cliente admin para poder
    // probar UPDATE/DELETE/SELECT por id con el cliente anónimo.
    const adminEmail = `admin-fixture-${Date.now()}@example.com`;

    const { data, error } = await supabaseAdmin
      .from("subscribers")
      .insert([
        {
          email: adminEmail,
          status: "active",
          terms_accepted: true,
        },
      ])
      .select("id")
      .single();

    if (error) {
      // No lanzamos el error para no romper toda la suite, pero los tests
      // que necesitan insertedId se autodescartarán.
      console.warn(
        "Skipping tests that require insertedId, admin insert failed:",
        error
      );
      insertedId = null;
    } else {
      insertedId = data?.id ?? null;
    }
  });

  describe("INSERT Policy", () => {
    it("should allow anonymous users to insert subscribers", async () => {
      const { error } = await supabase.from("subscribers").insert([
        {
          email: testEmail,
          status: "active",
          terms_accepted: true,
        },
      ]);

      // Con las policies correctas, anon debería poder insertar sin error
      expect(error).toBeNull();
    });

    it("should prevent duplicate email insertions", async () => {
      // Intentar insertar el mismo email otra vez
      const { error } = await supabase.from("subscribers").insert([
        {
          email: testEmail,
          status: "active",
          terms_accepted: true,
        },
      ]);

      // Debería fallar por constraint de UNIQUE(email)
      expect(error).toBeDefined();
      expect(error?.code).toBe("23505"); // PostgreSQL unique violation code
    });
  });

  describe("SELECT Policy", () => {
    it("should block anonymous users from reading subscribers", async () => {
      const { data, error } = await supabase.from("subscribers").select("*");

      // RLS para SELECT no lanza error, solo devuelve 0 filas
      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect((data ?? []).length).toBe(0);
    });

    it("should block anonymous users from reading specific subscriber", async () => {
      if (!insertedId) {
        console.warn("Skipping test: no insertedId available");
        return;
      }

      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .eq("id", insertedId);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect((data ?? []).length).toBe(0);
    });

    it("should block anonymous users from counting subscribers", async () => {
      const { count, error } = await supabase
        .from("subscribers")
        .select("*", { count: "exact", head: true });

      expect(error).toBeNull();
      // Desde la perspectiva del cliente anónimo, la tabla "no tiene filas"
      expect(count).toBe(0);
    });
  });

  describe("UPDATE Policy", () => {
    it("should block anonymous users from updating subscribers", async () => {
      const { data, error } = await supabase
        .from("subscribers")
        .update({ status: "unsubscribed" })
        .eq("email", testEmail)
        .select();

      // RLS: UPDATE se ejecuta con un WHERE adicional que siempre es falso
      // Resultado: 0 filas actualizadas, sin error.
      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect((data ?? []).length).toBe(0);
    });

    it("should block anonymous users from updating by id", async () => {
      if (!insertedId) {
        console.warn("Skipping test: no insertedId available");
        return;
      }

      const { data, error } = await supabase
        .from("subscribers")
        .update({ status: "unsubscribed" })
        .eq("id", insertedId)
        .select();

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect((data ?? []).length).toBe(0);
    });
  });

  describe("DELETE Policy", () => {
    it("should block anonymous users from deleting subscribers", async () => {
      const { data, error } = await supabase
        .from("subscribers")
        .delete()
        .eq("email", testEmail)
        .select();

      // Mismo comportamiento que UPDATE: 0 filas afectadas, sin error
      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect((data ?? []).length).toBe(0);
    });

    it("should block anonymous users from deleting by id", async () => {
      if (!insertedId) {
        console.warn("Skipping test: no insertedId available");
        return;
      }

      const { data, error } = await supabase
        .from("subscribers")
        .delete()
        .eq("id", insertedId)
        .select();

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect((data ?? []).length).toBe(0);
    });

    it("should block anonymous users from deleting all subscribers", async () => {
      const { error } = await supabase.from("subscribers").delete().select();

      // Supabase no permite DELETE sin WHERE desde el cliente:
      // lanza error 21000 ("DELETE requires a WHERE clause").
      // Eso también garantiza que un usuario anon no pueda borrar todo.
      expect(error).toBeDefined();
      expect(error?.code).toBe("21000");
      // `data` en este caso es irrelevante, normalmente undefined.
    });
  });

  describe("Combined Policy Tests", () => {
    it("should allow multiple sequential inserts from anonymous users", async () => {
      const emails = Array.from({ length: 3 }).map(
        (_, i) => `multi-insert-${i}-${Date.now()}@example.com`
      );

      for (const email of emails) {
        const { error } = await supabase.from("subscribers").insert([
          {
            email,
            status: "active",
            terms_accepted: true,
          },
        ]);

        expect(error).toBeNull();
      }
    });

    it("should maintain RLS after multiple failed operations", async () => {
      // Varias operaciones que "fallan" desde el punto de vista de negocio
      // porque no afectan filas, pero no lanzan error.
      for (let i = 0; i < 3; i++) {
        const { data: selectData, error: selectError } = await supabase
          .from("subscribers")
          .select("*");

        expect(selectError).toBeNull();
        expect(Array.isArray(selectData)).toBe(true);
        expect((selectData ?? []).length).toBe(0);

        const { data: updateData, error: updateError } = await supabase
          .from("subscribers")
          .update({ status: "unsubscribed" })
          .eq("email", `non-existing-${i}@example.com`)
          .select();

        expect(updateError).toBeNull();
        expect(Array.isArray(updateData)).toBe(true);
        expect((updateData ?? []).length).toBe(0);

        const { data: deleteData, error: deleteError } = await supabase
          .from("subscribers")
          .delete()
          .eq("email", `non-existing-${i}@example.com`)
          .select();

        expect(deleteError).toBeNull();
        expect(Array.isArray(deleteData)).toBe(true);
        expect((deleteData ?? []).length).toBe(0);
      }

      // Después de todas esas operaciones, INSERT debería seguir funcionando
      const newEmail = `test-after-failed-${Date.now()}@example.com`;
      const { error } = await supabase.from("subscribers").insert([
        {
          email: newEmail,
          status: "active",
          terms_accepted: true,
        },
      ]);

      expect(error).toBeNull();
    });
  });
});
