// Ami des mots — réglages du projet Android généré par Capacitor (lancé par la fabrique GitHub, après « cap add android »).
//  · micro (Répète après Ami) et moteur de voix du téléphone ;
//  · numéro de version tiré de package.json (5.44.0 → 54400) ;
//  · signature de la version Play Store si les secrets AMI_KEYSTORE… sont fournis (jamais dans le dépôt).
'use strict';
const fs = require('fs'), path = require('path'), ICI = path.join(__dirname, '..'), A = path.join(process.argv[2] || path.join(ICI, 'android'));
const manifeste = path.join(A, 'app/src/main/AndroidManifest.xml'), gradle = path.join(A, 'app/build.gradle');
let m = fs.readFileSync(manifeste, 'utf8');
if(!m.includes('RECORD_AUDIO')) m = m.replace('<uses-permission android:name="android.permission.INTERNET" />', '<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.RECORD_AUDIO" />\n    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />');
if(!m.includes('TTS_SERVICE')) m = m.replace('</manifest>', '    <queries>\n        <intent>\n            <action android:name="android.intent.action.TTS_SERVICE" />\n        </intent>\n    </queries>\n</manifest>');
fs.writeFileSync(manifeste, m);
const v = require(path.join(ICI, 'package.json')).version, [a, b, c] = v.split('.').map(Number), code = a * 10000 + b * 100 + c;
let g = fs.readFileSync(gradle, 'utf8');
g = g.replace(/versionCode \d+/, 'versionCode ' + code).replace(/versionName "[^"]*"/, 'versionName "' + v + '"');
if(!g.includes('AMI_KEYSTORE')) g += `
// Signature Play Store (secrets GitHub, jamais dans le dépôt).
android {
    signingConfigs {
        release {
            if (System.getenv("AMI_KEYSTORE")) {
                storeFile file(System.getenv("AMI_KEYSTORE"))
                storePassword System.getenv("AMI_KEYSTORE_MDP")
                keyAlias System.getenv("AMI_CLE_ALIAS")
                keyPassword System.getenv("AMI_CLE_MDP")
            }
        }
    }
    buildTypes {
        release {
            if (System.getenv("AMI_KEYSTORE")) signingConfig signingConfigs.release
        }
    }
}
`;
fs.writeFileSync(gradle, g);
console.log('✔ Android : micro, voix, version ' + v + ' (' + code + ')' + (process.env.AMI_KEYSTORE ? ', signature' : ''));
