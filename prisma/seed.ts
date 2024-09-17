import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some categories
  const category = await prisma.category.create({
    data: {
      name: 'Tech',
    },
  });

  // Create some tags
  const tag1 = await prisma.tag.create({ data: { name: 'JavaScript' } });
  const tag2 = await prisma.tag.create({ data: { name: 'Next.js' } });

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'USER',
      profile: {
        create: {
          bio: 'Full Stack Developer',
          avatarUrl: 'https://example.com/avatar.png',
        },
      },
      posts: {
        create: [
          {
            title: 'Introduction to Next.js',
            content: 'This is an introduction to Next.js...',
            published: true,
            category: { connect: { id: category.id } },
            tags: {
              connect: [{ id: tag1.id }, { id: tag2.id }],
            },
          },
        ],
      },
    },
  });

  console.log({ user, category, tag1, tag2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
