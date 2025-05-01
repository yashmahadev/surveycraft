import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-background mt-auto border-t">
      <div className="container py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">SurveyCraft</h2>
          <p className="text-sm text-muted-foreground">
            Create, share, and analyze surveys with ease.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Product</h3>
          <ul className="space-y-1">
            {/* <li>
              <Link to="/features" className="text-sm hover:text-survey-purple transition-colors">
                Features
              </Link>
            </li> */}
            <li>
              <Link to="/templates" className="text-sm hover:text-survey-purple transition-colors">
                Templates
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-sm hover:text-survey-purple transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Resources</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/blog" className="text-sm hover:text-survey-purple transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/help" className="text-sm hover:text-survey-purple transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/guides" className="text-sm hover:text-survey-purple transition-colors">
                Guides
              </Link>
            </li>
          </ul>
        </div> */}

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Company</h3>
          <ul className="space-y-1">
            {/* <li>
              <Link to="/about" className="text-sm hover:text-survey-purple transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm hover:text-survey-purple transition-colors">
                Contact
              </Link>
            </li> */}
            <li>
              <Link to="/privacy-policy" className="text-sm hover:text-survey-purple transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="text-sm hover:text-survey-purple transition-colors">
                Terms & Services
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SurveyCraft. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-muted-foreground hover:text-survey-purple"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-survey-purple"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-survey-purple"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
