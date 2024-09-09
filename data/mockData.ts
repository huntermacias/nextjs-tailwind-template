import { Column, Task } from "@/types";

// mockData.ts

export const mockTasks: Task[] = [
  {
    id: "task1",
    columnId: "backlog",
    title: "Build User Authentication",
    description: "Implement SSO authentication using OAuth and JWT.",
    completed: false,
    priority: "high",
    dueDate: new Date("2024-09-15"),
    assignee: "Jane Doe",
    timeSpent: 5,
    comments: [
      {
        id: "comment1",
        author: "John Smith",
        content: "We need to add 2FA as well.",
        createdAt: new Date("2024-09-10"),
      },
    ],
    attachments: [
      { id: "attachment1", name: "oauth-config.json", url: "/files/oauth-config.json" },
    ],
    tags: [
      { id: "tag1", name: "Backend", color: "red" },
      { id: "tag2", name: "Authentication", color: "green" },
    ],
  },
  {
    id: "task2",
    columnId: "in-progress",
    title: "Design New Homepage Layout",
    description: "Redesign the homepage with modern UI/UX best practices.",
    completed: false,
    priority: "medium",
    dueDate: new Date("2024-09-20"),
    assignee: "John Smith",
    timeSpent: 3,
    comments: [
      {
        id: "comment2",
        author: "Jane Doe",
        content: "We need to ensure it's responsive.",
        createdAt: new Date("2024-09-12"),
      },
    ],
    attachments: [],
    tags: [
      { id: "tag3", name: "UI/UX", color: "purple" },
      { id: "tag4", name: "Design", color: "orange" },
    ],
  },
  {
    id: "task3",
    columnId: "done",
    title: "Setup CI/CD Pipeline",
    description: "Create automated deployment pipelines using Jenkins.",
    completed: true,
    priority: "high",
    dueDate: new Date("2024-09-05"),
    assignee: "Emily Johnson",
    timeSpent: 10,
    comments: [
      {
        id: "comment3",
        author: "John Smith",
        content: "This is working smoothly, nice job.",
        createdAt: new Date("2024-09-06"),
      },
    ],
    attachments: [
      { id: "attachment2", name: "jenkins-config.yml", url: "/files/jenkins-config.yml" },
    ],
    tags: [
      { id: "tag5", name: "DevOps", color: "blue" },
      { id: "tag6", name: "CI/CD", color: "yellow" },
    ],
  },
  {
    id: "task4",
    columnId: "backlog",
    title: "Improve API Performance",
    description: "Optimize API calls to reduce latency by 20%.",
    completed: false,
    priority: "urgent",
    dueDate: new Date("2024-09-22"),
    assignee: "Michael Brown",
    timeSpent: 2,
    comments: [
      {
        id: "comment4",
        author: "Emily Johnson",
        content: "Consider using caching for repeated requests.",
        createdAt: new Date("2024-09-14"),
      },
    ],
    attachments: [],
    tags: [
      { id: "tag7", name: "Backend", color: "red" },
      { id: "tag8", name: "Optimization", color: "green" },
    ],
  },
  {
    id: "task5",
    columnId: "todo",
    title: "Write Unit Tests",
    description: "Create unit tests for the new user authentication module.",
    completed: false,
    priority: "low",
    dueDate: new Date("2024-09-25"),
    assignee: "Jessica Adams",
    timeSpent: 1,
    comments: [
      {
        id: "comment5",
        author: "John Smith",
        content: "Let's ensure we have 100% coverage.",
        createdAt: new Date("2024-09-18"),
      },
    ],
    attachments: [],
    tags: [
      { id: "tag9", name: "Testing", color: "blue" },
      { id: "tag10", name: "QA", color: "yellow" },
    ],
  },
];

// More detailed mock columns

export const mockColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      {
        id: "task1",
        columnId: "backlog",
        title: "Build User Authentication",
        description: "Implement SSO authentication using OAuth and JWT.",
        completed: false,
        priority: "high",
        dueDate: new Date("2024-09-15"),
        assignee: "Jane Doe",
        timeSpent: 5,
        comments: [{ id: "comment1", author: "John Smith", content: "We need to add 2FA as well.", createdAt: new Date() }],
        attachments: [{ id: "attachment1", name: "oauth-config.json", url: "#" }],
        tags: [{ id: "tag1", name: "Backend", color: "red" }],
      },
      {
        id: "task4",
        columnId: "backlog",
        title: "Improve API Performance",
        description: "Optimize API calls to reduce latency by 20%.",
        completed: false,
        priority: "urgent",
        dueDate: new Date("2024-09-22"),
        assignee: "Michael Brown",
        timeSpent: 2,
        comments: [{ id: "comment4", author: "Emily Johnson", content: "Consider using caching for repeated requests.", createdAt: new Date() }],
        attachments: [],
        tags: [{ id: "tag2", name: "Optimization", color: "green" }],
      },
    ],
  },
  {
    id: "todo",
    title: "Todo",
    tasks: [
      {
        id: "task5",
        columnId: "todo",
        title: "Write Unit Tests",
        description: "Create unit tests for the new user authentication module.",
        completed: false,
        priority: "low",
        dueDate: new Date("2024-09-25"),
        assignee: "Jessica Adams",
        timeSpent: 1,
        comments: [{ id: "comment5", author: "John Smith", content: "Let's ensure we have 100% coverage.", createdAt: new Date() }],
        attachments: [],
        tags: [{ id: "tag9", name: "Testing", color: "blue" }],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task2",
        columnId: "in-progress",
        title: "Design New Homepage Layout",
        description: "Redesign the homepage with modern UI/UX best practices.",
        completed: false,
        priority: "medium",
        dueDate: new Date("2024-09-20"),
        assignee: "John Smith",
        timeSpent: 3,
        comments: [{ id: "comment2", author: "Jane Doe", content: "We need to ensure it's responsive.", createdAt: new Date() }],
        attachments: [],
        tags: [{ id: "tag3", name: "UI/UX", color: "purple" }],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "task3",
        columnId: "done",
        title: "Setup CI/CD Pipeline",
        description: "Create automated deployment pipelines using Jenkins.",
        completed: true,
        priority: "high",
        dueDate: new Date("2024-09-05"),
        assignee: "Emily Johnson",
        timeSpent: 10,
        comments: [{ id: "comment3", author: "John Smith", content: "This is working smoothly, nice job.", createdAt: new Date() }],
        attachments: [{ id: "attachment2", name: "jenkins-config.yml", url: "/files/jenkins-config.yml" }],
        tags: [{ id: "tag5", name: "DevOps", color: "blue" }],
      },
    ],
  },
];
