import React from 'react';

// Define the structure of the Cookie Policy component
const CookiePolicy: React.FC = () => {
  return (
    <div className="cookie-policy-container max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gradient">
          Cookie Policy
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Last Updated: [Insert Date, e.g., October 1, 2025]
        </p>
      </header>

      <section className="space-y-8 text-gray-700">
        <p>
          This Cookie Policy explains what cookies are and how <strong>RidBharat</strong>! ("we," "us," or "our") uses them on our website and through our Service. By continuing to use our Service, you consent to the use of cookies as described in this policy.
        </p>

        {/* 1. What Are Cookies? */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide reporting information. Cookies help the site remember things like your login details or site preferences.
          </p>
        </div>

        {/* 2. How We Use Cookies */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            2. How RidBharat Uses Cookies
          </h2>
          <p>
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-3">
            <li>
              <span className="font-semibold">Necessary Cookies:</span> These cookies are essential for you to browse the website and use its features, such as accessing secure areas, enabling video playback for courses, and maintaining your session (e.g., keeping you logged into your student dashboard).
            </li>
            <li>
              <span className="font-semibold">Preference/Functionality Cookies:</span> These cookies allow our website to remember choices you have made (such as your username, language, or region) and provide enhanced, more personal features.
            </li>
            <li>
              <span className="font-semibold">Analytics/Performance Cookies:</span> These cookies help us understand how visitors use our website. They allow us to count visits and traffic sources, measure student progress (e.g., JavaScript Mastery 85%, React Development 72% as seen on the dashboard), and improve the performance of our site. **We use services like Google Analytics for this purpose.**
            </li>
            <li>
              <span className="font-semibold">Marketing/Targeting Cookies:</span> These cookies track your browsing habits to allow us to show you relevant information about our courses (like the Full Stack Bootcamp) on third-party websites or social media platforms.
            </li>
          </ul>
        </div>

        {/* 3. Third-Party Cookies */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            3. Third-Party Cookies
          </h2>
          <p>
            In addition to our own cookies, we may use various third-party cookies to report usage statistics of the Service, refine marketing campaigns, and deliver content. Examples include:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>**Google Analytics:** For measuring website traffic and usage data.</li>
            <li>**Payment Gateway Providers:** To process transactions securely.</li>
            <li>**Social Media Platforms:** For integrating share/follow buttons and running targeted ads.</li>
          </ul>
        </div>

        {/* 4. Your Choices Regarding Cookies */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            4. Your Choices Regarding Cookies
          </h2>
          <p>
            You have the right to decide whether to accept or reject cookies.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold">Browser Settings:</span> You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service (like logging in).
            </li>
            <li>
              <span className="font-semibold">Opt-Out Tools:</span> For some analytical and marketing cookies, you may be able to opt-out directly through third-party mechanisms (e.g., Google Analytics opt-out browser add-on).
            </li>
          </ul>
        </div>

        {/* 5. Contact Us */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            5. Contact Us
          </h2>
          <p>
            If you have any questions about this Cookie Policy, you can contact us:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>By email: <a href="mailto:support@ridbharat.com" className="text-primary hover:underline">support@ridbharat.com</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;