import type { Channel, Message } from "@prisma/client";

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
  email: string;
  status: "Online" | "Do not disturb" | "Offline" | "Inactive";
}

export const mockUsers: UserProps[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "alice.johnson@example.com",
    status: "Online",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "bob.smith@example.com",
    status: "Offline",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Charlie Brown",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    email: "charlie.brown@example.com",
    status: "Do not disturb",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Diana Ross",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "diana.ross@example.com",
    status: "Online",
  },
];

export const mockChannels: Channel[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "General Discussion",
    description: "A channel for general team discussions",
    createdAt: new Date("2024-02-17T10:00:00Z"),
    updatedAt: new Date("2024-02-17T10:00:00Z"),
    createdBy: "550e8400-e29b-41d4-a716-446655440000",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Project Progress",
    description: "Share and discuss project progress",
    createdAt: new Date("2024-02-17T10:00:00Z"),
    updatedAt: new Date("2024-02-17T10:00:00Z"),
    createdBy: "550e8400-e29b-41d4-a716-446655440000",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Random Chatter",
    description: "Casual conversations and fun topics",
    createdAt: new Date("2024-02-17T10:00:00Z"),
    updatedAt: new Date("2024-02-17T10:00:00Z"),
    createdBy: "550e8400-e29b-41d4-a716-446655440000",
  },
];

export const mockChats: Message[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440020",
    channelId: mockChannels[0].id,
    userId: mockUsers[0].id,
    content: "Hey everyone, welcome to the General Discussion channel!",
    createdAt: new Date("2024-02-17T10:00:00Z"),
    updatedAt: new Date("2024-02-17T10:00:00Z"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440021",
    channelId: mockChannels[0].id,
    userId: mockUsers[1].id,
    content: "Hi Alice, great to be here!",
    createdAt: new Date("2024-02-17T10:05:00Z"),
    updatedAt: new Date("2024-02-17T10:05:00Z"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440022",
    channelId: mockChannels[1].id,
    userId: mockUsers[0].id,
    content: "We need to discuss the latest project milestones.",
    createdAt: new Date("2024-02-17T11:00:00Z"),
    updatedAt: new Date("2024-02-17T11:00:00Z"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440023",
    channelId: mockChannels[2].id,
    userId: mockUsers[2].id,
    content: "Anyone up for a fun trivia game?",
    createdAt: new Date("2024-02-17T12:00:00Z"),
    updatedAt: new Date("2024-02-17T12:00:00Z"),
  },
];
