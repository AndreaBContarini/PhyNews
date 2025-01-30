import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [subject, setSubject] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Sending feedback...');
      const response = await fetch('https://localhost:3001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          subject: `Feedback PhyNews: ${subject}`,
          feedback
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send feedback');
      }

      setSuccess(true);
      setSubject('');
      setFeedback('');
      
    } catch (err) {
      console.error('Feedback error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send feedback');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
          <button
            onClick={() => {
              onClose();
              setSuccess(false);
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-2">Thank you for your feedback!</h3>
            <p className="text-gray-400">
              Your input helps us improve PhyNews and make it better for everyone.
              We appreciate your contribution to our growth!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Send Feedback</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject of your feedback"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Ideas on how to improve this page. Use the Support Form for technical issues."
              className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !feedback.trim() || !subject.trim()}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send feedback
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-gray-400">
          Have a technical issue? Contact{' '}
          <a
            href="mailto:support@phynews.com"
            className="text-blue-400 hover:text-blue-300"
          >
            support@phynews.com
          </a>
        </div>
      </div>
    </div>
  );
}