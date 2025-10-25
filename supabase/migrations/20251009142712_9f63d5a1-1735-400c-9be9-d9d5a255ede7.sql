-- Add admin role for fredrickmureti612@gmail.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('895da8fe-4105-4119-bdf8-69dd273b99a5', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;