const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using ExploreHub, you agree to be bound by these Terms of Service.</p>

        <h2>2. Description of Service</h2>
        <p>ExploreHub provides a platform for influencers to create and share media kits, connect with brands, and manage their social media presence.</p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating an account</li>
          <li>You are responsible for maintaining account security</li>
          <li>You must be at least 13 years old to use the service</li>
        </ul>

        <h2>4. User Content</h2>
        <p>You retain rights to your content while granting us license to use it on our platform.</p>

        <h2>5. Acceptable Use</h2>
        <ul>
          <li>No fraudulent or misleading information</li>
          <li>No harassment or abuse</li>
          <li>No violation of intellectual property rights</li>
        </ul>

        <h2>6. Termination</h2>
        <p>We reserve the right to terminate accounts that violate these terms.</p>

        <h2>7. Disclaimers</h2>
        <p>Service is provided "as is" without warranties of any kind.</p>

        <h2>8. Limitation of Liability</h2>
        <p>We shall not be liable for any indirect, incidental, or consequential damages.</p>

        <h2>9. Contact Information</h2>
        <p>For any questions about these Terms, please contact us at legal@explorehub.com</p>
      </div>
    </div>
  );
};

export default TermsOfService;