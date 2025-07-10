/*
  # Add email field to profiles table

  1. Changes
    - Add email column to profiles table
    - Update RLS policies to ensure proper access control
  
  2. Security
    - Maintain existing RLS policies
    - Email field is optional and can be used for additional user info
*/

-- Add email column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email text;
  END IF;
END $$;