import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all published posts along with their author, category, and tags
export const getPublishedPosts = async () => {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: { select: { name: true } },
    },
  });
};

// Fetch a single post by ID
// Fetch a single post by ID
export const getPostById = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: { select: { name: true } },
    },
  });
};


// Fetch all users with their posts and profile
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
};
