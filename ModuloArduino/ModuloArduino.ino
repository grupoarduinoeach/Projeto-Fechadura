#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>

PN532_I2C pn532i2c(Wire);
PN532 nfc(pn532i2c);

int FNblockToRead=0;





void configuraCartao(){
    nfc.begin();
    uint32_t versiondata = nfc.getFirmwareVersion();  
    if (! versiondata) {
        Serial.print("Didn't find PN53x board");  
        while (1); // halt
    }
    Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
    Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
    Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
    nfc.SAMConfig();
}


String leCartao(){
    uint8_t success;
    uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  
    uint8_t uidLength;                        
    success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
    if (success) {            
        if (uidLength == 4){         
            uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };      
            success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, FNblockToRead, 0, keya);        
            if (success){
                uint8_t data[16]={'n','a','o',' ','s','o','b','r','e','s','c','r','e','v','e','u'};  // conteudo do bloco.    
                success = nfc.mifareclassic_ReadDataBlock(1, data);  // da sucesso nos blocos 0..3        
                if (success){          
                    char a[9] = "000000";
                    for (int i=0;i<7;i++) {
                        a[i] = data[i+3];                        
                    }
                    return a;                    
                }else{
                Serial.println("Ooops ... unable to read the requested block.  Try another key?");
                }
            }else{
                Serial.println("Ooops ... authentication failed: Try another key?");
            }
        }    
    }
    return "Error na leitura";  
}


void setup(void) {

  Serial.begin(115200); 
  configuraCartao(); 
  
}


void loop(void) {
    Serial.println(leCartao());
    delay(1000);
}

