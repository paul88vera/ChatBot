DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ownerId VARCHAR(255),
  companyName VARCHAR(255) NOT NULL,
  companyEmail VARCHAR(255) NOT NULL,
  companyWebsite VARCHAR(255),
  companyLink VARCHAR(255),
  companyDescription TEXT,
  companyFaqs JSON,
  companyColor VARCHAR(9),
  companyDirection ENUM('left','right') NOT NULL DEFAULT 'right',
  companyChatboxActive TINYINT(1) NOT NULL DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE companies
ADD COLUMN publicId VARCHAR(32) NOT NULL UNIQUE AFTER id;