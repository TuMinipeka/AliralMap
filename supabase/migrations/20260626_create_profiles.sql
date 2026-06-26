-- ============================================================
-- Tabla pública de perfiles de usuario
-- Se llena automáticamente cuando alguien se registra en Auth
-- ============================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  document_number TEXT        NOT NULL DEFAULT '',
  first_name      TEXT        NOT NULL DEFAULT '',
  last_name       TEXT        NOT NULL DEFAULT '',
  phone           TEXT        NOT NULL DEFAULT '',
  email           TEXT        NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Solo el dueño puede leer su propio perfil
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfil visible solo por su dueño"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Perfil editable solo por su dueño"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- Trigger: al crear un usuario en auth → insertar en profiles
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, document_number, first_name, last_name, phone, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'document_number', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'first_name',      ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name',       ''),
    COALESCE(NEW.raw_user_meta_data ->> 'phone',           ''),
    COALESCE(NEW.email,                                     '')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
