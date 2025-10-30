// Price conversion service for multi-crypto support
// In production, this would use real-time price feeds from Chainlink or similar

export type SupportedCrypto = 'USDC' | 'SOL' | 'ETH' | 'MATIC' | 'BNB';

interface CryptoPrices {
  USDC: number;
  SOL: number;
  ETH: number;
  MATIC: number;
  BNB: number;
}

// Mock prices in USD - in production, fetch from price oracle
const MOCK_PRICES: CryptoPrices = {
  USDC: 1.0,
  SOL: 143.50,
  ETH: 2650.00,
  MATIC: 0.45,
  BNB: 610.00,
};

/**
 * Convert a price from one cryptocurrency to another
 */
export function convertPrice(
  amount: number,
  fromCrypto: keyof CryptoPrices,
  toCrypto: keyof CryptoPrices
): number {
  const fromUSD = amount * MOCK_PRICES[fromCrypto];
  const toAmount = fromUSD / MOCK_PRICES[toCrypto];
  return Math.round(toAmount * 1000000) / 1000000; // 6 decimal places
}

/**
 * Get current price for a cryptocurrency in USD
 */
export function getPriceInUSD(crypto: keyof CryptoPrices): number {
  return MOCK_PRICES[crypto];
}

/**
 * Convert USD to specified cryptocurrency
 */
export function convertFromUSD(
  usdAmount: number,
  toCrypto: keyof CryptoPrices
): number {
  return Math.round((usdAmount / MOCK_PRICES[toCrypto]) * 1000000) / 1000000;
}

/**
 * Format price for display with appropriate decimals
 */
export function formatPrice(
  amount: number,
  crypto: keyof CryptoPrices
): string {
  if (crypto === 'USDC') {
    return amount.toFixed(2);
  } else if (crypto === 'SOL' || crypto === 'ETH') {
    return amount.toFixed(4);
  } else {
    return amount.toFixed(3);
  }
}

/**
 * Get all supported cryptocurrencies with current prices
 */
export function getAllPrices(): CryptoPrices {
  return { ...MOCK_PRICES };
}