'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import TagComponent from './tag'
import { PlusCircleIcon, TrashIcon, X } from 'lucide-react'
import { toast } from '../ui/use-toast'
import { v4 as uuidv4 } from 'uuid'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
// import { Tag } from '@/types'

interface Tag {
  id: string;            // Unique identifier for the tag
  name: string;          // The name of the tag
  color: TagColor;       // Color from the predefined colors
  createdAt: Date;       // Timestamp for when the tag was created
  updatedAt: Date;       // Timestamp for when the tag was last updated
}


// Advanced TypeScript Types
interface TagCreatorProps {
  defaultTags?: Tag[];
}

const TagColors = ['BLUE', 'ORANGE', 'ROSE', 'PURPLE', 'GREEN'] as const;
export type TagColor = typeof TagColors[number];

// Improved Function Type Definitions
const TagCreator: React.FC<TagCreatorProps> = ({ defaultTags = [] }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags);
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();
  const [tagName, setTagName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<TagColor | ''>('');

  // Delete a tag from selected tags
  const handleDeleteSelection = (tagId: string): void => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  // Add a new tag to the list
  const handleAddTag = (): void => {
    if (!tagName) {
      toast({ variant: 'destructive', title: 'Tags need to have a name' });
      return;
    }
    if (!selectedColor) {
      toast({ variant: 'destructive', title: 'Please select a color' });
      return;
    }

    const newTag: Tag = {
      color: selectedColor,
      createdAt: new Date(),
      id: uuidv4(),
      name: tagName,
      updatedAt: new Date(),
    };

    setTags((prevTags) => [...prevTags, newTag]);
    setTagName('');
    setSelectedColor('');

    toast({ title: 'Created the tag' });
  };

  // Add tag to selectedTags if not already present
  const handleAddSelections = (tag: Tag): void => {
    if (selectedTags.every((t) => t.id !== tag.id)) {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
    }
  };

  // Delete a tag entirely
  const handleDeleteTag = async (tagId: string): Promise<void> => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));

    toast({ title: 'Deleted tag', description: 'The tag is deleted.' });

    router.refresh();
  };

  return (
    <AlertDialog>
      <Command className="bg-[#1a1a1a]">
        {/* Selected Tags Section */}
        {!!selectedTags.length && (
          <div className="flex flex-wrap gap-2 p-2 bg-[#2e2e2e] border border-gray-700 rounded-md">
            {selectedTags.map((tag) => (
              <div key={tag.id} className="flex items-center">
                <TagComponent title={tag.name} colorName={tag.color} />
                <X
                  size={14}
                  className="text-gray-400 cursor-pointer hover:text-white transition"
                  onClick={() => handleDeleteSelection(tag.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Color Selection Section */}
        <div className="flex items-center gap-2 my-2 mx-3">
          {TagColors.map((colorName) => (
            <TagComponent
              key={colorName}
              selectedColor={setSelectedColor}
              title=""
              colorName={colorName}
            />
          ))}
        </div>

        {/* Tag Input Section */}
        <div className="relative my-2">
          <CommandInput
            placeholder="Enter tag name..."
            value={tagName}
            onValueChange={setTagName}
            className="bg-[#2a2a2a] text-white px-3 placeholder-gray-500 border border-gray-700"
          />
          <PlusCircleIcon
            onClick={handleAddTag}
            size={20}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:text-green-500 cursor-pointer transition-all text-gray-400"
          />
        </div>

        {/* Available Tags Section */}
        <CommandList>
          <CommandSeparator />
          <CommandGroup heading="Available Tags">
            {tags.map((tag) => (
              <CommandItem
                key={tag.id}
                className="hover:bg-[#333] bg-transparent flex items-center justify-between text-sm cursor-pointer transition-all"
              >
                <div onClick={() => handleAddSelections(tag)}>
                  <TagComponent title={tag.name} colorName={tag.color} />
                </div>
                <AlertDialogTrigger>
                  <TrashIcon
                    size={16}
                    className="cursor-pointer text-gray-400 hover:text-rose-500 transition-all"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                      This action cannot be undone. The tag will be deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500"
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandEmpty>No tags found.</CommandEmpty>
        </CommandList>
      </Command>
    </AlertDialog>
  );
};

export default TagCreator;
