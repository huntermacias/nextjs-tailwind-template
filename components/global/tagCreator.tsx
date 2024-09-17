import { useState, useEffect } from "react";
import { Plus, X, Tag } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "@/components/ui/date-picker"; // Import a date-picker component

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const tagColors = {
  red: "#FF6B6B",
  orange: "#FFA726",
  rose: "#FF85B2",
  purple: "#A77DF4",
  green: "#66BB6A",
  blue: "#64B5F6",
  yellow: "#FFF176",
};

const priorities = ["Low", "Medium", "High", "Urgent"]; // Priority options

const assignees = ["Jane Doe", "John Smith", "Emily Johnson", "Michael Brown"]; // Assignee options

interface Tag {
  id: string;
  name: string;
  color: keyof typeof tagColors;
  priority?: string;
  assignee?: string;
  dueDate?: Date | null;
}

interface TagFormValues {
  tagName: string;
  color: keyof typeof tagColors;
  priority: string;
  assignee?: string;
  dueDate?: Date | null;
}

interface TagCreatorProps {
  getSelectedTags: (tags: Tag[]) => void;
  defaultTags?: Tag[];
}

const TagCreator = ({ getSelectedTags, defaultTags = [] }: TagCreatorProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags);
  const [isOpen, setIsOpen] = useState(false); // Modal open state
  const [previewTag, setPreviewTag] = useState<Tag | null>(null); // Preview tag

  // Validation schema using zod
  const formSchema = z.object({
    tagName: z.string().min(2, { message: "Tag name must be at least 2 characters." }),
    color: z.string().min(1, { message: "Please select a color." }),
    priority: z.string(),
    assignee: z.string().optional(),
    dueDate: z.date().nullable().optional(),
  });

  const form = useForm<TagFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagName: "",
      color: "red",
      priority: "Medium",
      assignee: "",
      dueDate: null,
    },
  });

  // Submit handler
  const onSubmit: SubmitHandler<TagFormValues> = (values) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      ...values,
      name: ""
    };

    const existingTag = selectedTags.find(
      (tag) => tag.name.toLowerCase() === values.tagName.toLowerCase()
    );

    if (existingTag) {
      form.setError("tagName", { message: "Tag with this name already exists." });
      return;
    }

    setSelectedTags((prev) => [...prev, newTag]);
    setIsOpen(false); // Close the modal on successful submit
    form.reset(); // Reset form
  };

  // Live preview update
  useEffect(() => {
    const subscription = form.watch((values) => {
      setPreviewTag({
        id: "preview",
        name: values.tagName || "Tag Preview",
        color: values.color || "red", // Add a default value for color
        priority: values.priority,
        assignee: values.assignee,
        dueDate: values.dueDate,
      });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle delete tag
  const handleDeleteTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Selected Tags List */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedTags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 px-2 py-1 text-white rounded-md transition-all"
            style={{ backgroundColor: tagColors[tag.color] }}
          >
            <Tag size={14} className="text-white" />
            <span className="text-xs font-medium">{tag.name}</span>
            <X
              size={12}
              className="cursor-pointer text-white hover:text-red-500"
              onClick={() => handleDeleteTag(tag.id)}
            />
          </div>
        ))}
      </div>

      {/* Tag Preview */}
      {previewTag && (
        <div className="mt-6 p-4 bg-gray-800 text-white rounded-md">
          <h4 className="text-lg font-bold">Preview: {previewTag.name}</h4>
          <div className="flex gap-4 mt-2 text-sm">
            <span>
              Color:{" "}
              <span style={{ color: tagColors[previewTag.color] }}>{previewTag.color}</span>
            </span>
            <span>Priority: {previewTag.priority}</span>
            {previewTag.assignee && <span>Assignee: {previewTag.assignee}</span>}
            {previewTag.dueDate && <span>Due: {previewTag.dueDate.toDateString()}</span>}
          </div>
        </div>
      )}

      {/* Add Tag Button (Triggers Modal) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="mt-6 bg-blue-600/80 hover:bg-blue-700/90 text-white py-1 px-3 rounded-lg flex items-center transition-all"
          >
            <Plus size={14} />
            <span className="ml-2 text-sm">Add Tag</span>
          </Button>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="p-6 bg-gray-900/95 text-white rounded-md w-full sm:max-w-lg">
          <DialogTitle className="text-base font-bold">Create a New Tag</DialogTitle>
          <DialogDescription className="text-gray-400 text-xs mt-1">
            Fill out the form to create a new tag for your project.
          </DialogDescription>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Tag Name Input */}
              <FormField
                control={form.control}
                name="tagName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Tag Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tag name"
                        {...field}
                        className="bg-gray-800/80 text-white border border-gray-700 rounded-md px-3 py-1 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color Selector */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Tag Color</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-800/80 text-white border border-gray-700 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500"
                      >
                        {Object.keys(tagColors).map((color) => (
                          <option key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority Selector */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Priority</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-800/80 text-white border border-gray-700 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500"
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Assignee Selector */}
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Assignee</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-[#191919] text-white border border-gray-700 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Assignee</option>
                        {assignees.map((assignee) => (
                          <option key={assignee} value={assignee}>
                            {assignee}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Due Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600/80 hover:bg-green-700/90 text-white py-1 text-xs rounded-md transition-all"
              >
                Create Tag
              </Button>
            </form>
          </Form>

          {/* Close Button */}
          <Button
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagCreator;
