export namespace Interfaces {
    export const TIER_BASIC = 'DEAD5AE0F62A4A0FA74796C2B262BEC3';
    // export const TIER_PREMIUM = '184A7CF4E145426D852F708418CF2F23';

    export type Segment = {
        "text": string;
        "props": {
            "size": number;
            "font": string;
            "color": string;
        }
    }

    export type Phrase = {
        segments: Segment[];
    }

    export type Manifest = {
        brandName: string;
        date: string;
        disabled?: boolean;
        image: string;
        sku: string;
        slogan: string;
        theme: string;
        version: string;
        params: {
            p_backgroundColors: string[];
            p_brandColors: string[];
            p_brandName: {
                name: string;
                props: {
                    lineSpacing: number;
                    letterSpacing: number;
                },
                phrases: Phrase[];
            },
            p_icon: string;
            p_iconColors: string[];
            p_layout: string;
            p_logoFont: string;
            p_phraseColors: string[];
            p_reversed: false,
            p_scaleIconHeight: true,
            p_splitAlignment: string;
            p_tagline: {
                name: string;
                props: {
                    letterSpacing: number;
                    lineSpacing: number;
                },
                phrases: Phrase[]
            },
            p_taglineFont: string;
            p_taglineHidden: boolean;
            p_icon_text: string;
            p_icon_iconAlignment: string;
        }
    }
}