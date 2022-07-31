/*
  Warnings:

  - You are about to drop the column `line_text` on the `chat_line` table. All the data in the column will be lost.
  - Added the required column `chat_line` to the `Chat_Line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Chat_Line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chat_line` DROP COLUMN `line_text`,
    ADD COLUMN `chat_line` TEXT NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
