/*
  Warnings:

  - Added the required column `line_text` to the `Chat_Line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chat_line` ADD COLUMN `line_text` TEXT NOT NULL;
