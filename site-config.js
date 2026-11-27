window.SROTA_SITE_CONFIG = {
  // Google Form that receives clinician inquiries.
  clinicianInquiryForm: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSdl1kTUn9ES84N08a3AYlA3lSHjTo4t3CSS2AOmroqJmTsxRA/formResponse",
    fields: { name: "entry.1010168699", whatsapp: "entry.1715904996", email: "entry.1001129347", referral: "entry.563074062" },
    referralChoices: {
      "Through social media": "Social media",
      "Through another clinician or colleague": "Other doctors or colleagues",
    },
  },
  waitlistEndpoint: "https://api.srotabio.com/api/waitlist",
  // Calendar booking page opened by the Contact page "Book a call" button.
  calendarUrl: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ27-MP2yBSu-PCL_YuVqykr51sVgR6r61suJDb6HFLbv-5s0H1-4LhygOWoEH6NFFPOMXfxFp_p",
  // Google Form that receives Contact page submissions:
  // the form's ".../formResponse" URL and the entry IDs for each question.
  contactForm: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSdMiFmGGrfxF9aJfvKyLtQtNXDSzJj8csvJccJ-uhUf-pfp0g/formResponse",
    fields: { name: "entry.778828964", phone: "entry.1022058739", email: "entry.1217637333" },
  },
};
