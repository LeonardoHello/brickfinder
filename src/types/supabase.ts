type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string | null;
  created_at: string;
  deleted_at: string | null;
  invited_at: string | null;
  updated_at: string;
  instance_id: string;
  is_sso_user: boolean;
  banned_until: string | null;
  confirmed_at: string;
  email_change: string;
  is_anonymous: boolean;
  phone_change: string;
  is_super_admin: boolean | null; // Assuming boolean | null to accommodate the null value
  recovery_token: string;
  last_sign_in_at: string | null;
  recovery_sent_at: string | null;
  raw_app_meta_data: {
    provider: string;
    providers: string[]; // Assuming providers is an array of strings
  };
  confirmation_token: string;
  email_confirmed_at: string;
  encrypted_password: string | null;
  phone_change_token: string;
  phone_confirmed_at: string | null;
  raw_user_meta_data: {
    iss: string;
    sub: string;
    name: string;
    email: string;
    picture: string;
    full_name: string;
    avatar_url: string;
    provider_id: string;
    email_verified: boolean;
    phone_verified: boolean;
  };
  confirmation_sent_at: string | null;
  email_change_sent_at: string | null;
  phone_change_sent_at: string | null;
  email_change_token_new: string;
  reauthentication_token: string;
  reauthentication_sent_at: string | null;
  email_change_token_current: string;
  email_change_confirm_status: number; // Assuming number to match the provided value
};

export type InsertPayload = {
  type: "INSERT";
  table: string;
  schema: string;
  record: User;
  old_record: null;
};

export type UpdatePayload = {
  type: "UPDATE";
  table: string;
  schema: string;
  record: User;
  old_record: User;
};

export type DeletePayload = {
  type: "DELETE";
  table: string;
  schema: string;
  record: null;
  old_record: User;
};
