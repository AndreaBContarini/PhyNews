import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const createSubscription = async (userId: string, email: string) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'PhysicsCast Monthly Subscription',
              description: 'Daily physics news in audio format',
            },
            unit_amount: 500, // €5.00
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${window.location.origin}/dashboard?success=true`,
      cancel_url: `${window.location.origin}/dashboard?canceled=true`,
      metadata: {
        userId,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};