Smart Lecture Hall Entry Management System
One-line

RFID + ESP32 system that lets lecturers toggle entry (open/lock), manage seats, and export attendance.

Why

Stop interruptions, keep class flow, and record who entered the hall automatically.

Key features

Toggle entry status (Green = allowed, Red = denied) from web dashboard.

RFID scan when green → unlock magnetic lock, log attendance, flash LED.

When red → deny entry, sound buzzer.

Real-time seat counter with manual +1 / -1 / Reset.

Attendance export to CSV.

Lightweight mobile interface for on-the-go toggles.

Components

ESP32 microcontroller

RFID reader (RC522 or compatible)

Magnetic lock (ensure sufficient power supply; recommend 12V with appropriate current rating)

Dual-color LED (red/green)

Buzzer

Power supply (separate for lock)

Optional: LCD for local info

Hardware notes / issues found

Magnetic lock needs a higher-amp power supply. Replace current supply with one rated for the lock’s inrush and hold current (e.g., 12V, check lock specs).

Servo not reliable — verify wiring and power; replace with a relay if needed.

Current firmware stores tag UID only. Integrate a student database for meaningful attendance records.

Quick start — firmware (ESP32)

Place Small_Hall_Entry_Project.ino in /firmware/.

Open in Arduino IDE (or PlatformIO).

Replace hardcoded Wi-Fi credentials with WiFiManager or a simple web-based provisioning flow (recommended).

Connect hardware:

RC522: SPI pins to ESP32 (SDA, SCK, MOSI, MISO), RST to a digital pin.

Magnetic lock: controlled by a MOSFET/relay driven by an ESP32 pin; do not power lock directly from ESP32.

LED pins: use current-limiting resistors.

Buzzer: transistor-driven from ESP32 pin.

Upload to ESP32.

Observe serial logs to confirm network connect and RFID scan events.

Dashboard — minimal deployment

Frontend: static single-page app that connects to the ESP32 via REST/WebSocket (ESP32 runs local HTTP/WebSocket server) or via central backend.

Backend responsibilities:

Relay commands to ESP32 (toggle LED/state) or accept WebSocket from ESP32.

Store attendance in CSV or a lightweight DB (SQLite).

Serve CSV download endpoint /attendance/export.

Suggested stack: Node.js + Express + simple WebSocket (ws) or socket.io.

Minimal steps:

cd dashboard/backend

npm install

node server.js or use pm2/systemd for production.

Frontend can be static and served from the backend or deployed to GitHub Pages.

Attendance export (CSV)

Save each record as: timestamp, tag_uid, student_id(optional), lecturer_note(optional).

Provide /attendance/export endpoint that streams CSV and triggers download from the dashboard.
