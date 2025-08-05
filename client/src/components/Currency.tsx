import React, { useState, useEffect } from 'react';

// Helper component for displaying an icon with text
const InfoPill = ({ icon, text }) => {
  const pillStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // bg-gray-100
    color: '#4b5563', // text-gray-600
    fontSize: '0.75rem', // text-xs
    fontWeight: '600', // font-semibold
    padding: '0.375rem 0.75rem', // px-3 py-1.5
    borderRadius: '9999px', // rounded-full
  };

  const iconStyle = {
    marginRight: '0.5rem', // ml-2 on the span
  };

  return (
    <div style={pillStyle}>
      <span style={iconStyle}>{icon}</span>
      <span>{text}</span>
    </div>
  );
};


// Main Application Component
const Currency = () => {
  // State management for the application
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const [currencies, setCurrencies] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [baseInfo, setBaseInfo] = useState(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  // useEffect hook to fetch the list of available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        if (!response.ok) throw new Error('Failed to fetch currency list.');
        const data = await response.json();
        setCurrencies(data);
      } catch (err) {
        setError('Could not load currency list. Please try again later.');
        console.error(err);
      }
    };
    fetchCurrencies();
  }, []);

  // Function to handle the currency conversion logic
  const handleConvert = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsResultVisible(false);
    
    if (!amount || isNaN(amount) || amount <= 0) {
        setError('Please enter a valid amount greater than zero.');
        setIsLoading(false);
        return;
    }
    if(fromCurrency === toCurrency) {
        setError('"From" and "To" currencies cannot be the same.');
        setIsLoading(false);
        return;
    }

    const effectiveDate = new Date(date) > new Date() ? 'latest' : date;

    try {
      const response = await fetch(`https://api.frankfurter.app/${effectiveDate}?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred.');
      }
      const data = await response.json();
      setConvertedAmount(data.rates[toCurrency]);
      setBaseInfo({
          amount: data.amount,
          base: data.base,
          date: data.date,
      });
      setIsResultVisible(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to swap the from and to currencies
  const handleSwapCurrencies = () => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
  };

  // --- STYLES ---
  // Using inline styles instead of Tailwind CSS classes
  const styles = {
    mainContainer: {
      fontFamily: 'sans-serif',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflow: 'hidden',
      position: 'relative',
    },
    card: {
      width: '100%',
      maxWidth: '28rem',
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '2rem',
      zIndex: 10,
    },
    header: { textAlign: 'center', marginBottom: '2rem' },
    h1: { fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' },
    p: { color: '#6b7280', marginTop: '0.5rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
    label: { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' },
    inputGroup: { position: 'relative' },
    dollarSign: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0.75rem', color: '#6b7280', pointerEvents: 'none' },
    input: {
      width: '100%',
      padding: '0.75rem',
      paddingLeft: '1.75rem',
      backgroundColor: '#f9fafb',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      color: '#111827',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#f9fafb',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      color: '#111827',
      boxSizing: 'border-box',
    },
    currencyRow: { display: 'flex', alignItems: 'flex-end', gap: '0.5rem' },
    swapButton: {
      padding: '0.75rem',
      borderRadius: '9999px',
      backgroundColor: '#e5e7eb',
      color: '#4b5563',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '0.25rem',
      transition: 'background-color 0.2s, transform 0.3s',
    },
    submitButton: {
      width: '100%',
      padding: '0.875rem 1rem',
      backgroundColor: isLoading ? '#93c5fd' : '#2563eb',
      color: 'white',
      fontWeight: '600',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'background-color 0.2s, transform 0.2s',
    },
    resultsContainer: { 
        marginTop: '1.5rem', 
        textAlign: 'center', 
        minHeight: '9rem' // Use minHeight instead of height
    },
    errorBox: { backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem' },
    resultBox: {
      backgroundColor: '#dcfce7',
      border: '1px solid #86efac',
      color: '#166534',
      padding: '1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: 'opacity 0.5s, transform 0.5s',
      opacity: isResultVisible ? 1 : 0,
      transform: isResultVisible ? 'translateY(0)' : 'translateY(1rem)',
    },
    resultText: { fontSize: '1.125rem', color: '#4b5563' },
    resultAmount: { fontWeight: 'bold', fontSize: '1.5rem', color: '#1f2937' },
    resultConverted: { fontSize: '2.25rem', fontWeight: '800', color: '#15803d' },
  };

  return (
    <div style={styles.mainContainer}>
      {/* The style tag is still the best way to handle keyframe animations in a self-contained component */}
      <style>{`
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="animate-blob absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="animate-blob animation-delay-2000 absolute -bottom-40 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="animate-blob animation-delay-4000 absolute -bottom-40 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.h1}>Currency Converter</h1>
          <p style={styles.p}>Instant exchange rates at your fingertips</p>
        </div>

        <form onSubmit={handleConvert} style={styles.form}>
          <div>
            <label htmlFor="amount" style={styles.label}>Amount</label>
            <div style={styles.inputGroup}>
              <span style={styles.dollarSign}>$</span>
              <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={styles.input} placeholder="1.00" step="0.01" />
            </div>
          </div>

          <div style={styles.currencyRow}>
            <div style={{ flex: 1 }}>
              <label htmlFor="fromCurrency" style={styles.label}>From</label>
              <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} style={styles.select}>
                {Object.keys(currencies).map(code => (<option key={code} value={code}>{code} - {currencies[code]}</option>))}
              </select>
            </div>

            <button type="button" onClick={handleSwapCurrencies} style={styles.swapButton} onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(180deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </button>

            <div style={{ flex: 1 }}>
              <label htmlFor="toCurrency" style={styles.label}>To</label>
              <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} style={styles.select}>
                {Object.keys(currencies).map(code => (<option key={code} value={code}>{code} - {currencies[code]}</option>))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="date" style={styles.label}>Date</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} style={{...styles.input, paddingLeft: '0.75rem'}}/>
          </div>

          <button type="submit" disabled={isLoading} style={styles.submitButton} onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#1d4ed8';}} onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#2563eb';}}>
            {isLoading ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20"><circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Converting...</span>
              </>
            ) : ( 'Convert' )}
          </button>
        </form>

        <div style={styles.resultsContainer}>
          {error && (<div style={styles.errorBox}><strong>Error: </strong><span>{error}</span></div>)}
          <div style={styles.resultBox}>
            {convertedAmount && baseInfo && !error && (
              <div>
                <p style={styles.resultText}>
                  <span style={styles.resultAmount}>{baseInfo.amount.toLocaleString()} {baseInfo.base}</span> is equal to
                </p>
                <p style={styles.resultConverted}>
                  {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {toCurrency}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}>
                   <InfoPill 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                      text={`Date: ${baseInfo.date}`}
                   />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
