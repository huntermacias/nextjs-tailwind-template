import React from 'react';
import Markdown from 'markdown-to-jsx';
import CodeBlock from '../components/CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

const components = {
  h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
  h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
  h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-medium mb-2">
    <span className='ml-8'>{children}</span>
  </h3>,
  h4: ({ children }: { children: React.ReactNode }) => (
    <div className="inline-block px-4 py-2 rounded-md bump-indicator">
      <h4 className="text-black dark:text-white text-lg mb-2 ">
        <span className='ml-4'>{children}</span>
      </h4>
    </div>
  ),
  h5: ({ children }: { children: React.ReactNode }) => (
    <div className="inline-block px-2 py-1 bg-[#27272A] rounded-md">
      <h5 className="text-black dark:text-white text-sm ">{children}</h5>
    </div>
  ),
  code: ({ className, children }: { className: string; children: string }) => {
    const fileName = children.split('\n')[0].replace('// File: ', '').trim();
    const code = children.split('\n').slice(1).join('\n');
    return <CodeBlock className={className} fileName={fileName}>{code}</CodeBlock>;
  },
  pre: ({ children }: { children: React.ReactElement }) => {
    const content = children.props.children || '';
    const expandable = content.split('\n').length > 10;
    return <CodeBlock {...children.props} expandable={expandable} />;
  },
  p: ({ children }: { children: React.ReactNode }) => <p className=" text-gray-400 ">{children}</p>,
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-auto rounded-lg  my-4 ">
      <table className="min-w-full bg-[#1F1F1F] text-black dark:text-white border-collapse ml-8">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-[#333333] ">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="bg-[#2B2B2B] ">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-gray-600 ">
      {children}
    </tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="text-left py-2 px-4 font-semibold text-sm text-[#CCCCCC] ">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="text-left py-3 px-4 bg-[#1F1F1F] border border-gray-600 text-[#E0E0E0] ">
      {children}
    </td>
  ),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <Markdown
      options={{
        overrides: components,
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
