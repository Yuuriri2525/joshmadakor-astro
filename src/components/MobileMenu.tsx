import { useState } from 'react';

interface MobileMenuProps {
  /** Exams ページの URL（Header から渡される。現在は内部ルート /exams） */
  exams: string;
  /** IT Training 外部リンクURL（coursecareers.com/joshmadakor） */
  itTraining: string;
}

export default function MobileMenu({ exams, itTraining }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-400 hover:text-white transition"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu（閉時は DOM に出さない＝画面外要素による横はみ出しを防ぐ） */}
      {isOpen && (
      <div
        className="fixed top-16 right-0 bottom-0 w-64 bg-gray-900 border-l border-gray-800 z-[100] md:hidden"
      >
        <nav className="p-4 space-y-4">
          <a
            href="/"
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href={itTraining}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
            onClick={closeMenu}
          >
            IT Training
          </a>
          <a
            href="/cyber"
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
            onClick={closeMenu}
          >
            Cyber Training
          </a>
          <a
            href={exams}
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
            onClick={closeMenu}
          >
            Exams
          </a>
          <a
            href="/blog/"
            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
            onClick={closeMenu}
          >
            Blog
          </a>

          {/* SNS Links in Mobile Menu */}
          <div className="border-t border-gray-800 pt-4 mt-4">
            <p className="text-sm text-gray-400 px-4 mb-3">Follow Us</p>
            <div className="flex gap-3 px-4">
              <a
                href="https://x.com/joshmadakor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 1200 1227">
                  <path d="m714.163 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.2396h162.604l304.797 435.9906 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/joshmadakor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/joshmadakor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@JoshMadakor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
      )}
    </>
  );
}
