import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentButton = ({ amount = 999, name = "Petfinder Donation" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Define API base URL
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://company-server.vercel.app' 
    : 'http://localhost:5000';

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
        console.log('Razorpay SDK loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
        setError('Failed to load payment gateway. Please try again later.');
      };
      document.body.appendChild(script);
    };
    
    loadRazorpay();
    
    // Cleanup
    return () => {
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        // Don't remove the script as it might be used by other components
      }
    };
  }, []);

  // Direct Razorpay integration that doesn't rely on server for order creation
  const handleDirectPayment = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    if (!razorpayLoaded) {
      setError('Payment gateway is still loading. Please try again in a moment.');
      setLoading(false);
      return;
    }
    
    try {
      const options = {
        key: 'rzp_test_meV9t8O4qJOHIb',
        amount: amount * 100, // in smallest currency unit (paise)
        currency: 'INR',
        name: 'Petfinder',
        description: name,
        image: 'https://i.imgur.com/3g7nmJC.png',
        handler: function(response) {
          console.log('Payment successful:', response);
          setSuccess(true);
          setLoading(false);
          alert('Test payment successful! Thank you for your donation to Petfinder.');
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: {
          purpose: 'Petfinder Donation'
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed');
            setLoading(false);
          }
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      
      paymentObject.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  // Original server-based implementation
  const displayRazorpay = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      if (!razorpayLoaded) {
        setError('Payment gateway is still loading. Please try again in a moment.');
        setLoading(false);
        return;
      }

      console.log('Creating order with API URL:', `${API_URL}/api/create-order`);
      
      // Create order on server
      const orderResponse = await axios.post(`${API_URL}/api/create-order`, {
        amount,
        notes: { purpose: name }
      });

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || 'Failed to create payment order');
      }

      const { order } = orderResponse.data;

      // Configure Razorpay options
      const options = {
        key: 'rzp_test_meV9t8O4qJOHIb', // Razorpay Test Key ID
        amount: order.amount, // Amount is in currency subunits (paise)
        currency: order.currency,
        name: "Petfinder",
        description: name,
        image: "https://i.imgur.com/3g7nmJC.png", // Company logo or product image
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on server
            const verifyResponse = await axios.post(`${API_URL}/api/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              setSuccess(true);
              alert('Payment successful! Thank you for your donation to Petfinder.');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setError('Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        notes: {
          purpose: "Petfinder Donation"
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // Create Razorpay instance
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      // Handle payment failure
      paymentObject.on('payment.failed', function (response) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
    } catch (error) {
      console.error('Razorpay error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {success ? (
        <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
          Thank you for your donation to Petfinder!
        </div>
      ) : (
        <>
          <button
            onClick={handleDirectPayment} // Use the direct method instead of server-based method
            disabled={loading || !razorpayLoaded}
            className="inline-flex items-center px-5 py-2 md:px-6 md:py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {!razorpayLoaded ? 'Loading...' : loading ? 'Processing...' : `Support ₹${amount}`}
            {!loading && razorpayLoaded && (
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </>
      )}
      <p className="text-xs text-gray-500 mt-2">
        This is a test payment. No actual money will be charged.
      </p>
    </div>
  );
};

export default PaymentButton;
