import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";


export default function PrivacyPolicy() {
    const navigate = useNavigate();
    return (
        <div className="container max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8">
            <Link to={navigate(-1)} className="flex items-center gap-2 text-survey-purple hover:underline mb-6">
            <ChevronLeft size={16} />
            <span>Back to home</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: May 1, 2025</p>
        </div>
        
        <Separator className="my-6" />

        <div className="prose prose-gray max-w-none">
            <section className="mb-8">
            <p className="mb-4">
                At SurveyCraft, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our survey platform.
            </p>
            <p className="mb-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Personal Data</h3>
            <p className="mb-4">
                We may collect personal identification information from users in a variety of ways, including, but not limited to, when users visit our site, register on the site, fill out a form, and in connection with other activities, services, features or resources we make available. Users may be asked for, as appropriate, name, email address, and payment information.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Survey Data</h3>
            <p className="mb-4">
                If you create surveys using our platform, we collect the content of those surveys as well as responses submitted by participants. You are responsible for obtaining appropriate consent from survey respondents for the collection and processing of their data.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Usage Data</h3>
            <p className="mb-4">
                We may automatically collect information about your device and how your device interacts with our Services. This information might include your IP address, device type, operating system, browser type, pages visited, time spent on pages, and other usage statistics.
            </p>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We may use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">To provide and maintain our Services</li>
                <li className="mb-2">To notify you about changes to our Services</li>
                <li className="mb-2">To allow you to participate in interactive features of our Services</li>
                <li className="mb-2">To provide customer care and support</li>
                <li className="mb-2">To provide analysis or valuable information so that we can improve our Services</li>
                <li className="mb-2">To monitor the usage of our Services</li>
                <li className="mb-2">To detect, prevent and address technical issues</li>
                <li className="mb-2">To process payments and fulfill orders</li>
            </ul>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Disclosure of Data</h2>
            <p className="mb-4">
                We may disclose your personal information in the following situations:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">To comply with a legal obligation</li>
                <li className="mb-2">To protect and defend the rights or property of SurveyCraft</li>
                <li className="mb-2">To prevent or investigate possible wrongdoing in connection with the Service</li>
                <li className="mb-2">To protect the personal safety of users of the Service or the public</li>
                <li className="mb-2">To protect against legal liability</li>
                <li className="mb-2">With your consent or direction to do so</li>
            </ul>
            <p className="mb-4">
                We may also share aggregated, non-personally identifiable information with third parties for various purposes, including marketing and analytics.
            </p>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="mb-4">
                We implement appropriate technical and organizational measures to maintain the safety of your personal data. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p className="mb-4">
                Your account information is protected by a password. It is important that you protect against unauthorized access to your account and information by choosing your password carefully and keeping it secure.
            </p>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Your Data Protection Rights</h2>
            <p className="mb-4">
                Depending on your location and applicable laws, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">The right to access the personal information we hold about you</li>
                <li className="mb-2">The right to request correction of your personal information</li>
                <li className="mb-2">The right to request deletion of your personal information</li>
                <li className="mb-2">The right to restrict processing of your personal information</li>
                <li className="mb-2">The right to data portability</li>
                <li className="mb-2">The right to object to processing of your personal information</li>
                <li className="mb-2">The right to withdraw consent at any time</li>
            </ul>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
            <p className="mb-4">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
            </p>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="mb-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            </section>

            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at privacy@surveycraft.com or by mail at 123 Survey Street, San Francisco, CA 94107.
            </p>
            </section>
        </div>
        </div>
    );
}