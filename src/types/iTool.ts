import { IAirtableImages } from './iAirtableImages';

export type ITool = {
    id: string; // "recFoyzP7v567KhqU"
    name: string; // "BeoPlay H9"
    brand: string; // "Bang&Olufsen"
    wtf: string; // "Kulaklık"
    rating: 1 | 2 | 3 | 4 | 5; // 4
    category: string[]; // ["workspace", "living"]
    images?: IAirtableImages;
    comment?: string; // lorem ipsum
    url?: string; // "https://www.bang-olufsen.com/en/us/headphones/beoplay-h9?variant=beoplay-h9-3-matte-black"
};
