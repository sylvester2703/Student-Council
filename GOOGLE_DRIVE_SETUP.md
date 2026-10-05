# SWACHH BHARAT WEEK 2026 — Google Drive Automation Setup Guide
**PES Modern College of Engineering, Pune • Student Council**

This guide explains how the Student Council technical team connects their Google Drive submission folder to this portal so all student submissions automatically create structured squad folders and upload files cleanly without any manual sorting.

---

## 1. Updated Official Google Drive Submission Folder

> **Active Google Drive Submission Link:**
> [https://drive.google.com/drive/folders/1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb?usp=sharing](https://drive.google.com/drive/folders/1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb?usp=sharing)
> **Root Folder ID:** `1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb`

---

## 2. Overview of Folder Structure in Organizer's Google Drive

The 3 active student competitions are organized into dedicated sub-folders:

```
SWACHH BHARAT WEEK 2026 (Root Folder)
│
├── 01_POSTER_MAKING
│   ├── SBW-2026-001_ECOVISIONARIES
│   │   ├── Submission_Details.txt
│   │   └── SBW-2026-001_Poster.pdf
│   └── ...
│
├── 02_REEL_MAKING
│   ├── SBW-2026-002_LENSOFCHANGE
│   │   ├── Submission_Details.txt
│   │   └── SBW-2026-002_Reel.mp4
│   └── ...
│
└── 03_WASTE_HUNT
    ├── SBW-2026-003_ECODETECTIVES
    │   ├── Finding_01
    │   │   ├── Finding_01_Photo.jpg
    │   │   └── Finding_01_Report.txt
    │   ├── Finding_02
    │   │   ├── Finding_02_Photo.jpg
    │   │   └── Finding_02_Report.txt
    │   ├── Finding_03
    │   │   ├── Finding_03_Photo.jpg
    │   │   └── Finding_03_Report.txt
    │   ├── Finding_04
    │   │   ├── Finding_04_Photo.jpg
    │   │   └── Finding_04_Report.txt
    │   ├── Finding_05
    │   │   ├── Finding_05_Photo.jpg
    │   │   └── Finding_05_Report.txt
    │   └── Final_Submission_Summary.txt
    └── ...
```

---

## 3. Fast 2-Minute Google Apps Script Setup (No Cloud Billing Required)

1. Open [Google Drive](https://drive.google.com) with the official Student Council Google account.
2. Open your submission folder (`1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb`).
3. Go to [script.google.com](https://script.google.com) and click **"New project"**. Name it `Swachh-Bharat-Portal-Drive-Sync`.
4. Replace the code in `Code.gs` with the snippet below:

```javascript
/**
 * SWACHH BHARAT WEEK 2026 — Official Google Apps Script Webhook
 * PES Modern College of Engineering Student Council
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var rootFolderId = data.rootFolderId || "1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb";
    var rootFolder = DriveApp.getFolderById(rootFolderId);

    // Event Category Sub-folder (3 Active Competitions)
    var categoryFolder = getOrCreateSubFolder(rootFolder, getEventCategoryFolder(data.eventId));

    // Participant / Squad Folder
    var sanitizedTeam = (data.teamName || "TEAM").replace(/[^a-zA-Z0-9_-]/g, "_").toUpperCase();
    var teamFolderName = data.registrationId + "_" + sanitizedTeam;
    var teamFolder = getOrCreateSubFolder(categoryFolder, teamFolderName);

    // If Waste Hunt: create sub-folders for each finding
    if (data.eventId === "waste-hunt" && data.wasteHuntFindings && data.wasteHuntFindings.length > 0) {
      data.wasteHuntFindings.forEach(function(finding, idx) {
        var findingNum = ("0" + (idx + 1)).slice(-2);
        var findingFolder = getOrCreateSubFolder(teamFolder, "Finding_" + findingNum);
        
        var findingSummary = "=== FINDING " + findingNum + ": " + finding.title + " ===\n" +
          "Zone: " + finding.zone + "\n" +
          "Location: " + finding.specificLocation + "\n\n" +
          "PROBLEM DESCRIPTION:\n" + finding.problemDescription + "\n\n" +
          "IDENTIFIED CAUSE:\n" + finding.identifiedCause + "\n\n" +
          "PROPOSED SOLUTION:\n" + finding.proposedSolution + "\n\n" +
          "Recorded At: " + new Date().toISOString();
        
        findingFolder.createFile("Finding_" + findingNum + "_Report.txt", findingSummary, MimeType.PLAIN_TEXT);

        if (finding.photoBase64OrUrl && finding.photoBase64OrUrl.startsWith("data:")) {
          var parts = finding.photoBase64OrUrl.split(",");
          var mime = parts[0].match(/:(.*?);/)[1];
          var decoded = Utilities.base64Decode(parts[1]);
          var blob = Utilities.newBlob(decoded, mime, "Finding_" + findingNum + "_Photo." + (mime.split("/")[1] || "jpg"));
          findingFolder.createFile(blob);
        }
      });
    }

    // General submission metadata log
    var summaryText = "=== SWACHH BHARAT WEEK 2026 SUBMISSION ===\n" +
      "Registration ID: " + data.registrationId + "\n" +
      "Submission ID: " + data.submissionId + "\n" +
      "Event: " + data.eventTitle + " (" + data.eventId + ")\n" +
      "Team: " + data.teamName + "\n" +
      "Leader: " + data.leaderName + "\n" +
      "Email: " + data.leaderEmail + "\n" +
      "Branch & Year: " + data.branch + " - " + data.year + " (" + data.division + ")\n" +
      "Title: " + data.submissionTitle + "\n" +
      "Concept Note: " + (data.conceptNote || "N/A") + "\n" +
      "Submission Time: " + data.timestamp + "\n" +
      "Revision: #" + data.revision + "\n";

    teamFolder.createFile("Submission_Summary.txt", summaryText, MimeType.PLAIN_TEXT);

    // Save main file if present (Poster / Reel)
    if (data.fileDataOrUrl && data.fileDataOrUrl.startsWith("data:")) {
      var parts = data.fileDataOrUrl.split(",");
      var mime = parts[0].match(/:(.*?);/)[1];
      var decoded = Utilities.base64Decode(parts[1]);
      var blob = Utilities.newBlob(decoded, mime, data.fileName || ("submission_file." + (mime.split("/")[1] || "bin")));
      teamFolder.createFile(blob);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      folderUrl: teamFolder.getUrl(),
      folderId: teamFolder.getId()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSubFolder(parentFolder, folderName) {
  var folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(folderName);
}

function getEventCategoryFolder(eventId) {
  var map = {
    "poster-making": "01_POSTER_MAKING",
    "reel-making": "02_REEL_MAKING",
    "waste-hunt": "03_WASTE_HUNT"
  };
  return map[eventId] || "00_GENERAL";
}
```

5. Click **Deploy** -> **New deployment** -> Select type **Web app**.
   - Execute as: **Me** (`your-account@gmail.com`)
   - Who has access: **Anyone**
6. Click **Deploy**, authorize permissions, and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).
7. Add this URL to your `.env.local` file or deployment environment variables:

```env
GOOGLE_APPS_SCRIPT_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
GOOGLE_DRIVE_ROOT_FOLDER_ID="1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb"
ADMIN_USERNAME="admin123"
ADMIN_PASSWORD="Admin@123"
```

---

## 4. Admin Credentials & Results Administration

The Council Jury & Results administration panel is protected with credentials:
- **Admin Login ID**: `admin123`
- **Admin Password**: `Admin@123`

The Admin Desk enables:
1. Publishing / Unpublishing live winners podium.
2. Editing 1st, 2nd, and 3rd place teams, leads, scores, and departments.
3. Adding and modifying special jury category awards.
