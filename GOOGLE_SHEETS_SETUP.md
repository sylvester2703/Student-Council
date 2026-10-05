# SWACHH BHARAT WEEK 2026 — Google Sheets Live Sync & Admin Guide
**PES Modern College of Engineering, Pune • Student Council**

This guide explains how student registrations automatically sync to your official Google Sheet and how Council Admins can manage, inspect, or delete entries directly from the portal.

---

## 1. Master Google Spreadsheet Link

> **Official Live Google Sheet:**
> [https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing](https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing)
> **Sheet ID:** `12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM`

---

## 2. Spreadsheet Header Columns

Set up Row 1 of your Google Sheet with the following standardized columns:

| Col | Header | Description |
|---|---|---|
| **A** | `Registration ID` | E.g. `SBW-2026-001` |
| **B** | `Competition Title` | `Poster Making`, `Reel Making`, `Waste Hunt` |
| **C** | `Team Name` | Name of the registered squad |
| **D** | `Leader Name` | Team leader's full name |
| **E** | `Leader Email` | Official student email |
| **F** | `Leader Phone` | Contact WhatsApp / phone number |
| **G** | `Department & Class` | E.g. `Computer Engineering • Third Year (TE)` |
| **H** | `Division` | E.g. `Div A` |
| **I** | `Total Members` | Number of students in squad (1–4) |
| **J** | `Squad Members List` | Names of all members |
| **K** | `Registration Timestamp` | Date & Time of submission (IST) |
| **L** | `Status` | `CONFIRMED` or `SUBMITTED` |

---

## 3. Real-Time Webhook (Optional 1-Click Apps Script)

To automatically append new rows into your Google Sheet the moment a student registers on the portal:

1. Open your Google Sheet (`12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM`).
2. Click **Extensions** → **Apps Script**.
3. Paste the following script:

```javascript
/**
 * SWACHH BHARAT WEEK 2026 — Live Google Sheet Sync Webhook
 * PES Modern College of Engineering Student Council
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append row
    sheet.appendRow([
      data.registrationId || "",
      data.eventTitle || "",
      data.teamName || "",
      data.leaderName || "",
      data.leaderEmail || "",
      data.leaderPhone || "",
      (data.branch || "") + " (" + (data.year || "") + ")",
      data.division || "",
      data.totalMembers || 1,
      data.membersList || data.leaderName || "",
      data.registeredAt ? new Date(data.registeredAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : new Date().toLocaleString(),
      data.status || "CONFIRMED"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New deployment** → Select **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the **Web App URL** and add it to `.env.local` as `GOOGLE_SHEET_WEBHOOK_URL`.

---

## 4. Admin Entry Deletion & Slot Management

Council Admins can access the **Organizer Portal** using the Admin Passkey (`MCOE@2026`):

1. Click **"Organizer Admin"** in the top navigation bar or footer.
2. Enter the Admin Passkey (`MCOE@2026`).
3. Under the **Participant Master Roster** tab, you will see all registered squads.
4. Click **"Delete"** next to any entry.
5. **Immediate Effects**:
   - The entry is removed from the roster.
   - The competition slot counter automatically decreases (e.g. from 30/30 to 29/30), reopening 1 slot for new students.
   - Any associated submissions for that squad are cleaned up.

---

## 5. 1-Click CSV Export

From the Admin Dashboard, click **"Download Sheet CSV"** to export all active registrations formatted for immediate import into Google Sheets.
