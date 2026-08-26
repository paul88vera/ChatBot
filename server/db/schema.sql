-- =========================================================
-- ORGANIZATIONS
-- Clerk Organization + Stripe Billing Information
-- =========================================================

DROP TABLE IF EXISTS organizations;

CREATE TABLE organizations (

  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

  orgId VARCHAR(255) NOT NULL UNIQUE,

  stripeCustomerId VARCHAR(255) UNIQUE,

  stripeSubscriptionId VARCHAR(255) UNIQUE,

  stripePriceId VARCHAR(255),

  subscriptionStatus VARCHAR(50) NOT NULL DEFAULT 'inactive',

  subscriptionPlan ENUM(
    'free',
    'member',
    'starter',
    'pro',
    'enterprise'
  ) DEFAULT 'free',

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);


-- =========================================================
-- COMPANIES / CHATBOXES
-- Actual ChatBox configuration
-- =========================================================

DROP TABLE IF EXISTS companies;

CREATE TABLE companies (

  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

  publicId VARCHAR(32) NOT NULL UNIQUE,

  orgId VARCHAR(255) NOT NULL,

  companyName VARCHAR(255) NOT NULL DEFAULT 'New',

  companyEmail VARCHAR(255) NOT NULL,

  companyWebsite VARCHAR(255),

  companyLink VARCHAR(255),

  companyDescription TEXT,

  agentName TEXT,

  agentSubtitle TEXT,

  welcomeMessage TEXT,

  brandName TEXT,

  brandLink TEXT,

  companyFaqs JSON,

  companyColor VARCHAR(9),

  companyDirection ENUM(
    'left',
    'right'
  ) NOT NULL DEFAULT 'right',

  companyChatboxActive TINYINT(1) NOT NULL DEFAULT 1,

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_company_organization
    FOREIGN KEY (orgId)
    REFERENCES organizations(orgId)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);

CREATE INDEX idx_companies_org_id
  ON companies(orgId);