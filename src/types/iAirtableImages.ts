export type IAirtableImages = {
    id: string;
    filename: string; // "compare_airpods_pro__e9uzt0mzviem_large_2x.png"
    url: string;
    width: number;
    height: number;
    size: number;
    type: 'image/png';
    thumbnails: {
        full: {
            url: string;
            width: number;
            height: number;
        };
        large: {
            url: string;
            width: number;
            height: number;
        };
        small: {
            url: string;
            width: number;
            height: number;
        };
    };
};
