'use client';
import React from 'react';
import { notFound, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { markdownContent } from './markdownContent';
import MarkdownRenderer from '@/utils/markdownRenderer';
import Navbar from '@/components/Navbar';
import ComponentWrapper from '@/components/ComponentsWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FiCode, FiEye } from 'react-icons/fi';

const validComponents = ['Button', 'Card', 'Keyboard'] as const;
type ComponentType = (typeof validComponents)[number];

const ComponentPage = () => {
  const component = usePathname().split('/')[2];

  if (!validComponents.includes(component as ComponentType)) {
    notFound();
  }

  const componentData = markdownContent[component as ComponentType];
  const { code: componentCode, tags, fileName } = componentData;

  return (
    <div className="bg-white dark:bg-black min-h-screen text-white mt-10">
      <div className="container mx-auto py-16 px-4 text-black dark:text-gray-400">
        <div className="text-start mb-12">
          <h1 className="text-5xl font-semibold mb-4 text-black dark:text-white">{component}</h1>
          <p className="text-lg ">An advanced and stunning {component} component for your UI.</p>
          <div className="space-x-2 mt-4">
            {tags.map(tag => (
              <span key={tag} className="bg-[#18181B] text-[#CACACE] text-xs px-2 py-1 rounded-md border border-gray-300/20">
                {tag}
              </span>
            ))}

          </div>
        </div>
        <Tabs defaultValue="preview" className="w-full line-indicator">
            <TabsList className="flex justify-start ">

              <TabsTrigger value="preview" icon={<FiEye />} className="text-black dark:text-white">Preview</TabsTrigger>
              <TabsTrigger value="code" icon={<FiCode />} className="text-black dark:text-white">Code</TabsTrigger>

            </TabsList>
            <TabsContent value="preview" className="flex items-center justify-center ">
              <ComponentWrapper component={component as string} />
            </TabsContent>
            <TabsContent value="code">
              <MarkdownRenderer content={componentCode} />
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComponentPage;
