/*
  Warnings:

  - Added the required column `desc` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calendar` ADD COLUMN `desc` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Collaborator` (
    `cloudDocumentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cloudDocumentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Collaborator` ADD CONSTRAINT `Collaborator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collaborator` ADD CONSTRAINT `Collaborator_cloudDocumentId_fkey` FOREIGN KEY (`cloudDocumentId`) REFERENCES `CloudDocument`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
