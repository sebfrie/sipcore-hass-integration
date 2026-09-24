// Minimal localization helper for the SIP Core frontend cards.
//
// Lovelace custom cards are not wired up to Home Assistant's backend
// `translations/*.json` files (those only cover config/options flow strings),
// so the UI text rendered by these cards ships its own dictionary here and
// picks a language based on the `hass` object provided by the frontend.

export type SupportedLanguage = "en" | "de";

const DEFAULT_LANGUAGE: SupportedLanguage = "en";

const translations: Record<SupportedLanguage, Record<string, string>> = {
    en: {
        no_active_call: "No active call",
        incoming_call_from: "Incoming call from {name}",
        outgoing_call_to: "Outgoing call to {name}",
        connected_to: "Connected to {name}",
        connecting_to: "Connecting to {name}",
        unknown_call_state: "Unknown call state",
        answer_call: "Answer call",
        end_call: "End call",
        mute_audio: "Mute audio",
        unmute_audio: "Unmute audio",
        mute_video: "Mute video",
        unmute_video: "Unmute video",
        mute: "Mute",
        unmute: "Unmute",
        close: "Close",
        back: "Back",
        settings: "Settings",
        more: "More",
        documentation: "Documentation",
        call: "Call",
        sip_call_settings: "SIP Call Settings",
        audio_output: "Audio Output",
        audio_input: "Audio Input",
        default_output: "Default Output",
        default_input: "Default Input",
        audio_output_fallback: "Audio output",
        audio_input_fallback: "Audio input",
        logged_in_as: "Logged in as {username}",
        logged_in_as_description:
            "The current user used to log in to the SIP server. You can configure users in the SIP Core options",
        registered: "registered",
        not_registered: "not registered",
        is_status: "Is {status}",
        registration_status_description:
            "The current registration status of the SIP client. If not registered, check browser console and Asterisk logs for more information",
        call_state_is: "Call state is {state}",
        call_state_description: "The current call state of the SIP client",
        sip_core_description: "The main SIP call system, created by Jordy Kuhne",
        open_call_popup: "Open Call Popup",
        contacts: "Contacts",
        call_button: "CALL",
    },
    de: {
        no_active_call: "Kein aktiver Anruf",
        incoming_call_from: "Eingehender Anruf von {name}",
        outgoing_call_to: "Ausgehender Anruf an {name}",
        connected_to: "Verbunden mit {name}",
        connecting_to: "Verbinde mit {name}",
        unknown_call_state: "Unbekannter Anrufstatus",
        answer_call: "Anruf annehmen",
        end_call: "Anruf beenden",
        mute_audio: "Audio stummschalten",
        unmute_audio: "Audio-Stummschaltung aufheben",
        mute_video: "Video stummschalten",
        unmute_video: "Video-Stummschaltung aufheben",
        mute: "Stummschalten",
        unmute: "Stummschaltung aufheben",
        close: "Schließen",
        back: "Zurück",
        settings: "Einstellungen",
        more: "Mehr",
        documentation: "Dokumentation",
        call: "Anruf",
        sip_call_settings: "SIP-Anrufeinstellungen",
        audio_output: "Audioausgabe",
        audio_input: "Audioeingabe",
        default_output: "Standardausgabe",
        default_input: "Standardeingabe",
        audio_output_fallback: "Audioausgabe",
        audio_input_fallback: "Audioeingabe",
        logged_in_as: "Angemeldet als {username}",
        logged_in_as_description:
            "Der aktuelle Benutzer, der bei dem SIP-Server angemeldet ist. Benutzer können in den SIP Core-Optionen konfiguriert werden",
        registered: "registriert",
        not_registered: "nicht registriert",
        is_status: "Ist {status}",
        registration_status_description:
            "Der aktuelle Registrierungsstatus des SIP-Clients. Falls nicht registriert, prüfen Sie die Browser-Konsole und die Asterisk-Protokolle für weitere Informationen",
        call_state_is: "Anrufstatus ist {state}",
        call_state_description: "Der aktuelle Anrufstatus des SIP-Clients",
        sip_core_description: "Das SIP-Anrufsystem, erstellt von Jordy Kuhne",
        open_call_popup: "Anruf-Popup öffnen",
        contacts: "Kontakte",
        call_button: "ANRUFEN",
    },
};

/** Resolves the two-letter language code Home Assistant reports on `hass`. */
function resolveLanguage(hass: any): SupportedLanguage {
    const raw: string | undefined = hass?.locale?.language || hass?.language;
    if (!raw) return DEFAULT_LANGUAGE;

    const base = raw.toLowerCase().split("-")[0];
    return base in translations ? (base as SupportedLanguage) : DEFAULT_LANGUAGE;
}

/**
 * Looks up `key` in the dictionary for the language reported by `hass`,
 * falling back to English (and finally the key itself) when missing.
 * `substitutions` values replace `{placeholder}` tokens in the string.
 */
export function localize(
    hass: any,
    key: string,
    substitutions?: Record<string, string | number | null | undefined>,
): string {
    const language = resolveLanguage(hass);
    let translation = translations[language]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;

    if (substitutions) {
        for (const [placeholder, value] of Object.entries(substitutions)) {
            translation = translation.replace(new RegExp(`{${placeholder}}`, "g"), value == null ? "" : String(value));
        }
    }

    return translation;
}
