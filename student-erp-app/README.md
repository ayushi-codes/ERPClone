# Student ERP App (Prototype)

A pixel-matched mobile UI prototype of the Student ERP Dashboard and Attendance screens, built with plain HTML/CSS/JS so it runs instantly in any browser — no build step required.

## What's inside

- **Dashboard** (scrollable) — profile card, Fee Balance / Academic Calendar pills, Time Table card, CGPA / Percentage / Attendance progress rings, Result Terms bar chart, Placement Drives card.
- **Attendance** (opens when you tap the Attendance ring) — aggregate attendance bar plus a scrollable list of course cards with mini progress rings, matching the uploaded reference screenshots.

The Call Us / Any Query row has been removed, the hamburger icon is gone from the top bar, and the Result Terms bar chart now uses evenly spaced, properly aligned gridlines.

## How to run in VS Code

1. Open this folder in VS Code (`File > Open Folder...`).
2. Install the recommended **Live Server** extension (VS Code will prompt you, or install `ritwickdey.LiveServer` manually from the Extensions tab).
3. Right-click `src/index.html` and choose **"Open with Live Server"**.
   - Or just double-click `src/index.html` to open it directly in your browser — it works with zero server too, since everything is self-contained in one file.

### Alternative: run via npm

If you'd rather use the included npm script:

```bash
npm install
npm start
```

This spins up a local dev server on `http://127.0.0.1:5500` and opens the app automatically.

## Project structure

```
student-erp-app/
├── src/
│   └── index.html      # entire app: markup, styles, and logic in one file
├── .vscode/
│   ├── settings.json   # Live Server config
│   └── extensions.json # recommends the Live Server extension
├── package.json
└── README.md
```

## Next steps (if you want to go further)

- Wire up the "Exam Schedule" tab and Time Table content.
- Turn this into an installable mobile app via **Capacitor** (wraps this HTML/CSS/JS with near-zero rewrite) or rebuild the components in **React Native** / **Flutter** for full native behavior.
- Replace the placeholder avatar URL and static course data with real API calls.
