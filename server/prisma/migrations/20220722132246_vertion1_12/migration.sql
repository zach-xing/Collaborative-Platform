/*
  Warnings:

  - You are about to drop the column `cloudFileId` on the `clouddocument` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `clouddocument` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `cloudfile` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `cloudfile` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `cloudfile` table. All the data in the column will be lost.
  - You are about to drop the column `updateTime` on the `cloudfile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `collaborator` table. All the data in the column will be lost.
  - Added the required column `version` to the `CloudDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `CloudFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onlineUserIds` to the `Collaborator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIds` to the `Collaborator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clouddocument` DROP FOREIGN KEY `CloudDocument_cloudFileId_fkey`;

-- DropForeignKey
ALTER TABLE `collaborator` DROP FOREIGN KEY `Collaborator_userId_fkey`;

-- AlterTable
ALTER TABLE `clouddocument` DROP COLUMN `cloudFileId`,
    DROP COLUMN `state`,
    ADD COLUMN `isCollaborate` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `version` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cloudfile` DROP COLUMN `label`,
    DROP COLUMN `parentId`,
    DROP COLUMN `type`,
    DROP COLUMN `updateTime`,
    ADD COLUMN `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `collaborator` DROP COLUMN `userId`,
    ADD COLUMN `onlineUserIds` VARCHAR(191) NOT NULL,
    ADD COLUMN `userIds` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CloudFile` ADD CONSTRAINT `CloudFile_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
