"use client";

import * as React from "react";
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import Dropdown from "@/app/uitest/_components/dropdown";
import { Switch } from "../ui/switch";
import { DatePickerDemo } from "@/app/uitest/_components/datePicker";

// Mock data for dropdowns and other form fields
const statusOptions = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const priorityOptions = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const assignees = [
  { value: "user1", label: "You" },
  { value: "user2", label: "Jane Doe" },
];

const labels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
];

const cycleOptions = [
  { value: "cycle1", label: "Sprint 1" },
  { value: "cycle2", label: "Sprint 2" },
];

const modules = [
  { value: "module1", label: "UI" },
  { value: "module2", label: "Backend" },
];

// Main IssueForm component
const IssueForm = () => {
  const [status, setStatus] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [assignee, setAssignee] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [cycle, setCycle] = React.useState("");
  const [module, setModule] = React.useState("");
  const [createMore, setCreateMore] = React.useState(false);

  return (
    <div className="bg-[#191919] min-h-screen p-8 flex flex-col items-center">
      {/* Form Header */}
      <div className="w-[90%]">
        <p className="text-gray-400 text-xl font-semibold">Create New Issue</p>
        <p className="text-gray-400 text-sm">VP Consumer - Theme Parks</p>
      </div>

      {/* Title Input */}
      <Input
        type="text"
        placeholder="Title"
        className="w-[90%] bg-[#191919] text-white border border-[#333] p-3 rounded-md placeholder:text-gray-500 my-4"
      />

      {/* Description Input */}
      <Input
        type="text"
        placeholder="Click to add description"
        className="w-[90%] h-40 bg-[#191919] text-white border border-[#333] p-3 rounded-md placeholder:text-gray-500 my-4"
      />

      <Separator className="w-full bg-[#444] my-4 " />

      {/* Horizontal Dropdown Section */}
      <div className="flex justify-between items-center w-[90%] mb-4 space-x-4">
        <Dropdown
          options={statusOptions}
          placeholder="Backlog"
          value={status}
          setValue={setStatus}
        />
        <Dropdown
          options={priorityOptions}
          placeholder="None"
          value={priority}
          setValue={setPriority}
        />
        <Dropdown
          options={assignees}
          placeholder="Assignees"
          value={assignee}
          setValue={setAssignee}
        />
        <Dropdown
          options={labels}
          placeholder="Labels"
          value={label}
          setValue={setLabel}
        />
        <Dropdown
          options={cycleOptions}
          placeholder="Cycle"
          value={cycle}
          setValue={setCycle}
        />
        <Dropdown
          options={modules}
          placeholder="Modules"
          value={module}
          setValue={setModule}
        />
        {/* Start Date Picker */}
        <DatePickerDemo />
        {/* End Date Picker */}
        <DatePickerDemo />
      </div>
      <Separator className="w-full bg-[#444]" />

      {/* Create More Toggle */}
      <div className="flex justify-end w-[90%] items-center my-6">
        <div className="flex items-center space-x-4">
          <Switch checked={createMore} onChange={() => setCreateMore(!createMore)} />
          <span className="ml-2 text-gray-400">Create more</span>
          <button className="bg-[#191919] border border-[#333] text-gray-400 py-1 px-4 rounded-md">
            Discard
          </button>
          <button className="bg-blue-600 text-white py-1 px-4 rounded-md">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueForm;
