/*
  Warnings:

  - You are about to drop the `chat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_userId_fkey`;

-- DropForeignKey
ALTER TABLE `chat_line` DROP FOREIGN KEY `Chat_Line_chatId_fkey`;

-- DropTable
DROP TABLE `chat`;

-- CreateTable
CREATE TABLE `ChatRoom` (
    `id` VARCHAR(191) NOT NULL,
    `userIds` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat_Line` ADD CONSTRAINT `Chat_Line_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `ChatRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
