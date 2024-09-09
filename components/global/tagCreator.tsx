import { useState, useEffect } from "react";
import { AlertDialog } from "../ui/alert-dialog";
import { X } from "lucide-react";

const tagColors = ['red', 'orange', 'rose', 'purple', 'green'] as const;

interface Tag {
  id: string;
  name: string;
  color: typeof tagColors[number];
}

interface TagCreatorProps {
  getSelectedTags: (tags: Tag[]) => void;
  defaultTags?: Tag[];
}

const TagCreator = ({ getSelectedTags, defaultTags = [] }: TagCreatorProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState<typeof tagColors[number]>('red');

  useEffect(() => {
    getSelectedTags(selectedTags);
  }, [selectedTags]);

  const handleAddTag = () => {
    const newTag = { id: Date.now().toString(), name: newTagName, color: selectedColor };
    setSelectedTags([...selectedTags, newTag]);
    setNewTagName('');
  };

  const handleDeleteTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  return (
    <AlertDialog>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-1">
            <span className={`px-2 py-1 bg-${tag.color}-500 rounded text-white`}>{tag.name}</span>
            <X size={14} className="cursor-pointer" onClick={() => handleDeleteTag(tag.id)} />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          className="bg-[#1e1e1e] p-2 rounded text-white"
          placeholder="Tag name"
        />
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value as typeof tagColors[number])}
          className="bg-[#1e1e1e] p-2 ml-2 rounded text-white"
        >
          {tagColors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
        <button onClick={handleAddTag} className="bg-green-600 px-4 py-2 ml-2 rounded text-white">Add Tag</button>
      </div>
    </AlertDialog>
  );
};

export default TagCreator;
