import { useState, useEffect } from "react";
import { AlertDialog } from "../ui/alert-dialog";
import { X, Plus, Tag } from "lucide-react";

const tagColors = {
  red: 'rgba(255, 0, 0, 0.4)',       // Red with 40% opacity
  orange: 'rgba(255, 165, 0, 0.4)',  // Orange with 40% opacity
  rose: 'rgba(255, 0, 127, 0.4)',    // Rose with 40% opacity
  purple: 'rgba(128, 0, 128, 0.4)',  // Purple with 40% opacity
  green: 'rgba(0, 128, 0, 0.4)',     // Green with 40% opacity
};

interface Tag {
  id: string;
  name: string;
  color: keyof typeof tagColors;
}

interface TagCreatorProps {
  getSelectedTags: (tags: Tag[]) => void;
  defaultTags?: Tag[];
}

const TagCreator = ({ getSelectedTags, defaultTags = [] }: TagCreatorProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState<keyof typeof tagColors>('red');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSelectedTags(selectedTags);
  }, [selectedTags]);

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    const existingTag = selectedTags.find(tag => tag.name.toLowerCase() === newTagName.toLowerCase());

    if (existingTag) {
      setError('Tag with this name already exists');
      return;
    }

    const newTag: Tag = {
      id: Date.now().toString(),
      name: newTagName,
      color: selectedColor,
    };

    setSelectedTags([...selectedTags, newTag]);
    setNewTagName('');
    setError(null);  // Clear error after successful addition
  };

  const handleDeleteTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  return (
    <AlertDialog>
      <div className="flex flex-col gap-4 w-full">
        {/* Tag List */}
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-2 px-1 py-1 mt-1 border border-[#a3a3a3]/60 rounded-lg shadow-sm transition-all"
              style={{ backgroundColor: tagColors[tag.color] }}
            >
              <Tag className="w-4 h-4 text-[#afafaf]" />
              <span className="text-xs text-[#afafaf] font-medium">{tag.name}</span>
              <X
                size={16}
                className="cursor-pointer text-white hover:text-red-500 transition-all"
                onClick={() => handleDeleteTag(tag.id)}
              />
            </div>
          ))}
        </div>

        {/* Input and Controls */}
        <div className="grid grid-cols-4 gap-2 w-full">
          {/* Tag Input */}
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="bg-[#1e1e1e] bg-opacity-80 backdrop-blur-md text-[#afafaf] rounded-md px-2 py-1 w-full text-sm col-span-2"
            placeholder="enter tag name"
          />

          {/* Color Selector */}
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value as keyof typeof tagColors)}
            className="bg-[#1e1e1e] text-[#afafaf] border border-[#333] text-xs px-2 py-1 rounded-md"
          >
            {Object.keys(tagColors).map(color => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>

          {/* Add Tag Button */}
          <button
            onClick={handleAddTag}
            className="self-start bg-green-600/10 hover:bg-green-500/20 text-gray-300 text-xs px-2 py-1 rounded-md transition-all flex items-center gap-2 focus:ring-2 focus:ring-green-500"
          >
            <Plus size={16} />
            Add Tag
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </AlertDialog>
  );
};

export default TagCreator;
