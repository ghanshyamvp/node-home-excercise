const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class product1620307018244 {

    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` timestamp(6) NULL, `product_name` varchar(255) NOT NULL, `price` float NOT NULL, `view_count` int NOT NULL DEFAULT '0', `slug` varchar(255) NOT NULL, `description` text NULL, UNIQUE INDEX `IDX_8cfaf4a1e80806d58e3dbe6922` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    async down(queryRunner) {
        await queryRunner.query("DROP INDEX `IDX_8cfaf4a1e80806d58e3dbe6922` ON `product`");
        await queryRunner.query("DROP TABLE `product`");
    }
}
