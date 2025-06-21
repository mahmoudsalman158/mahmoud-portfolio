import React, { useState } from 'react';

interface CodeSnippetProps {
  language: string;
  code: string;
  showCopyButton?: boolean;
  className?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code, showCopyButton = true, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback or error message could be shown here
    }
  };

  // Basic syntax highlighting (can be expanded)
  const highlightCode = (text: string, lang: string) => {
    if (lang === 'bash') {
      return text
        .replace(/(\b(?:cat|echo|rm|sudo|nmap|subfinder|httpx|dirsearch|nuclei|sqlmap|waybackurls|katana|gospider|arjun|wpscan|subzy|smuggler|amass|ffuf|trufflehog|crlfuzz)\b)/g, '<span class="text-accent-blue">$1</span>') // commands
        .replace(/(-\w+|--\w+(?:-\w+)*)/g, '<span class="text-accent-purple">$1</span>') // flags
        .replace(/(\s#[^\n]*)/g, '<span class="text-gray-500">$1</span>'); // comments
    }
    // Add more languages if needed
    return text;
  };

  return (
    <div className={`methodology-code-snippet rounded-md my-3 relative ${className}`}>
      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="copy-button"
          aria-label="Copy code to clipboard"
        >
          {copied ? <><i className="fas fa-check mr-1"></i>Copied!</> : <><i className="fas fa-copy mr-1"></i>Copy</>}
        </button>
      )}
      <pre className="custom-scrollbar" dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}></pre>
    </div>
  );
};

export default CodeSnippet;