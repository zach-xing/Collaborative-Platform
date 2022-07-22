/*
  Warnings:

  - Added the required column `state` to the `CloudDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clouddocument` ADD COLUMN `state` LONGBLOB NOT NULL;
