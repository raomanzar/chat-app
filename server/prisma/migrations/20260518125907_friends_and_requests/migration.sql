-- CreateEnum
CREATE TYPE "FriendRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "friendRequest" (
    "id" TEXT NOT NULL,
    "senderID" TEXT NOT NULL,
    "receiverID" TEXT NOT NULL,
    "status" "FriendRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friend" (
    "id" TEXT NOT NULL,
    "userId1" TEXT NOT NULL,
    "userId2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "friendRequest_senderID_idx" ON "friendRequest"("senderID");

-- CreateIndex
CREATE INDEX "friendRequest_receiverID_idx" ON "friendRequest"("receiverID");

-- CreateIndex
CREATE UNIQUE INDEX "friendRequest_senderID_receiverID_key" ON "friendRequest"("senderID", "receiverID");

-- CreateIndex
CREATE INDEX "friend_userId1_idx" ON "friend"("userId1");

-- CreateIndex
CREATE INDEX "friend_userId2_idx" ON "friend"("userId2");

-- CreateIndex
CREATE UNIQUE INDEX "friend_userId1_userId2_key" ON "friend"("userId1", "userId2");

-- AddForeignKey
ALTER TABLE "friendRequest" ADD CONSTRAINT "friendRequest_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendRequest" ADD CONSTRAINT "friendRequest_receiverID_fkey" FOREIGN KEY ("receiverID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
