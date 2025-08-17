import { useState, useEffect, FormEvent, CSSProperties } from "react";

// --- TYPE DEFINITIONS ---
interface TippingInfo {
  country: string;
  restaurant: string;
  taxi: string;
  hotel: string;
}

interface InfoPillProps {
  icon: React.ReactNode;
  text: string;
}

interface TippingGuideProps {
  currency: string;
  onClose: () => void;
}

interface ConversionResult {
  amount: number;
  base: string;
  date: string;
}

interface CurrencyList {
  [key: string]: string;
}

// --- DATA FOR TIPPING GUIDE ---
const tippingData: Record<string, TippingInfo> = {
  USD: {
    country: "United States",
    restaurant: "15-20%",
    taxi: "10-15%",
    hotel: "$2-5 per night for housekeeping.",
  },
  EUR: {
    country: "Eurozone Countries",
    restaurant: '5-10%, often included as "service compris". Check the bill.',
    taxi: "Round up to the nearest euro or 5-10%.",
    hotel: "€1-2 for porters and housekeeping.",
  },
  GBP: {
    country: "United Kingdom",
    restaurant: "10-15%, but check if a service charge is already included.",
    taxi: "Round up to the nearest pound.",
    hotel: "Optional, £1-2 for staff.",
  },
  JPY: {
    country: "Japan",
    restaurant: "Not expected and can be considered rude.",
    taxi: "Not expected.",
    hotel: "Not expected.",
  },
  CAD: {
    country: "Canada",
    restaurant: "15-20%",
    taxi: "10-15%",
    hotel: "$2-5 per night for housekeeping.",
  },
  AUD: {
    country: "Australia",
    restaurant: "10% for good service is common, but not required.",
    taxi: "Round up to the nearest dollar.",
    hotel: "Optional.",
  },
  CHF: {
    country: "Switzerland",
    restaurant:
      "Service is always included by law. Rounding up is appreciated.",
    taxi: "Service included, rounding up is common.",
    hotel: "Service included.",
  },
  default: {
    country: "the selected region",
    restaurant: "Varies widely. 10-15% is a safe bet in many places.",
    taxi: "Rounding up the fare is usually appreciated.",
    hotel: "Small tips for housekeeping and porters are common.",
  },
};

// --- HELPER & CHILD COMPONENTS ---

