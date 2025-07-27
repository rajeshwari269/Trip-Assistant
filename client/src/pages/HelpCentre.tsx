import React from "react";

const HelpCentre: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background:
          'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80") no-repeat center center fixed',
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <main
        style={{
          marginTop: 0,
          marginBottom: 48,
          width: "95%",
          maxWidth: 700,
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
          padding: 40,
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)", // for Safari support
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#ffffff",
          userSelect: "none",
        }}
      >
        <h1
          style={{
            fontSize: "2.7rem",
            marginBottom: 16,
            fontWeight: 700,
            userSelect: "text",
            background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Help Center
        </h1>
        <p
          style={{
            marginTop: 0,
            marginBottom: 16,
            fontSize: 18,
            color: "#ffffff",
            userSelect: "text",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          Find answers to your questions or contact support
        </p>
        <input
          type="text"
          placeholder="Search FAQs"
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "14px 18px",
            borderRadius: 20,
            border: "1.5px solid rgba(255, 255, 255, 0.3)",
            fontSize: 17,
            marginBottom: 32,
            outline: "none",
            background: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            userSelect: "text",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#FFD700";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(255, 215, 0, 0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
          }}
        />
        <section style={{ width: "100%" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 12,
              marginTop: 0,
              textAlign: "left",
              userSelect: "text",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Contact Support
          </h2>
          <p
            style={{
              marginBottom: 14,
              color: "#ffffff",
              userSelect: "text",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Need help with a specific issue? Contact our support team for
            assistance.
          </p>
          <button
            style={{
              padding: "13px 32px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "30px",
              color: "#ffffff",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: 34,
              transition: "all 0.3s ease",
              userSelect: "none",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
              (e.currentTarget as HTMLButtonElement).style.color = "#000";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 20px rgba(255, 215, 0, 0.4)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255, 255, 255, 0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            Contact Support
          </button>

          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              margin: "16px 0 18px 0",
              textAlign: "left",
              userSelect: "text",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Common Help Topics
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 22,
            }}
          >
            <HelpTopic
              icon="🗺️"
              title="Planning a Trip"
              desc="Learn how to create and customize your travel plans"
            />
            <HelpTopic
              icon="📆"
              title="Managing Your Bookings"
              desc="View, modify, or cancel your existing reservations"
            />
            <HelpTopic
              icon="💳"
              title="Payment and Refunds"
              desc="Manage your payment methods and understand refund policies"
            />
            <HelpTopic
              icon="👤"
              title="Account Settings"
              desc="Update your profile information and preferences"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const HelpTopic: React.FC<{ icon: string; title: string; desc: string }> = ({
  icon,
  title,
  desc,
}) => (
  <div
    style={{
      flex: "1 0 220px",
      minWidth: 220,
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: 14,
      padding: "20px 18px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      userSelect: "text",
      transition: "all 0.3s ease",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)";
      (e.currentTarget as HTMLDivElement).style.background =
        "rgba(255, 255, 255, 0.2)";
      (e.currentTarget as HTMLDivElement).style.boxShadow =
        "0 6px 20px rgba(255, 215, 0, 0.3)";
      (e.currentTarget as HTMLDivElement).style.border =
        "1px solid rgba(255, 215, 0, 0.5)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
      (e.currentTarget as HTMLDivElement).style.background =
        "rgba(255, 255, 255, 0.1)";
      (e.currentTarget as HTMLDivElement).style.boxShadow =
        "0 4px 15px rgba(0, 0, 0, 0.2)";
      (e.currentTarget as HTMLDivElement).style.border =
        "1px solid rgba(255, 255, 255, 0.2)";
    }}
  >
    <span style={{ fontSize: 32, marginBottom: 10 }}>{icon}</span>
    <span
      style={{
        fontWeight: 700,
        fontSize: 18,
        color: "#ffffff",
        marginBottom: 5,
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
      }}
    >
      {title}
    </span>
    <span
      style={{
        color: "#ffffff",
        fontSize: 15,
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
      }}
    >
      {desc}
    </span>
  </div>
);

export default HelpCentre;
