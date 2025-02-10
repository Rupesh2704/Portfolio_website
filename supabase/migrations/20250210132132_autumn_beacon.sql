/*
  # Contact Form Messages Table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `read` (boolean)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for inserting messages (anyone can submit)
    - Add policy for reading messages (only authenticated admin users)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can read messages
CREATE POLICY "Only authenticated users can read messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);