// Ami des mots — dans l'appli Android (Capacitor), la vue web n'a pas de synthèse vocale : on la fournit avec le
// moteur de voix du téléphone (extension @capacitor-community/text-to-speech). Sur le web, ce fichier ne fait rien.
(function(){
  'use strict';
  const C = window.Capacitor;
  let TTS = null;
  try{ TTS = C && ((C.Plugins && C.Plugins.TextToSpeech) || (C.isPluginAvailable && C.isPluginAvailable('TextToSpeech') && C.registerPlugin && C.registerPlugin('TextToSpeech'))); }catch(e){}
  if(!TTS || ('speechSynthesis' in window && window.speechSynthesis && window.speechSynthesis.getVoices)) return;
  const LANGUES = ['fr-FR', 'en-GB', 'en-US', 'es-ES', 'it-IT', 'pt-PT', 'de-DE', 'zh-CN', 'ko-KR', 'ru-RU', 'nl-NL', 'ro-RO'];
  const voix = LANGUES.map(l => ({ lang:l, name:'Android ' + l, localService:true, default:l === 'fr-FR', voiceURI:'android-' + l }));
  let enCours = false;
  window.SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || function(texte){ this.text = texte || ''; this.lang = ''; this.rate = 1; this.pitch = 1; this.volume = 1; this.voice = null; this.onend = null; this.onerror = null; this.onstart = null; };
  window.speechSynthesis = {
    getVoices:() => voix.slice(), addEventListener(){}, removeEventListener(){}, pause(){}, resume(){},
    get speaking(){ return enCours; }, get pending(){ return false; },
    speak(u){ enCours = true; try{ u.onstart && u.onstart(); }catch(e){}
      TTS.speak({ text:String(u.text || ''), lang:u.lang || (u.voice && u.voice.lang) || 'fr-FR', rate:Math.min(2, Math.max(.1, +u.rate || 1)), pitch:+u.pitch || 1, volume:u.volume == null ? 1 : +u.volume })
        .then(() => { enCours = false; try{ u.onend && u.onend({}); }catch(e){} }, err => { enCours = false; try{ u.onerror && u.onerror({ error:String(err) }); }catch(e){} }); },
    cancel(){ enCours = false; TTS.stop().catch(() => {}); }
  };
})();
