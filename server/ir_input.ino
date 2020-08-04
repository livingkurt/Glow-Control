//void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
//
//  switch (type) {
//    case WStype_DISCONNECTED:
//      Serial.printf("[%u] Disconnected!\n", num);
//      break;
//
//    case WStype_CONNECTED:
//      {
//        IPAddress ip = webSocketsServer.remoteIP(num);
//        Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
//
//        // send message to client
//        // webSocketsServer.sendTXT(num, "Connected");
//      }
//      break;
//
//    case WStype_TEXT:
//      Serial.printf("[%u] get Text: %s\n", num, payload);
//
//      // send message to client
//      // webSocketsServer.sendTXT(num, "message here");
//
//      // send data to all connected clients
//      // webSocketsServer.broadcastTXT("message here");
//      break;
//
//    case WStype_BIN:
//      Serial.printf("[%u] get binary length: %u\n", num, length);
//      hexdump(payload, length);
//
//      // send message to client
//      // webSocketsServer.sendBIN(num, payload, lenght);
//      break;
//  }
//}

//void handleIrInput()
//{
//  InputCommand command = readCommand();
//
//  if (command != InputCommand::None) {
//    Serial.print("command: ");
//    Serial.println((int) command);
//  }
//
//  switch (command) {
//    case InputCommand::Up: {
//        adjustPattern(true);
//        break;
//      }
//    case InputCommand::Down: {
//        adjustPattern(false);
//        break;
//      }
//    case InputCommand::Power: {
//        setPower(power == 0 ? 1 : 0);
//        break;
//      }
//    case InputCommand::BrightnessUp: {
//        adjustBrightness(true);
//        break;
//      }
//    case InputCommand::BrightnessDown: {
//        adjustBrightness(false);
//        break;
//      }
//    case InputCommand::PlayMode: { // toggle pause/play
//        setAutoplayPattern(!autoplayPattern);
//        break;
//      }
//
//    // pattern buttons
//
//    case InputCommand::Pattern1: {
//        setPattern(0);
//        break;
//      }
//    case InputCommand::Pattern2: {
//        setPattern(1);
//        break;
//      }
//    case InputCommand::Pattern3: {
//        setPattern(2);
//        break;
//      }
//    case InputCommand::Pattern4: {
//        setPattern(3);
//        break;
//      }
//    case InputCommand::Pattern5: {
//        setPattern(4);
//        break;
//      }
//    case InputCommand::Pattern6: {
//        setPattern(5);
//        break;
//      }
//    case InputCommand::Pattern7: {
//        setPattern(6);
//        break;
//      }
//    case InputCommand::Pattern8: {
//        setPattern(7);
//        break;
//      }
//    case InputCommand::Pattern9: {
//        setPattern(8);
//        break;
//      }
//    case InputCommand::Pattern10: {
//        setPattern(9);
//        break;
//      }
//    case InputCommand::Pattern11: {
//        setPattern(10);
//        break;
//      }
//    case InputCommand::Pattern12: {
//        setPattern(11);
//        break;
//      }
//
//    // custom color adjustment buttons
//
//    case InputCommand::RedUp: {
//        rgb.red += 8;
//        setRGB(rgb);
//        break;
//      }
//    case InputCommand::RedDown: {
//        rgb.red -= 8;
//        setRGB(rgb);
//        break;
//      }
//    case InputCommand::GreenUp: {
//        rgb.green += 8;
//        setRGB(rgb);
//        break;
//      }
//    case InputCommand::GreenDown: {
//        rgb.green -= 8;
//        setRGB(rgb);
//        break;
//      }
//    case InputCommand::BlueUp: {
//        rgb.blue += 8;
//        setRGB(rgb);
//        break;
//      }
//    case InputCommand::BlueDown: {
//        rgb.blue -= 8;
//        setRGB(rgb);
//        break;
//      }
//
//    // color buttons
//
//    case InputCommand::Red: {
//        setRGB(CRGB::Red);
//        break;
//      }
//    case InputCommand::RedOrange: {
//        setRGB(CRGB::OrangeRed);
//        break;
//      }
//    case InputCommand::Orange: {
//        setRGB(CRGB::Orange);
//        break;
//      }
//    case InputCommand::YellowOrange: {
//        setRGB(CRGB::Goldenrod);
//        break;
//      }
//    case InputCommand::Yellow: {
//        setRGB(CRGB::Yellow);
//        break;
//      }
//
//    case InputCommand::Green: {
//        setRGB(CRGB::Green);
//        break;
//      }
//    case InputCommand::Lime: {
//        setRGB(CRGB::Lime);
//        break;
//      }
//    case InputCommand::Aqua: {
//        setRGB(CRGB::Aqua);
//        break;
//      }
//    case InputCommand::Teal: {
//        setRGB(CRGB::Teal);
//        break;
//      }
//    case InputCommand::Navy: {
//        setRGB(CRGB::Navy);
//        break;
//      }
//
//    case InputCommand::Blue: {
//        setRGB(CRGB::Blue);
//        break;
//      }
//    case InputCommand::RoyalBlue: {
//        setRGB(CRGB::RoyalBlue);
//        break;
//      }
//    case InputCommand::Purple: {
//        setRGB(CRGB::Purple);
//        break;
//      }
//    case InputCommand::Indigo: {
//        setRGB(CRGB::Indigo);
//        break;
//      }
//    case InputCommand::Magenta: {
//        setRGB(CRGB::Magenta);
//        break;
//      }
//
//    case InputCommand::White: {
//        setRGB(CRGB::White);
//        break;
//      }
//    case InputCommand::Pink: {
//        setRGB(CRGB::Pink);
//        break;
//      }
//    case InputCommand::LightPink: {
//        setRGB(CRGB::LightPink);
//        break;
//      }
//    case InputCommand::BabyBlue: {
//        setRGB(CRGB::CornflowerBlue);
//        break;
//      }
//    case InputCommand::LightBlue: {
//        setRGB(CRGB::LightBlue);
//        break;
//      }
//  }
//}