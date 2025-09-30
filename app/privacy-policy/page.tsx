import React from 'react';

// Define the structure of the Privacy Policy component
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gradient">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Last Updated: [ October 1, 2025]
        </p>
      </header>

      <section className="space-y-6 text-gray-700">
        <p>
          This Privacy Policy describes how <strong>RidBharat</strong>! ("we," "us," or "our") collects, uses, and discloses your information when you use our website, programs, and services (collectively, the "Service").
        </p>

        {/* 1. Information We Collect */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            1. Information We Collect
          </h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          <h3 className="text-xl font-medium mt-4 mb-2">
            Personal Data
          </h3>
          <p>
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Payment information (processed by a secure third-party processor)</li>
            <li>Educational and professional background (e.g., for program enrollment and placement)</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">
            Usage Data
          </h3>
          <p>
            We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
          </p>
        </div>

        {/* 2. Use of Data */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            2. Use of Data
          </h2>
          <p>
            RidBharat uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>To provide and maintain the Service (e.g., access to courses, bootcamps).</li>
            <li>To manage your enrollment in our programs (e.g., Full Stack Web Development, Data Science & AI).</li>
            <li>To provide you with 1-on-1 Mentorship and career guidance.</li>
            <li>To process payments for courses and programs.</li>
            <li>To contact you with newsletters, marketing or promotional materials and other information that may be of interest to you.</li>
            <li>For job placement assistance and industry project assignments (as highlighted in your program offerings).</li>
            <li>To monitor the usage of the Service and improve our offerings.</li>
          </ul>
        </div>

        {/* 3. Disclosure of Data */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            3. Disclosure of Data
          </h2>
          <p>
            We may disclose your Personal Data in the good faith belief that such action is necessary to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Comply with a legal obligation.</li>
            <li>Protect and defend the rights or property of RidBharat.</li>
            <li>Facilitate job placements with our 50+ Hiring Partners, only with your explicit consent.</li>
            <li>Protect the personal safety of users of the Service or the public.</li>
            <li>Protect against legal liability.</li>
          </ul>
        </div>

        {/* 4. Security of Data */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            4. Security of Data
          </h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </div>

        {/* 5. Service Providers */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            5. Service Providers
          </h2>
          <p>
            We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </div>

        {/* 6. Links to Other Sites */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            6. Links to Other Sites
          </h2>
          <p>
            Our Service may contain links to other sites that are not operated by us (e.g., payment gateways, partner websites). If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>
        </div>

        {/* 7. Changes to This Privacy Policy */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        {/* 8. Contact Us */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            8. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>By email: <a href="mailto:support@ridbharat.com" className="text-primary hover:underline">support@ridbharat.com</a></li>
            <li>By phone: <span className="font-mono">+91-98927 62728</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;