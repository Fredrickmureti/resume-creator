-- Create a function to get user emails for admin dashboard
-- This is a SECURITY DEFINER function that admins can use to fetch user emails
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
    id as user_id,
    COALESCE(email, 'N/A') as email
  FROM auth.users;
END;
$$;