import { useRouter } from "next/router";
import { rtlSupported } from "src/localization";

// This hook is used to determine the direction of the language
export function useLanguageDirection() {
    const { query } = useRouter()
    const isRtl = rtlSupported.includes(query.lang as string)

    return isRtl ? 'rtl' : 'ltr'
}
