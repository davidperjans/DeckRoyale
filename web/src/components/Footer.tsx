import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-300 text-gray-700 py-6 text-center px-4 mt-auto">
      <p>© {new Date().getFullYear()} DeckRoyale. All rights reserved.</p>
      <p className="mt-2 text-sm">
        This content is not affiliated with, endorsed, sponsored, or specifically
        approved by Supercell and Supercell is not responsible for it. <br />
        For more information see{" "}
        <a
          href="https://supercell.com/en/fan-content-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-700 underline hover:text-purple-900"
        >
          Supercell’s Fan Content Policy
        </a>.
      </p>
    </footer>
  );
};

export default Footer;
