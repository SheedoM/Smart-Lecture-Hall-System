# Project Dependencies (summary)

## Firmware (ESP32)
- Arduino core for ESP32 (board package)
- MFRC522 (Miguel Balboa) — RFID
- ArduinoJson (Benoit Blanchon) — JSON handling
- Optional: ESP32Servo (if using servo)
- Custom MFRC522v2 driver files — include under firmware/libraries/ if not available publicly

## Dashboard (Node)
- node >= 14
- express
- cors
- body-parser
- csv-writer (optional for structured CSV exports)

## Dev tools
- PlatformIO (optional)
- GitHub CLI (optional) for repo creation
