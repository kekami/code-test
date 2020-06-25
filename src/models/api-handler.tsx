type DeckResponse = {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
};

type CardResponse = {
  success: boolean;
  cards: Card[];
  deck_id: string;
  remaining: number;
};

export type Card = {
  image: string;
  value: string;
  numbericValue: number;
  code: string;
};

class ApiHandler {
  private static url = 'https://deckofcardsapi.com/api';
  private static instance: ApiHandler;

  static getInstance(): ApiHandler {
    if (!ApiHandler.instance) {
      ApiHandler.instance = new ApiHandler();
    }

    return ApiHandler.instance;
  }

  private constructor() {}

  async getDeckId() {
    try {
      const response = await request(
        ApiHandler.url + '/deck/new/shuffle/?deck_count=1'
      );
      const deckResponse = (await response.json()) as DeckResponse;
      return {
        deckId: deckResponse.deck_id,
        remaining: deckResponse.remaining,
      };
    } catch (error) {
      throw error;
    }
  }
  async drawCard(id: string) {
    try {
      const response = await request(
        ApiHandler.url + `/deck/${id}/draw/?count=1`
      );
      const cardResponse = (await response.json()) as CardResponse;
      const card = cardResponse.cards[0];
      card.numbericValue = cardValueTranslator(card);
      return { card: cardResponse.cards[0], remaining: cardResponse.remaining };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ApiHandler.getInstance();

async function request(url: string, options?: RequestInit) {
  try {
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

function cardValueTranslator(card: Card) {
  switch (card.value) {
    case 'JACK':
      return 11;
    case 'QUEEN':
      return 12;
    case 'KING':
      return 13;
    case 'ACE':
      return 14;
    default:
      return Number(card.value);
  }
}
