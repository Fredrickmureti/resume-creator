-- Fix the get_user_emails_for_admin function to avoid ambiguous column reference
DROP FUNCTION IF EXISTS public.get_user_emails_for_admin();

CREATE OR REPLACE FUNCTION public.get_user_emails_for_admin()
RETURNS TABLE (
  user_id uuid,
  email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to execute this function
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  RETURN QUERY
  SELECT 
    au.id as user_id,
    COALESCE(au.email, 'N/A') as email
  FROM auth.users au;
END;
$$;