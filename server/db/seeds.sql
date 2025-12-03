INSERT INTO companies (
  ownerId,
  publicId,
  companyName,
  companyEmail,
  companyWebsite,
  companyLink,
  companyDescription,
  companyFaqs,
  companyColor,
  companyDirection
) VALUES (
  'org_35XazIKELpblmzUAy6SKLQRCLqa',
  'cmp_9e3ad2c1',
  'Verafied Tech',
  'support@verafied.tech',
  'VERAfied.Tech',
  'https://verafied.tech',
  'Affordable IT and SaaS services.',
  JSON_ARRAY(
    'What services do you offer?',
    'Do you have monthly pricing?',
    'What technologies do you use?'
  ),
  '#ac29c3ff',
  'left'
);