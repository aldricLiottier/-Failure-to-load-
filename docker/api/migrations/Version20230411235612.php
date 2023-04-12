<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230411235612 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE article (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, featured_image_id INTEGER DEFAULT NULL, title VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, content CLOB DEFAULT NULL, featured_text VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, CONSTRAINT FK_23A0E663569D950 FOREIGN KEY (featured_image_id) REFERENCES media (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_23A0E663569D950 ON article (featured_image_id)');
        $this->addSql('CREATE TABLE category (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, color VARCHAR(10) NOT NULL)');
        $this->addSql('CREATE TABLE category_article (category_id INTEGER NOT NULL, article_id INTEGER NOT NULL, PRIMARY KEY(category_id, article_id), CONSTRAINT FK_C5E24E1812469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_C5E24E187294869C FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_C5E24E1812469DE2 ON category_article (category_id)');
        $this->addSql('CREATE INDEX IDX_C5E24E187294869C ON category_article (article_id)');
        $this->addSql('CREATE TABLE comment (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, article_id INTEGER NOT NULL, content VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, CONSTRAINT FK_9474526C7294869C FOREIGN KEY (article_id) REFERENCES article (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_9474526C7294869C ON comment (article_id)');
        $this->addSql('CREATE TABLE media (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, alt_text VARCHAR(255) DEFAULT NULL)');
        $this->addSql('CREATE TABLE menu (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, article_id INTEGER DEFAULT NULL, category_id INTEGER DEFAULT NULL, page_id INTEGER DEFAULT NULL, name VARCHAR(255) NOT NULL, menu_order INTEGER DEFAULT NULL, link VARCHAR(255) DEFAULT NULL, CONSTRAINT FK_7D053A937294869C FOREIGN KEY (article_id) REFERENCES article (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_7D053A9312469DE2 FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_7D053A93C4663E4 FOREIGN KEY (page_id) REFERENCES page (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_7D053A937294869C ON menu (article_id)');
        $this->addSql('CREATE INDEX IDX_7D053A9312469DE2 ON menu (category_id)');
        $this->addSql('CREATE INDEX IDX_7D053A93C4663E4 ON menu (page_id)');
        $this->addSql('CREATE TABLE menu_menu (menu_source INTEGER NOT NULL, menu_target INTEGER NOT NULL, PRIMARY KEY(menu_source, menu_target), CONSTRAINT FK_B54ACADD8CCD27AB FOREIGN KEY (menu_source) REFERENCES menu (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_B54ACADD95287724 FOREIGN KEY (menu_target) REFERENCES menu (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_B54ACADD8CCD27AB ON menu_menu (menu_source)');
        $this->addSql('CREATE INDEX IDX_B54ACADD95287724 ON menu_menu (menu_target)');
        $this->addSql('CREATE TABLE option (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, label VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, value VARCHAR(255) DEFAULT NULL, type VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE page (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, content CLOB DEFAULT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE category_article');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE media');
        $this->addSql('DROP TABLE menu');
        $this->addSql('DROP TABLE menu_menu');
        $this->addSql('DROP TABLE option');
        $this->addSql('DROP TABLE page');
    }
}
