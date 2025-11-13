# Firmware Dependencies

1. **MFRC522v2** — if not in Arduino Library Manager, copy driver files to firmware/libraries/mfrc522-v2
2. **ArduinoJson** — install via Arduino Library Manager
3. **WiFi** — built into ESP32 core
4. **WebServer** — built into ESP32 core
5. **ESP32Servo** — optional, install via Library Manager if servo enabled

Notes:
- Copy custom driver files into firmware/libraries/mfrc522-v2
- ESP32 board support must be installed in Arduino IDE or PlatformIO