const InfoPill: React.FC<InfoPillProps> = ({ icon, text }) => {
  const pillStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    fontSize: "0.75rem",
    fontWeight: "600",
    padding: "0.375rem 0.75rem",
    borderRadius: "9999px",
  };
  const iconStyle: CSSProperties = { marginRight: "0.5rem" };
  return (
    <div style={pillStyle}>
      <span style={iconStyle}>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

const TippingGuide: React.FC<TippingGuideProps> = ({ currency, onClose }) => {
  const guide = tippingData[currency] || tippingData["default"];

  const styles: Record<string, CSSProperties> = {
    backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 20,
    },
    modal: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "1rem",
      width: "90%",
      maxWidth: "32rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "1rem",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "#9ca3af",
    },
    content: {
      marginTop: "1rem",
      color: "#374151",
    },
    listItem: {
      marginBottom: "0.75rem",
    },
    strong: {
      fontWeight: "600",
      color: "#111827",
    },
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            Tipping Guide for {guide.country} ({currency})
          </h2>
          <button onClick={onClose} style={styles.closeButton}>
            &times;
          </button>
        </div>
        <div style={styles.content}>
          <ul>
            <li style={styles.listItem}>
              <strong style={styles.strong}>Restaurants:</strong>{" "}
              {guide.restaurant}
            </li>
            <li style={styles.listItem}>
              <strong style={styles.strong}>Taxis:</strong> {guide.taxi}
            </li>
            <li style={styles.listItem}>
              <strong style={styles.strong}>Hotels:</strong> {guide.hotel}
            </li>
          </ul>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            *This is a general guide. Tipping customs can vary by location and
            establishment.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---
const Currency: React.FC = () => {
  // State management for the application
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);

  const [currencies, setCurrencies] = useState<CurrencyList>({});
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [baseInfo, setBaseInfo] = useState<ConversionResult | null>(null);
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [showTippingGuide, setShowTippingGuide] = useState<boolean>(false);

  // useEffect hook to fetch the list of available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.frankfurter.app/currencies");
        if (!response.ok) throw new Error("Failed to fetch currency list.");
        const data = await response.json();
        setCurrencies(data);
      } catch (err) {
        setError("Could not load currency list. Please try again later.");
        console.error(err);
      }
    };
    fetchCurrencies();
  }, []);

  // Function to handle the currency conversion logic
  const handleConvert = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsResultVisible(false);

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      setIsLoading(false);
      return;
    }
    if (fromCurrency === toCurrency) {
      setError('"From" and "To" currencies cannot be the same.');
      setIsLoading(false);
      return;
    }

    const effectiveDate = new Date(date) > new Date() ? "latest" : date;

    try {
      const response = await fetch(
        `https://api.frankfurter.app/${effectiveDate}?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
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
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
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
  const styles: Record<string, CSSProperties> = {
    mainContainer: {
      fontFamily: "sans-serif",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      overflow: "hidden",
      position: "relative",
    },
    card: {
      width: "100%",
      maxWidth: "28rem",
      backgroundColor: "white",
      borderRadius: "1rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      padding: "2rem",
      zIndex: 10,
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    h1: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      color: "#1f2937",
    },
    p: {
      color: "#6b7280",
      marginTop: "0.5rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: 500,
      color: "#374151",
      marginBottom: "0.25rem",
    },
    inputGroup: {
      position: "relative",
    },
    dollarSign: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: "0.75rem",
      color: "#6b7280",
      pointerEvents: "none",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      paddingLeft: "1.75rem",
      backgroundColor: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      color: "#111827",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      color: "#111827",
      boxSizing: "border-box",
    },
    currencyRow: {
      display: "flex",
      alignItems: "flex-end",
      gap: "0.5rem",
    },
    swapButton: {
      padding: "0.75rem",
      borderRadius: "9999px",
      backgroundColor: "#e5e7eb",
      color: "#4b5563",
      border: "none",
      cursor: "pointer",
      marginBottom: "0.25rem",
      transition: "background-color 0.2s, transform 0.3s",
    },
    submitButton: {
      width: "100%",
      padding: "0.875rem 1rem",
      backgroundColor: isLoading ? "#93c5fd" : "#2563eb",
      color: "white",
      fontWeight: "600",
      borderRadius: "0.5rem",
      border: "none",
      cursor: isLoading ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "background-color 0.2s, transform 0.2s",
    },
    resultsContainer: {
      marginTop: "1.5rem",
      textAlign: "center",
      minHeight: "9rem",
    },
    errorBox: {
      backgroundColor: "#fee2e2",
      border: "1px solid #fca5a5",
      color: "#b91c1c",
      padding: "0.75rem",
      borderRadius: "0.5rem",
    },
    resultBox: {
      backgroundColor: "#dcfce7",
      border: "1px solid #86efac",
      color: "#166534",
      padding: "1rem",
      borderRadius: "0.5rem",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: "opacity 0.5s, transform 0.5s",
      opacity: isResultVisible ? 1 : 0,
      transform: isResultVisible ? "translateY(0)" : "translateY(1rem)",
    },
    resultText: {
      fontSize: "1.125rem",
      color: "#4b5563",
    },
    resultAmount: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      color: "#1f2937",
    },
    resultConverted: {
      fontSize: "2.25rem",
      fontWeight: "800",
      color: "#15803d",
    },
    tippingButton: {
      background: "none",
      border: "none",
      color: "#2563eb",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "1rem",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <style>{`
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
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
          <p style={styles.p}>Get real-time currency exchange rates</p>
        </div>

        <form onSubmit={handleConvert} style={styles.form}>
          <div>
            <label htmlFor="amount" style={styles.label}>
              Amount
            </label>
            <div style={styles.inputGroup}>
              <span style={styles.dollarSign}>$</span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
                placeholder="1.00"
                step="0.01"
              />
            </div>
          </div>

          <div style={styles.currencyRow}>
            <div style={{ flex: 1 }}>
              <label htmlFor="fromCurrency" style={styles.label}>
                From
              </label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                style={styles.select}
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleSwapCurrencies}
              style={styles.swapButton}
              title="Swap currencies"
            >
              ⇄
            </button>

            <div style={{ flex: 1 }}>
              <label htmlFor="toCurrency" style={styles.label}>
                To
              </label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                style={styles.select}
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="date" style={styles.label}>
              Exchange Rate Date (optional)
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={today}
              style={{ ...styles.input, paddingLeft: "0.75rem" }}
            />
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Converting..." : "Convert"}
          </button>
        </form>

        <div style={styles.resultsContainer}>
          {error && (
            <div style={styles.errorBox}>
              <p>{error}</p>
            </div>
          )}

          {baseInfo && convertedAmount !== null && !error && (
            <div style={styles.resultBox}>
              <p style={styles.resultText}>
                {" "}
                <span style={styles.resultAmount}>
                  {baseInfo.amount.toLocaleString()} {baseInfo.base}
                </span>{" "}
                is equal to{" "}
              </p>
              <p style={styles.resultConverted}>
                {" "}
                {convertedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}{" "}
                {toCurrency}{" "}
              </p>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <InfoPill
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  text={`Date: ${baseInfo.date}`}
                />
                <InfoPill
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  text="ECB Data"
                />
              </div>
              <button
                onClick={() => setShowTippingGuide(true)}
                style={styles.tippingButton}
              >
                View Tipping Guide for {toCurrency}
              </button>
            </div>
          )}
        </div>
      </div>

      {showTippingGuide && (
        <TippingGuide
          currency={toCurrency}
          onClose={() => setShowTippingGuide(false)}
        />
      )}
    </div>
  );
};

export default Currency;
