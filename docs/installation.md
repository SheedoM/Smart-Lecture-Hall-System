# Install Arduino libraries (Arduino IDE)

1. Open Arduino IDE -> Sketch -> Include Library -> Manage Libraries...
2. Search for and install:
   - "MFRC522" by Miguel Balboa
   - "ArduinoJson" by Benoit Blanchon
   - "ESP32Servo" (only if using servo)
3. If any driver (MFRC522v2) is not available via Library Manager, copy its folder into `firmware/libraries/` inside this repo and restart Arduino IDE.
