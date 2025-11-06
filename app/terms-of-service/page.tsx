import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-of-service-container max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gradient">
          Terms of Service
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Effective Date: October 1, 2025
        </p>
      </header>

      <section className="space-y-8 text-gray-700">
        <p>
          Welcome to <strong>Upcoder</strong>! These Terms of Service ("Terms") govern your use of the website, courses, programs (including Bootcamps, Internships, and Mentorship), and all related services (collectively, the "Service") provided by Upcoder ("we," "us," or "our").
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        {/* 1. Use of the Service */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            1. Use of the Service
          </h2>
          <h3 className="text-xl font-medium mt-4 mb-2">
            Account Registration
          </h3>
          <p>
            You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
          </p>
          
          <h3 className="text-xl font-medium mt-4 mb-2">
            User Conduct
          </h3>
          <p>
            You agree not to use the Service for any unlawful or prohibited activities, including: harassing instructors or other students, sharing course materials outside of the Service, or attempting to gain unauthorized access to our systems.
          </p>
        </div>
        
        {/* 2. Enrollment, Payments, and Refunds */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            2. Enrollment, Payments, and Refunds
          </h2>
          <h3 className="text-xl font-medium mt-4 mb-2">
            Pricing and Payment
          </h3>
          <p>
            All course and program prices (e.g., ₹45,000 for Full Stack Web Development) are listed on the website and are subject to change. Payment must be made in full or according to the agreed-upon installment plan before access to the program materials is granted.
          </p>

          <h3 className="text-xl font-medium mt-4 mb-2">
            Refund Policy
          </h3>
          <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 space-y-2">
            <p>
              At Upcoder, we value your trust and aim to provide a high-quality learning experience. Our refund policy is as follows:
            </p>

            <p>
              <strong>Eligibility:</strong> Refunds apply to payments made for courses, programs, or services. To be eligible, you must submit a refund request within the timeframe specified below.
            </p>

            <div>
              <strong>Timeframe:</strong>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Within 7 days of enrollment: Full refund, provided less than 20% of course content has been accessed.</li>
                <li>Between 8–14 days: 50% refund, provided less than 20% of course content has been accessed.</li>
                <li>After 14 days: No refund will be issued.</li>
              </ul>
            </div>

            <p>
              <strong>Non-Refundable Cases:</strong> Refunds will not be granted if the participant has completed more than 20% of the course, accessed downloads, or attended live sessions. Customized services, mentoring, or one-on-one consultations are also non-refundable once delivered.
            </p>

            <p>
              <strong>Process:</strong> To request a refund, email <a href="mailto:support@Upcoder.com" className="text-blue-500 hover:underline">support@Upcoder.com</a> with proof of payment and reason. Approved refunds will be processed within 7–10 business days to the original payment method.
            </p>
          </div>
        </div>

        {/* 3. Intellectual Property and Licensing */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            3. Intellectual Property and Licensing
          </h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Upcoder and its licensors.
          </p>
          <h3 className="text-xl font-medium mt-4 mb-2">
            Course Materials
          </h3>
          <p>
            The materials provided in our courses (videos, documents, code samples) are licensed to you for <strong>personal, non-commercial use only</strong> while you are an active student. You may not reproduce, redistribute, transmit, assign, sell, broadcast, or circulate any part of the materials to anyone else.
          </p>
        </div>
        
        {/* 4. Placement Guarantee and Expectations */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            4. Placement Guarantee and Expectations
          </h2>
          <p>
            While Upcoder boasts a high <strong>95% Success Rate/Placement Rate</strong> and offers placement assistance, <strong>any specific "Job Guarantee" must be clearly defined and conditioned</strong>.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <strong>Conditionality:</strong> Any placement or success guarantee is strictly conditional upon the student maintaining a high attendance rate (e.g., 98% attendance), completing all projects, and actively participating in the placement process.
            </li>
            <li>
              <strong>Limitation:</strong> We do not guarantee a specific salary package (e.g., ₹8L Avg. Package) but strive to help you achieve your career goals based on market conditions and your performance.
            </li>
          </ul>
        </div>
        
        {/* 5. Limitation of Liability */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall Upcoder, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service.
          </p>
        </div>

        {/* 6. Governing Law and Jurisdiction */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            6. Governing Law and Jurisdiction
          </h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in <strong>Delhi, India</strong>.
          </p>
        </div>
        
        {/* 7. Changes to Terms */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice before any new terms take effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>
        
        {/* 8. Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            8. Contact Information
          </h2>
          <p>
            Questions about the Terms of Service should be sent to us at:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Email: <a href="mailto:support@Upcoder.com" className="text-blue-500 hover:underline">support@Upcoder.com</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
