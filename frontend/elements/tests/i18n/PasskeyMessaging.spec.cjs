const { de } = require("../../src/i18n/de");
const { en } = require("../../src/i18n/en");
const { fr } = require("../../src/i18n/fr");
const { ptBR } = require("../../src/i18n/pt-BR");

const EXPECTED_PASSKEY_MESSAGING = [
  [
    en,
    "Create a passkey on this device",
    "Speed up your sign in next time by creating a new passkey on this device. You’ll be able to use just your fingerprint, face, or screen lock to verify it’s you. Don’t create a new passkey if this is a shared device.",
  ],
  [
    de,
    "Passkey auf diesem Gerät erstellen",
    "Wenn Sie einen neuen Passkey auf diesem Gerät erstellen, können Sie sich schneller anmelden und Ihre Identität einfach mit Ihrem Fingerabdruck oder Gesicht oder über die Displaysperre bestätigen. Bitte erstellen Sie keinen neuen Passkey, falls es sich um ein gemeinsam verwendetes Gerät handelt.",
  ],
  [
    fr,
    "Créer une clé d'accès sur cet appareil",
    "Connectez-vous plus vite la prochaine fois en créant une clé d'accès sur cet appareil. Vous pourrez utiliser votre empreinte digitale, votre visage ou le verrouillage de l'écran pour confirmer votre identité. Ne créez pas de clé d'accès s'il s'agit d'un appareil partagé.",
  ],
  [
    ptBR,
    "Crie uma chave de acesso neste dispositivo",
    "Agilize seu próximo login criando uma nova chave de acesso neste dispositivo. Será possível usar apenas sua impressão digital, seu rosto ou o bloqueio de tela para confirmar sua identidade. Não crie uma chave de acesso se este for um dispositivo compartilhado.",
  ],
];

describe.each(EXPECTED_PASSKEY_MESSAGING)(
  "passkey creation messaging",
  (translation, expectedHeadline, expectedText) => {
    test("identifies the device and warns against shared devices", () => {
      expect(translation.headlines.registerAuthenticator).toBe(expectedHeadline);
      expect(translation.texts.setupPasskey).toBe(expectedText);
    });
  },
);
