const SocialLinks = () => {
  return (
    <div className="hidden items-center gap-4 lg:flex lg:justify-start lg:pl-0 lg:-ml-6">
      <a
        href="https://www.facebook.com/ANARTISISVIOMES"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/70 hover:text-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.2l-.4 2.9h-1.8v7A10 10 0 0022 12z" />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/viomes.sa/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/70 hover:text-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <path d="M17.5 6.5h.01" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/company/viomes-sa/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/70 hover:text-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.5 18H6.2V10.5h2.3V18zM7.3 9.4a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6zM18 18h-2.3v-3.4c0-.8-.3-1.4-1-1.4-.5 0-.9.3-1.1.6-.1.2-.1.5-.1.8V18H11.2V10.5h2.2v1h.1c.3-.5.9-1.1 1.9-1.1 1.4 0 2.5.9 2.5 3V18z" />
        </svg>
      </a>
    </div>
  );
};

export default SocialLinks;
