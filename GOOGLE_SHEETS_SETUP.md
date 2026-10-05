# SWACHH BHARAT WEEK 2026 — Google Sheets Live Sync & Roster Guide
**PES Modern College of Engineering, Pune • Student Council**

**Your Connected Google Sheet Link:**
`https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing`

---

## 1. How the Unique ID Works & How to Identify "Who is Who"

Whenever a student registers on the website for any of the 5 events (Poster Making, Reel Making, Waste Hunt, Live Art, Rangoli):

1. **Unique Identification Code Generation**:
   - The portal assigns a permanent, sequential ID: e.g., **`SBW-2026-001`**, **`SBW-2026-002`**, etc.
2. **Instant Email Acknowledgment & Printable Receipt**:
   - An official acknowledgment email is automatically dispatched to the entered email address.
   - The participant can immediately print their official **Digital Registration Slip / Receipt** or download it as PDF.
3. **Instant Lookup in Council Desk (Admin Dashboard)**:
   - Open the **Council Desk** from the website navbar/footer using Admin Passkey: `MCOE@2026`.
   - Click the **"Participant Master Roster"** tab.
   - Type the ID (e.g., `SBW-2026-001`), Student Name, Phone Number, or Branch in the search bar.
   - Click **"View Squad"** to immediately view:
     - **Team Leader**: Full Name, Official College Email, Mobile Number, Branch (e.g. Computer Engineering), Academic Year (FE/SE/TE/BE), Division.
     - **All Team Members**: Full Names, emails, and roles of all co-members.
     - **Submission Status & Files**: Exact time of registration and submission links.
4. **Google Drive Matching**:
   - Submissions on Google Drive are named with the ID: `SBW-2026-001_TEAMNAME`, ensuring zero confusion for judges and council volunteers.

---

## 2. Method A: One-Click Export to Google Sheets (Zero Setup)

You can get the complete participant list in Google Sheets in 10 seconds without configuring any APIs:

1. Click **"Council Desk"** in the top navigation bar or footer of the website.
2. Enter the PIN: **`MCOE@2026`**.
3. Under the **Participant Master Roster** tab, click:
   **`Open Live Google Sheet`** or **`Download Roster CSV`**.
4. Open [Your Google Sheet](https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing) > **File** > **Import** > **Upload** the downloaded CSV.
5. All columns (*Reg ID, Event, Team Name, Leader Name, Email, Phone, Branch, Year, Division, Member List, Registered Date, Status*) are neatly formatted!

---

## 3. Method B: Automatic Real-Time Webhook Sync into Your Google Sheet

To stream every student registration live into your Google Sheet:

### Step 1: Open Your Sheet
Open: [https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing](https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing)

Row 1 Headers:
- **Column A**: Registration ID
- **Column B**: Event Name
- **Column C**: Team Name
- **Column D**: Leader Name
- **Column E**: Leader Email
- **Column G**: Leader Phone
- **Column H**: Department / Branch
- **Column I**: Year & Division
- **Column J**: Total Members
- **Column K**: Team Members List
- **Column L**: Registered At
- **Column M**: Status

---

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Replace all existing text in the editor with this script:

```javascript
/**
 * SWACHH BHARAT WEEK 2026 — Google Sheets Live Registration Webhook
 * PES Modern College of Engineering Student Council
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Registration ID",
        "Event Name",
        "Team Name",
        "Leader Name",
        "Leader Email",
        "Leader Phone",
        "Department / Branch",
        "Year & Division",
        "Total Members",
        "Team Members List",
        "Registered At",
        "Status"
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#e6f4ea");
    }

    // Append new registration row
    sheet.appendRow([
      data.registrationId || "",
      data.eventTitle || "",
      data.teamName || "",
      data.leaderName || "",
      data.leaderEmail || "",
      data.leaderPhone || "",
      data.branch || "",
      (data.year || "") + " (" + (data.division || "") + ")",
      data.totalMembers || 1,
      data.membersList || "",
      data.registeredAt || new Date().toISOString(),
      data.status || "CONFIRMED"
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row appended successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### Step 3: Deploy as Web App
1. Click **Deploy** (top right) > **New deployment**.
2. Select type: **Web app**.
3. Set:
   - **Description**: `Swachh Bharat Registration Sync`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone`
4. Click **Deploy**, click **Authorize access**, select your Google account, and click **Allow**.
5. Copy the generated **Web app URL** (`https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`).

---

### Step 4: Add Webhook URL to Portal Environment
In your `.env.local` file (or hosting provider environment variables), add:

```env
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```
