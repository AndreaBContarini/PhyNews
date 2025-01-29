# PhyNews - Scientific Paper Reader & Analyzer

PhyNews is a modern web application that helps researchers and science enthusiasts stay up-to-date with the latest scientific papers from arXiv. It provides an intuitive interface to browse, read, and analyze papers from various physics and computer science categories.

## Features

- **Category-based Navigation**: Browse papers by physics and computer science categories
- **LaTeX Formula Support**: View mathematical formulas rendered beautifully using KaTeX
- **Text-to-Speech**: Listen to paper abstracts and conclusions with natural-sounding speech synthesis
- **User Authentication**: Secure login/signup system powered by Supabase
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Smart Text Processing**: Intelligent handling of scientific notation and formulas

## Tech Stack

- React.js with TypeScript
- Tailwind CSS for styling
- Supabase for authentication and database
- KaTeX for LaTeX rendering
- Web Speech API for text-to-speech
- React Router for navigation

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/phynews.git
   cd phynews
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

