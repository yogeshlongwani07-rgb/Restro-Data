import "./css/terms.css";

export default function Terms() {
  return (
    <div className="terms-root">
      <div className="terms-container">
        <h1>Terms & Conditions</h1>
        <p className="terms-updated">Last updated: January 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to our food delivery platform. By accessing or using this
            application, you agree to comply with and be bound by these Terms
            and Conditions.
          </p>
        </section>

        <section>
          <h2>2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
          </p>
        </section>

        <section>
          <h2>3. Orders & Payments</h2>
          <ul>
            <li>All orders are subject to availability.</li>
            <li>Prices may change without prior notice.</li>
            <li>Payments must be completed before order processing.</li>
          </ul>
        </section>

        <section>
          <h2>4. Delivery Policy</h2>
          <p>
            Delivery times are estimated and may vary due to traffic, weather,
            or restaurant delays. We are not liable for delays beyond our
            control.
          </p>
        </section>

        <section>
          <h2>5. Cancellations & Refunds</h2>
          <ul>
            <li>Orders can be canceled before preparation starts.</li>
            <li>Refunds will be processed as per our refund policy.</li>
            <li>No refunds for completed deliveries.</li>
          </ul>
        </section>

        <section>
          <h2>6. User Conduct</h2>
          <p>
            You agree not to misuse the platform, engage in fraudulent activity,
            or violate any applicable laws.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            We are not responsible for indirect damages, including loss of
            profits or data arising from use of the service.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued
            use of the app means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For any questions, please contact our support team through the app.
          </p>
        </section>
      </div>
    </div>
  );
}
