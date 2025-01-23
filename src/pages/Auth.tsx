import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'login' ? 'login' : 'signup';

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPasswordError(null);
    
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
    }
    
    setLoading(true);

    try {
      const { error: authError, data } = mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (resetError) {
        setError(resetError.message);
      } else {
        setResetSent(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {resetSent ? 'Check your email' : mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-gray-400">
              {resetSent
                ? 'We sent you a link to reset your password'
                : mode === 'signup'
                ? 'Start your free trial today'
                : 'Sign in to your account'}
            </p>
          </div>

          {resetSent ? (
            <div className="space-y-4">
              <div className="bg-blue-500/10 text-blue-400 p-4 rounded-lg text-center">
                Check your email for the password reset link
              </div>
              <button
                onClick={() => {
                  setResetSent(false);
                  navigate('/auth?mode=login');
                }}
                className="w-full flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  minLength={6}
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm Password"
                    minLength={6}
                  />
                </div>
              )}

              {passwordError && (
                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-md">
                  {passwordError}
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : mode === 'signup' ? (
                  'Create Account'
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center space-y-2">
                <Link
                  to={mode === 'signup' ? '/auth?mode=login' : '/auth?mode=signup'}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  {mode === 'signup'
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </Link>
                {mode === 'login' && (
                  <button
                    onClick={handlePasswordReset}
                    className="block w-full text-sm text-blue-400 hover:text-blue-300"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}