import { normalizePair } from "../../hooks/normalization.js";
import { prisma } from "../../utils/db.js";

export const sendMessageService = async ({ senderId, receiverId, content }) => {
  if (!senderId) {
    throw new Error("Sender ID is required");
  }
  if (!receiverId) {
    throw new Error("Receiver ID is required");
  }
  if (!content) {
    throw new Error("Message content is required");
  }
  if (senderId === receiverId) {
    throw new Error("You cannot send message to yourself");
  }

  const [u1, u2] = normalizePair(senderId, receiverId);

  const existingFriend = await prisma.friend.findFirst({
    where: {
      userId1: u1,
      userId2: u2,
    },
  });

  if (!existingFriend) {
    throw new Error("You can only send messages to friends");
  }

  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  });

  return message;
};

export const markMessageAsReadService = async ({ receiverId, senderId }) => {
  await prisma.message.updateMany({
    where: {
      senderId,
      receiverId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};

export const getMessagesService = async ({
  userId,
  otherUserId,
  limit = 50,
  cursor,
}) => {
  if (!userId) throw new Error("User ID is required");
  if (!otherUserId) throw new Error("Other user ID is required");

  const where = {
    OR: [
      { senderId: userId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: userId },
    ],
  };

  if (cursor) {
    // ye condition first time py false ho gi, second time jab user scroll up kre ga to last message ki createdAt date ho gi taky wo mazeed purane message fetch kre
    where.createdAt = { lt: new Date(cursor) };
  }

  const messages = await prisma.message.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = messages.length > limit;
  const result = hasMore ? messages.slice(0, limit) : messages;

  return {
    messages: result,
    hasMore,
    nextCursor: hasMore
      ? result[result.length - 1].createdAt.toISOString()
      : null, // ye jo last message ho ga uska time stamp bheje ga
  };
};

export const getConversationsService = async ({ userId }) => {
  const friendShips = await prisma.friend.findMany({
    where: {
      OR: [{ userId1: userId }, { userId2: userId }],
    },
    include: {
      user1: { select: { id: true, name: true, email: true, image: true } },
      user2: { select: { id: true, name: true, email: true, image: true } },
    },
  });

  const friends = friendShips.map((f) =>
    f.userId1 === userId ? f.user2 : f.user1,
  );

  const friendsIds = friends.map((f) => f.id);

  const allMessages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: { in: friendsIds } },
        { receiverId: userId, senderId: { in: friendsIds } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  const lastMessages = new Map();
  const unreadCounts = new Map();

  allMessages.forEach((msg) => {
    const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId;

    if (!lastMessages.has(partnerId)) {
      lastMessages.set(partnerId, msg);
    }
    if (
      msg.senderId === partnerId &&
      msg.receiverId === userId &&
      !msg.isRead
    ) {
      unreadCounts.set(partnerId, (unreadCounts.get(partnerId) || 0) + 1);
    }
  });

  const conversations = friends.map((friend) => ({
    ...friend,
    lastMessage: lastMessages.get(friend.id) || null,
    unreadCount: unreadCounts.get(friend.id) || 0,
  }));

  return conversations.sort((a, b) => {
    const timeA = a.lastMessage.createdAt || new Date(0);
    const timeB = b.lastMessage.createdAt || new Date(0);
    return timeB - timeA;
  });
};
