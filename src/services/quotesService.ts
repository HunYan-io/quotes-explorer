const API_URL = "https://your-quotes-api.herokuapp.com";

export type Quote = {
    id: number;
    content: string;
};

export const fetchQuotes = async () => {
    const quotes = await fetch(`${API_URL}/quotes/random?count=4`).then((res) =>
        res.json()
    );
    return quotes as Quote[];
};
