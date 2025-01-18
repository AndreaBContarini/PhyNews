/*
  # Initial Schema Setup for Physics Podcast Service

  1. New Tables
    - `users`
      - Extends Supabase auth.users
      - Stores subscription status
    - `articles`
      - Stores processed arXiv articles
      - Includes summaries and audio URLs
    - `user_preferences`
      - Stores user preferences for physics fields
    - `categories`
      - Physics field categories

  2. Security
    - Enable RLS on all tables
    - Policies for user access
*/

-- Categories for physics fields
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by all users"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- User preferences for physics fields
CREATE TABLE user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  category_id uuid REFERENCES categories NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category_id)
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Articles from arXiv
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  arxiv_id text UNIQUE NOT NULL,
  title text NOT NULL,
  abstract text NOT NULL,
  summary text NOT NULL,
  audio_url text,
  category_id uuid REFERENCES categories NOT NULL,
  published_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Subscribers can view articles"
  ON articles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'stripe_subscription_status' = 'active'
    )
  );

-- Insert initial physics categories
INSERT INTO categories (name, slug) VALUES
  ('Quantum Physics', 'quant-ph'),
  ('High Energy Physics', 'hep'),
  ('Condensed Matter', 'cond-mat'),
  ('General Relativity', 'gr-qc'),
  ('Nuclear Physics', 'nucl'),
  ('Mathematical Physics', 'math-ph'),
  ('Classical Physics', 'class-ph');