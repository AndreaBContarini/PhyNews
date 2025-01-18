import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { createSubscription } from '../lib/stripe';
import { Loader2 } from 'lucide-react';

export default function Subscribe() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error('User email not found');

      const { url } = await createSubscription(user.id, user.email);
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8 p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm text-center">
        <h2 className="text-3xl font-bold text-white">Complete Your Subscription</h2>
        <p className="text-gray-400">
          You're just one step away from accessing the latest physics discoveries in audio format.
        </p>

        <div className="p-6 border border-gray-700 rounded-lg">
          <div className="mb-4">
            <span className="text-4xl font-bold">€5</span>
            <span className="text-gray-400">/month</span>
          </div>
          <ul className="text-left space-y-3 mb-6">
            <li className="flex items-center text-gray-300">
              <span className="mr-2">✓</span> Daily physics news summaries
            </li>
            <li className="flex items-center text-gray-300">
              <span className="mr-2">✓</span> Audio versions of all summaries
            </li>
            <li className="flex items-center text-gray-300">
              <span className="mr-2">✓</span> Access to complete archive
            </li>
            <li className="flex items-center text-gray-300">
              <span className="mr-2">✓</span> Cancel anytime
            </li>
          </ul>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Start Free Trial'
            )}
          </button>
        </div>

        <p className="text-sm text-gray-400">
          Your free trial will begin immediately. You won't be charged until the trial ends.
        </p>
      </div>
    </div>
  );
}