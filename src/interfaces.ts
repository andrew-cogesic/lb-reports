export namespace Interfaces {
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
        sku: string;
        date: string;
        version: string;
        theme: string;
        image: string;
        slogan: string;
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