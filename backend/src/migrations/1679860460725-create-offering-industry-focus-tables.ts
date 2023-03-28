import {MigrationInterface, QueryRunner} from "typeorm"

export class createOfferingIndustryFocusTables1679860460725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS \`Investors\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`Name\` text,
          \`Location\` text,
          \`FundingAmount\` int DEFAULT NULL,
          \`Start\` int DEFAULT NULL,
          \`End\` int DEFAULT NULL,
          \`Collateral\` text,
          \`Terms\` text,
          \`Focus\` text,
          \`ProjectPhase\` text,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`id\` (\`id\`)
        ); ENGINE=InnoDB AUTO_INCREMENT=9;
        
        CREATE TABLE IF NOT EXISTS \`introductions\` (
          \`contactEmail\` varchar(255) DEFAULT NULL,
          \`message\` varchar(255) NOT NULL,
          \`introductionId\` int unsigned NOT NULL AUTO_INCREMENT,
          \`approvalState\` enum('0','1','2') NOT NULL,
          \`createUserId\` int unsigned DEFAULT NULL,
          \`receiveUserId\` int unsigned NOT NULL,
          \`offeringId\` int unsigned NOT NULL,
          PRIMARY KEY (\`introductionId\`),
          KEY \`FK_d851ffc9e2622bad7c3e497f6a2\` (\`createUserId\`),
          KEY \`FK_5984f31ea372beb5d7a240a7bba\` (\`receiveUserId\`),
          KEY \`FK_8f0cc58ea6a80853ea7294448a0\` (\`offeringId\`),
          CONSTRAINT \`FK_5984f31ea372beb5d7a240a7bba\` FOREIGN KEY (\`receiveUserId\`) REFERENCES \`user\` (\`id\`),
          CONSTRAINT \`FK_8f0cc58ea6a80853ea7294448a0\` FOREIGN KEY (\`offeringId\`) REFERENCES \`offerings\` (\`offeringId\`),
          CONSTRAINT \`FK_d851ffc9e2622bad7c3e497f6a2\` FOREIGN KEY (\`createUserId\`) REFERENCES \`user\` (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        CREATE TABLE IF NOT EXISTS \`offering_files\` (
          \`offeringFileId\` int unsigned NOT NULL AUTO_INCREMENT,
          \`offeringId\` int unsigned NOT NULL,
          \`name\` varchar(255) NOT NULL,
          \`url\` varchar(255) NOT NULL,
          PRIMARY KEY (\`offeringFileId\`),
          KEY \`FK_531bb15cc3c53b256ba573ac05a\` (\`offeringId\`),
          CONSTRAINT \`FK_531bb15cc3c53b256ba573ac05a\` FOREIGN KEY (\`offeringId\`) REFERENCES \`offerings\` (\`offeringId\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        CREATE TABLE IF NOT EXISTS \`offerings\` (
          \`offeringId\` int unsigned NOT NULL AUTO_INCREMENT,
          \`name\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
          \`description\` varchar(255) NOT NULL,
          \`investorOfferingType\` int DEFAULT NULL,
          \`location\` varchar(255) NOT NULL,
          \`contactEmail\` varchar(255) NOT NULL,
          \`approvalState\` int NOT NULL,
          \`amountRequested\` int DEFAULT NULL,
          \`amountRangeStart\` int DEFAULT NULL,
          \`amountRangeEnd\` int DEFAULT NULL,
          \`userId\` int unsigned NOT NULL,
          \`collateral\` varchar(255) NOT NULL,
          \`terms\` varchar(255) NOT NULL,
          \`projectPhase\` varchar(255) NOT NULL,
          \`industry\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          PRIMARY KEY (\`offeringId\`),
          KEY \`FK_0a87c7142978a9dd9ec7571b8e5\` (\`userId\`),
          CONSTRAINT \`FK_0a87c7142978a9dd9ec7571b8e5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

      CREATE TABLE IF NOT EXISTS \`industry\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      );

      CREATE TABLE IF NOT EXISTS \`offering_industry_focus\` (
        \`industryId\` int NOT NULL,
        \`offeringId\` int NOT NULL,
        PRIMARY KEY (\`industryId\`, \`offeringId\`),
        CONSTRAINT \`FK_7c0f5cd8b14d25672d16ef842c3\` FOREIGN KEY (\`industryId\`) REFERENCES \`industry\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`FK_83fd56b5ddc3e3fcf01d5239b43\` FOREIGN KEY (\`offeringId\`) REFERENCES \`offerings\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
      );
      
        LOCK TABLES \`user\` WRITE;
        /*!40000 ALTER TABLE \`user\` DISABLE KEYS */;
        INSERT IGNORE INTO \`user\` VALUES (2,'devinharris.316@gmail.com','$2b$12$6Yy.BvDK4fjEKz7l1CW9qu6t1EjSlRn5Wyt9Hvx6ze5JDdaRsm2Ka',1,'Investor',0,NULL),(5,'lewiswargo@yahoo.com','$2b$12$i4zBvx5BiYb8bBrENolj5uB7znhdBmEKeU1nlCmbjVIOZapVMSeS2',1,'Advertiser',0,'9e182b15-819b-4ad7-a3d6-11dbb6f1abea'),(7,'SUSANWARGO@YAHOO.COM','$2b$12$JOXTntRxmx/j/syO289NeOGS.lQ8a9Q0Q43v8VUOZI/9tbh/EzN1K',1,'Advertiser',0,NULL),(9,'investors@myideaswork.com','$2b$12$McBdi1N2L9kFU7hucxZFxuYANKIbtSrdWPqvhxJiB2ISR4QhHMIYu',1,'Investor',0,NULL),(10,'sasha@envionsoftware.com','$2b$12$hlC0s1BqdlFXfp3LxwFgsO6o9Xn9Lfk019wE/hJwQoJ1aWfGvDTfu',1,'Advertiser',0,NULL),(11,'roy1susan2@hotmail.com','$2b$12$bZ7jlxdpveVpQSFGKumXQed6lZtRFTD4ayg9hauetOxj2juGCAuB.',1,'Advertiser',0,NULL),(12,'investors@myideaswork.org','$2b$12$BeAfQZyu/wo0bqUSGPgUje5tBw9p24foYz8fNTSs2wVfckac9nwG6',0,'Investor',0,NULL),(13,'aperfectlover@yahoo.com','$2b$12$r.UtWrXtfZsMn0y5nWKKKOkDv2upqDG12HvHGbbBBaq1aYtZo/Uyi',0,'Advertiser',0,NULL),(14,'mylittleway2@yahoo.com','$2b$12$.EDkq4RvsCAwGrbMqafs/.CVrtQOWqtx1y/yheio51.IMSEK1YTJ2',0,'Advertiser',0,NULL),(15,'test@test.com','$2b$12$bPwn7EXlE3xrR0Fo6Atl6OCITbLuf2GZqosZPtR78r1vQk.eanyny',0,'Advertiser',0,NULL);
        /*!40000 ALTER TABLE \`user\` ENABLE KEYS */;
        UNLOCK TABLES;
        /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
        
        INSERT IGNORE INTO industries (id, name) VALUES (1, 'Advanced Materials'), (2, 'Advertising (AdTech)'), (3, 'AgTech (FarmTech)'), (4, 'Aerospace & Defense'), (5, 'Artificial Intelligence & Machine Learning (AI/ML)'), (6, 'Apps'), (7, 'Augmented & Virtual Reality (AR/VR)'), (8, 'AudioTech'), (9, 'B2C'), (10, 'Beauty'), (11, 'B2B'), (12, 'Big Data & Analytics'), (13, 'BioTech'), (14, 'Black / African American Founded'), (15, 'Business Products & Services'), (16, 'Cannabis'), (17, 'Chemicals & Materials'), (18, 'ClimateTech & CleanTech'), (19, 'CloudTech'), (20, 'Cloud Security'), (21, 'CMS'), (22, 'Collaboration'), (23, 'Communications Infrastructure'), (24, 'Community'), (25, 'Computers'), (26, 'Construction Tech'), (27, 'Consulting'), (28, 'Consumer'), (29, 'Consumer Electronics'), (30, 'Consumer Goods'), (31, 'Consumer Internet'), (32, 'CPG'), (33, 'Creator Economy'), (34, 'CRM'), (35, 'Cryptocurrency / Blockchain'), (36, 'Cybersecurity'), (37, 'Customer Service'), (38, 'D2C'), (39, 'DeepTech'), (40, 'Delivery'), (41, 'Developer Tools'), (42, 'Distribution & Retailing'), (43, 'Diversified'), (44, 'Entertainment & Media'), (45, 'E-Commerce'), (46, 'EdTech'), (47, 'Eldercare'), (48, 'Energy'), (49, 'Enterprise'), (50, 'Entertainment'), (51, 'E-Sports (Gaming)'), (52, 'Events'), (53, 'Environment'), (54, 'Fashion'), (55, 'FemTech'), (56, 'FinTech'), (57, 'Food and Beverage'), (58, 'Future of Work'), (59, 'GovTech'), (60, 'Hardware'), (61, 'Healthcare'), (62, 'Health & Wellbeing'), (63, 'Hospitality'), (64, 'HR Tech'), (65, 'Impact Investing'), (66, 'Industrials'), (67, 'Information Technology'), (68, 'Infrastructure'), (69, 'InsurTech'), (70, 'Internet'), (71, 'IoT (Internet of Things)'), (72, 'IT Services'), (73, 'Legal Tech'), (74, 'Life Science'), (75, 'Logistics'), (76, 'Manufacturing'), (77, 'Marketing (MarTech)'), (78, 'Marketplace'), (79, 'Market Research'), (80, 'Medical Device'), (81, 'Meeting Software'), (82, 'Micro-Mobility'), (83, 'Mobile'), (84, 'Nanotechnology'), (85, 'Network Security'), (86, 'Neuroscience'), (87, 'Oil & Gas'), (88, 'Travel'), (89, 'PaaS (Platforms)'), (90, 'Parenting
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
