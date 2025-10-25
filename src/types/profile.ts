export interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  profile_image_url: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
