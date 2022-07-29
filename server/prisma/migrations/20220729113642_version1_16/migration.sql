-- CreateTable
CREATE TABLE `OnlineEditPerson` (
    `id` VARCHAR(191) NOT NULL,
    `onlineCids` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OnlineEditPerson` ADD CONSTRAINT `OnlineEditPerson_id_fkey` FOREIGN KEY (`id`) REFERENCES `CloudDocument`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
