// permissions.js

export const FEATURES = Object.freeze({
  member: {
    color: true,
    agent: false,
    branding: false,
    leadCapture: false,
    faqs: false,
  },

  starter: {
    color: true,
    agent: false,
    branding: true,
    leadCapture: false,
    faqs: true,
  },

  pro: {
    color: true,
    agent: false,
    branding: true,
    leadCapture: true,
    faqs: true,
  },

  enterprise: {
    color: true,
    agent: true,
    branding: true,
    leadCapture: true,
    faqs: true,
  },
});

export const getPermissions = (plan = "member") => {
  return FEATURES[plan] || FEATURES.member;
};