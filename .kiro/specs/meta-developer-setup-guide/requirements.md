# Requirements Document

## Introduction

Yeh feature AutoflowPilot ke users ko ek step-by-step interactive guide provide karta hai jisme Meta Developer Portal mein apni app configure karne ke liye saari settings aur fields ko sahi tarike se fill karna sikhaya jata hai. Iska maqsad yeh hai ki user bina kisi confusion ke Meta App ID, App Secret, OAuth Redirect URIs, Permissions/Scopes, aur Webhook settings sahi jagah enter kar sake taaki Facebook aur Instagram OAuth integration properly kaam kare.

Yeh guide AutoflowPilot ke Integrations page ke saath tightly integrated hogi — jab user pehli baar Meta platform connect karne ki koshish kare, ya manually "Setup Guide" open kare, tab yeh guide ek step-by-step wizard ya modal ke roop mein dikhegi.

## Glossary

- **Setup_Guide**: AutoflowPilot ka interactive step-by-step wizard jo Meta Developer Portal configuration ke liye instructions deta hai.
- **User**: Ek authenticated AutoflowPilot account holder jo Meta integration configure karna chahta hai.
- **Meta_Developer_Portal**: Meta ka official developer dashboard at https://developers.facebook.com jahan apps register aur configure hoti hain.
- **Meta_App**: User ki registered Meta application jisme App ID, App Secret, aur platform-specific products hote hain.
- **App_ID**: Meta Developer Portal mein Meta_App ka unique numeric identifier (e.g., `992279893125717`).
- **App_Secret**: Meta Developer Portal mein Meta_App ka secret key jo backend mein securely store hota hai.
- **Redirect_URI**: Woh URL jo Meta OAuth callback ke liye register hota hai — AutoflowPilot ke liye yeh `https://autoflow-api.vercel.app/api/integrations/meta/callback` hai.
- **OAuth_Scope**: Meta permissions jo AutoflowPilot ko user ke account access karne ke liye chahiye (e.g., `instagram_basic`, `pages_messaging`).
- **Webhook**: Meta ka event notification system jo real-time updates bhejta hai AutoflowPilot backend ko.
- **Verify_Token**: Ek user-defined secret string jo Meta Webhook verification ke liye use hota hai.
- **Integration_API**: AutoflowPilot ka Express.js backend at `https://autoflow-api.vercel.app`.
- **Integrations_Page**: AutoflowPilot ka React frontend page `src/pages/Integrations.jsx`.
- **Setup_Progress**: User ki current configuration progress jo track karta hai ki kaun se steps complete hue hain.
- **Validation_Service**: Setup_Guide ka woh component jo user ke entered values ko format aur completeness ke liye check karta hai.

---

## Requirements

### Requirement 1: Setup Guide Launch karna

**User Story:** As a User, I want to open the Meta Developer Setup Guide from the Integrations page, so that I can get step-by-step instructions to configure my Meta app correctly.

#### Acceptance Criteria

1. WHEN a User clicks "Connect" on an Instagram ya Facebook card aur Meta configuration incomplete hai, THE Integrations_Page SHALL Setup_Guide wizard open kare.
2. THE Integrations_Page SHALL ek "Setup Guide" ya "How to Configure" button display kare har Meta platform card par jo directly Setup_Guide launch kare.
3. WHEN Setup_Guide launch hoti hai, THE Setup_Guide SHALL user ko current setup progress ke hisaab se sahi step par le jaaye.
4. IF User ne pehle koi steps complete kiye hain, THEN THE Setup_Guide SHALL woh steps "completed" mark karke dikhaye aur user ko incomplete step par le jaaye.
5. THE Setup_Guide SHALL ek modal ya side-panel ke roop mein render ho jo Integrations_Page ke upar overlay ho, bina page navigation ke.

---

### Requirement 2: Meta Developer App Create karne ki Guide

**User Story:** As a User, I want step-by-step instructions to create a Meta Developer app, so that I have the App ID and App Secret needed for OAuth integration.

#### Acceptance Criteria

