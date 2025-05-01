import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsOfService() {
    const navigate = useNavigate();
    return (
        <div className="container max-w-3xl mx-auto py-12 px-4">
            <div className="mb-8">
            <Link to={navigate(-1)} className="flex items-center gap-2 text-survey-purple hover:underline mb-6">
                <ChevronLeft size={16} />
                <span>Back to home</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: May 1, 2025</p>
            </div>
            
            <Separator className="my-6" />

            <div className="prose prose-gray max-w-none">
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                These Terms of Service ("Terms") govern your access to and use of SurveyCraft's website, services, and applications (collectively, the "Services"). 
                Please read these Terms carefully, and contact us if you have any questions.
                </p>
                <p className="mb-4">
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Using Our Services</h2>
                <p className="mb-4">
                You must follow any policies made available to you within the Services. You may use our Services only as permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
                </p>
                <p className="mb-4">
                Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access. You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law.
                </p>
                <p className="mb-4">
                We may send you service announcements, administrative messages, and other information in connection with your use of our Services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Your SurveyCraft Account</h2>
                <p className="mb-4">
                You may need a SurveyCraft account in order to use some of our Services. You are responsible for maintaining the security of your account and password. SurveyCraft cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
                </p>
                <p className="mb-4">
                To protect your account, keep your password confidential. You are responsible for the activity that happens on or through your account.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Privacy and Copyright Protection</h2>
                <p className="mb-4">
                SurveyCraft's <Link to="/privacy" className="text-survey-purple hover:underline">Privacy Policy</Link> explains how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that SurveyCraft can use such data in accordance with our privacy policies.
                </p>
                <p className="mb-4">
                We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers according to the process set out in the U.S. Digital Millennium Copyright Act.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Subscription and Payments</h2>
                <p className="mb-4">
                Some of our Services may require payment or a subscription. If you subscribe to a paid plan, you agree to pay the fees according to the pricing terms presented to you at the time of purchase. You can cancel your subscription at any time, but we do not provide refunds for partial subscription periods.
                </p>
                <p className="mb-4">
                SurveyCraft reserves the right to change its pricing terms at any time, and such changes will apply to subsequent billing cycles after notice has been provided to you.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Modifying and Terminating our Services</h2>
                <p className="mb-4">
                We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.
                </p>
                <p className="mb-4">
                You can stop using our Services at any time, although we'll be sorry to see you go. SurveyCraft may also stop providing Services to you, or add or create new limits to our Services at any time.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">
                To the maximum extent permitted by law, in no event will SurveyCraft, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Business Uses of our Services</h2>
                <p className="mb-4">
                If you are using our Services on behalf of a business, that business accepts these Terms. It will hold harmless and indemnify SurveyCraft and its affiliates, officers, agents, and employees from any claim, suit or action arising from or related to the use of the Services or violation of these terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. About these Terms</h2>
                <p className="mb-4">
                We may modify these terms or any additional terms that apply to a Service at any time, for example, to reflect changes to the law or changes to our Services. You should look at the terms regularly. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted.
                </p>
                <p className="mb-4">
                If you do not agree to the modified terms for a Service, you should discontinue your use of that Service.
                </p>
            </section>
            
            <p className="text-muted-foreground mt-8">
                If you have any questions about these Terms, please contact us at support@surveycraft.com.
            </p>
            </div>
        </div>
    );
}