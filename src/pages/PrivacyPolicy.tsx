const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including:</p>
        <ul>
          <li>Account information (name, email, password)</li>
          <li>Profile information (username, bio, avatar)</li>
          <li>Social media account data and analytics</li>
          <li>Media kit content and statistics</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Connect influencers with brands</li>
          <li>Generate analytics and insights</li>
          <li>Improve our platform</li>
        </ul>

        <h2>3. Data Sharing and Disclosure</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Brands you choose to connect with</li>
          <li>Service providers and partners</li>
          <li>When required by law</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information.</p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2>6. Contact Us</h2>
        <p>For any questions about this Privacy Policy, please contact us at privacy@explorehub.com</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;