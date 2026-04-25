/*
  Warnings:

  - The values [CANCELED] on the enum `orders_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('QUEUED', 'CUTTING', 'SEWING', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'QUEUED';
