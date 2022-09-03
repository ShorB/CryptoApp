export type CoinsData = {
    id: string;
    image: string;
    name: string;
    symbol: string;
    curPrice: number;
    priceChange: number;
    priceChangeFlat: number;
};
  
export type RawData = {
    id: string;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    price_change_24h: number;
};
  
export type CurrenciesArrayItemData = {
    id: number;
    currency: string;
};
  
export type CurrenciesArray = {
    currenciesArray: CurrenciesArrayItemData[];
};

export enum Category {
    all = "all",
    gainer = "gainer",
    loser = "loser",
    favourites = "favourites",
}