1. THE Setup_Guide SHALL Step 1 mein user ko yeh instructions de: Meta Developer Portal (https://developers.facebook.com) par jaao, "My Apps" click karo, "Create App" select karo.
2. THE Setup_Guide SHALL user ko "Business" app type select karne ki instruction de aur explain kare ki yeh type kyun zaroori hai AutoflowPilot ke liye.
3. WHEN user Step 1 complete karta hai, THE Setup_Guide SHALL ek input field dikhaye jisme user apna App ID enter kare.
4. THE Setup_Guide SHALL ek input field dikhaye jisme user apna App Secret enter kare, aur yeh field masked (password type) ho.
5. WHEN user App ID enter karta hai, THE Validation_Service SHALL verify kare ki value sirf numeric characters hai aur minimum 10 digits ki hai.
6. IF App ID format invalid hai, THEN THE Validation_Service SHALL ek inline error message dikhaye: "App ID sirf numbers hona chahiye, minimum 10 digits."
7. THE Setup_Guide SHALL ek "Copy" button provide kare jo AutoflowPilot ka expected App ID format clipboard mein copy kare as reference.

---

### Requirement 3: OAuth Redirect URI Configure karne ki Guide

**User Story:** As a User, I want clear instructions to add the correct OAuth Redirect URI in Meta Developer Portal, so that Meta can redirect back to AutoflowPilot after authorization.

#### Acceptance Criteria

1. THE Setup_Guide SHALL Step 2 mein user ko yeh path bataye: Meta Developer Portal → apni app → "Facebook Login" product → "Settings" → "Valid OAuth Redirect URIs".
2. THE Setup_Guide SHALL Redirect_URI (`https://autoflow-api.vercel.app/api/integrations/meta/callback`) ek clearly visible, copyable text box mein display kare.
3. WHEN user Redirect_URI text box ke paas "Copy" button click kare, THE Setup_Guide SHALL URI clipboard mein copy kare aur ek "Copied!" confirmation 2 seconds ke liye dikhaye.
4. THE Setup_Guide SHALL yeh bhi instruct kare ki user "Save Changes" button Meta Developer Portal mein click kare Redirect URI add karne ke baad.
5. THE Setup_Guide SHALL ek screenshot ya annotated diagram dikhaye jo Meta Developer Portal mein Redirect URI field ki exact location highlight kare.
6. IF user Instagram ke liye configure kar raha hai, THEN THE Setup_Guide SHALL Instagram Basic Display product ke liye bhi alag Redirect URI section dikhaye.

---

### Requirement 4: Permissions aur Scopes Configure karne ki Guide

**User Story:** As a User, I want to know exactly which permissions to enable in Meta Developer Portal for each platform, so that AutoflowPilot can access the required features.

#### Acceptance Criteria

1. THE Setup_Guide SHALL Step 3 mein platform-specific permissions ki list dikhaye jo user ko Meta Developer Portal mein enable karni hain.
2. WHEN user Facebook (Messenger) configure kar raha hai, THE Setup_Guide SHALL yeh permissions list kare: `pages_messaging`, `pages_show_list`, `pages_manage_metadata`.
3. WHEN user Instagram configure kar raha hai, THE Setup_Guide SHALL yeh permissions list kare: `instagram_basic`, `instagram_manage_messages`, `pages_show_list`.
4. THE Setup_Guide SHALL har permission ke saath ek short description dikhaye jo explain kare ki woh permission kyun zaroori hai.
5. THE Setup_Guide SHALL user ko yeh path bataye: Meta Developer Portal → apni app → "App Review" → "Permissions and Features" → har required permission ke liye "Request" click karo.
6. THE Setup_Guide SHALL warn kare ki kuch permissions (jaise `pages_messaging`) ko Meta App Review se approve karwana padta hai production use ke liye.
7. THE Setup_Guide SHALL ek checklist provide kare jisme user har permission ke saamne tick kar sake jab woh enable ho jaaye.

---

### Requirement 5: App Settings mein AutoflowPilot Credentials Enter karne ki Guide

**User Story:** As a User, I want instructions to enter my Meta App credentials into AutoflowPilot, so that the backend can use them for OAuth token exchange.

#### Acceptance Criteria

1. THE Setup_Guide SHALL Step 4 mein user ko yeh instruct kare ki Meta Developer Portal se App ID aur App Secret copy karke AutoflowPilot ke Settings mein enter kare.
2. THE Setup_Guide SHALL ek direct link ya navigation instruction provide kare jo user ko AutoflowPilot ke Settings page par le jaaye jahan Meta credentials enter hote hain.
3. WHEN user App ID aur App Secret Setup_Guide ke input fields mein enter kare, THE Setup_Guide SHALL ek "Save to AutoflowPilot" button dikhaye.
4. WHEN user "Save to AutoflowPilot" click kare, THE Integration_API SHALL `POST /api/integrations/meta/credentials` endpoint par App ID aur encrypted App Secret save kare.
5. IF Integration_API credentials save karne mein fail ho, THEN THE Setup_Guide SHALL ek error message dikhaye: "Credentials save nahi ho sake. Please dobara try karein."
6. WHEN credentials successfully save ho jaayein, THE Setup_Guide SHALL ek success indicator dikhaye aur Step 4 ko "Completed" mark kare.
7. THE Setup_Guide SHALL App Secret field mein entered value ko mask kare (dots/asterisks) aur ek "Show/Hide" toggle provide kare.

---

### Requirement 6: Webhook Configuration Guide

**User Story:** As a User, I want step-by-step instructions to configure Meta Webhooks, so that AutoflowPilot receives real-time message notifications from Facebook and Instagram.

#### Acceptance Criteria

1. THE Setup_Guide SHALL Step 5 mein user ko yeh path bataye: Meta Developer Portal → apni app → "Webhooks" product add karo → "Configure" click karo.
2. THE Setup_Guide SHALL AutoflowPilot ka Webhook URL (`https://autoflow-api.vercel.app/api/integrations/meta/webhook`) ek copyable text box mein display kare.
3. THE Setup_Guide SHALL ek auto-generated Verify_Token display kare jo user Meta Developer Portal mein "Verify Token" field mein enter kare.
4. WHEN user "Generate New Token" click kare, THE Setup_Guide SHALL ek naya cryptographically random Verify_Token generate kare aur display kare.
5. THE Setup_Guide SHALL yeh Webhook subscription fields enable karne ki instruction de: `messages`, `messaging_postbacks`, `messaging_optins` Facebook ke liye; `messages`, `messaging_seen` Instagram ke liye.
6. WHEN user Webhook URL aur Verify_Token Meta mein enter karke "Verify and Save" click kare, THE Integration_API SHALL Meta ka verification request handle kare aur 200 response return kare.
7. THE Setup_Guide SHALL ek "Test Webhook" button provide kare jo Integration_API ko ping kare aur confirm kare ki webhook endpoint reachable hai.
8. IF webhook verification fail ho, THEN THE Setup_Guide SHALL troubleshooting steps dikhaye: check karo ki backend deployed hai, Verify_Token match karta hai, aur URL correct hai.

---

### Requirement 7: Setup Progress Track karna

**User Story:** As a User, I want to see my setup progress, so that I know which steps are done and which are remaining.

#### Acceptance Criteria

1. THE Setup_Guide SHALL ek progress indicator dikhaye (e.g., step counter "Step 2 of 5" ya progress bar) jo current position show kare.
2. WHEN user ek step complete kare, THE Setup_Guide SHALL woh step ko visually "completed" mark kare (e.g., green checkmark).
3. THE Setup_Guide SHALL user ko kisi bhi completed step par wapas jaane ki allow kare bina progress reset kiye.
4. THE Setup_Progress SHALL browser ke localStorage mein persist ho taaki user page refresh karne ke baad bhi progress na khoye.
5. WHEN user Setup_Guide band kare aur dobara khole, THE Setup_Guide SHALL wahi step dikhaye jahan user ne chhoda tha.
6. THE Setup_Guide SHALL ek "Reset Progress" option provide kare jo user ki saved progress clear kare aur Step 1 se shuru kare.
7. WHEN saare 5 steps complete ho jaayein, THE Setup_Guide SHALL ek "Setup Complete" screen dikhaye aur user ko Meta platform connect karne ka option de.

---

### Requirement 8: Platform-Specific Setup Flow

**User Story:** As a User, I want the setup guide to show only the relevant steps for the platform I am configuring, so that I am not confused by irrelevant instructions.

#### Acceptance Criteria

1. WHEN Setup_Guide Facebook (Messenger) ke liye launch ho, THE Setup_Guide SHALL Facebook-specific steps aur screenshots dikhaye.
2. WHEN Setup_Guide Instagram ke liye launch ho, THE Setup_Guide SHALL Instagram-specific steps aur screenshots dikhaye, including Instagram Basic Display product setup.
3. THE Setup_Guide SHALL clearly indicate kare ki kaunse steps Facebook aur Instagram dono ke liye common hain (e.g., App creation, App ID/Secret).
4. WHEN user dono Facebook aur Instagram configure karna chahta hai, THE Setup_Guide SHALL ek "Configure Both" option provide kare jo shared steps ek baar dikhaye.
5. THE Setup_Guide SHALL har platform ke liye alag "Setup Complete" confirmation dikhaye.

---

### Requirement 9: Inline Help aur Troubleshooting

**User Story:** As a User, I want contextual help and troubleshooting tips within the setup guide, so that I can resolve common issues without leaving the guide.

#### Acceptance Criteria

1. THE Setup_Guide SHALL har step ke saath ek "?" ya "Help" icon provide kare jo us step ke liye common issues aur solutions expand karke dikhaye.
2. THE Setup_Guide SHALL yeh common error scenarios cover kare: "App ID nahi mil raha", "Redirect URI mismatch", "Permission denied by Meta", "Webhook verification failed".
3. WHEN user "Redirect URI mismatch" error encounter kare, THE Setup_Guide SHALL exact URI dobara dikhaye aur confirm karne ke steps bataye.
4. THE Setup_Guide SHALL ek "Contact Support" link provide kare jo user ko AutoflowPilot support page par le jaaye agar guide se issue resolve na ho.
5. THE Setup_Guide SHALL Meta Developer Portal ke relevant documentation pages ke links provide kare har step ke liye.

---

### Requirement 10: Accessibility aur Usability

**User Story:** As a User, I want the setup guide to be easy to use on any device, so that I can follow the instructions whether I am on desktop or mobile.

#### Acceptance Criteria

1. THE Setup_Guide SHALL responsive design implement kare jo desktop (min-width 1024px) aur mobile (max-width 768px) dono par properly render ho.
2. THE Setup_Guide SHALL keyboard navigation support kare — Tab key se fields mein move karna, Enter se next step jaana, Escape se guide band karna.
3. THE Setup_Guide SHALL saare interactive elements par ARIA labels provide kare.
4. THE Setup_Guide SHALL copy buttons, input fields, aur navigation buttons ke liye sufficient color contrast maintain kare (minimum 4.5:1 ratio).
5. THE Setup_Guide SHALL loading states dikhaye jab API calls ho rahi hon (e.g., credentials save karna, webhook test karna).
