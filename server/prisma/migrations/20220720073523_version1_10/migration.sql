/*
  Warnings:

  - Added the required column `userName` to the `Chat_Line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chat_line` ADD COLUMN `userName` VARCHAR(191) NOT NULL;
