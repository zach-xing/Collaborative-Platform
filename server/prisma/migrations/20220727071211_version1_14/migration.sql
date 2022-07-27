/*
  Warnings:

  - You are about to drop the `collaborator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collaborators` to the `CloudDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `CloudDocument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `collaborator` DROP FOREIGN KEY `Collaborator_cloudDocumentId_fkey`;

-- AlterTable
ALTER TABLE `clouddocument` ADD COLUMN `collaborators` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `collaborator`;

-- AddForeignKey
ALTER TABLE `CloudDocument` ADD CONSTRAINT `CloudDocument_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
