'use client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from '@/themes/vsc-dark-plus';
import { CSSProperties, ComponentType, useRef, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { notFound, usePathname } from 'next/navigation';
import { markdownContent } from '@/app/(dashboard)/components/[component]/markdownContent';



interface CodeBlockProps {
  className?: string;
  children: string;
  expandable?: boolean;
  fileName?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, expandable = false }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.textContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset copied state after 2 seconds
    }
  };
  const validComponents = ['Button', 'Card'] as const;
  const component = usePathname().split('/')[2];



  const componentData = markdownContent[component as any];
  const { code: componentCode, tags, fileName } = componentData;

  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden ml-8">
        <div className="flex absolute right-0 z-10 justify-between items-center top-2 text-white px-4 py-2">
        <button
            onClick={handleCopy}
            className="flex items-center text-sm hover:bg-[#1e1e1e] p-1 rounded-md relative"
          >
            {copied ? <FiCheck className="text-green-400 mt-1" /> : <FiCopy className=''/>}
            <span
              className={`absolute top-[-1rem] right-0 bg-gray-800 text-xs text-white p-1 rounded-md transition-opacity duration-200 ${
                copied ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Copied!
            </span>
          </button>
        </div>

      <div className="relative" ref={codeRef}>
        <SyntaxHighlighter
          language={'jsx'}
          style={vscDarkPlus as { [key: string]: CSSProperties }}
          wrapLines={expandable}
          showLineNumbers
          lineProps={(lineNumber) => ({
            style: { display: isExpanded || lineNumber <= 10 ? 'block' : 'none' },
          })}
        >
          {children}
        </SyntaxHighlighter>
        {expandable && (
          <div>
            <div
              className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent ${
                isExpanded ? 'hidden' : 'block'
              }`}
            />
            <button
              onClick={toggleExpand}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-[#27272A] text-white px-4 py-2 rounded-md"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
