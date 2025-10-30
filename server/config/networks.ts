
export const NETWORKS = {
  development: {
    USDC: 'base-sepolia',
    SOL: 'solana-devnet',
    ETH: 'ethereum-sepolia',
    MATIC: 'polygon-mumbai',
    BNB: 'bsc-testnet',
  },
  production: {
    USDC: 'base-mainnet',
    SOL: 'solana-mainnet',
    ETH: 'ethereum-mainnet',
    MATIC: 'polygon-mainnet',
    BNB: 'bsc-mainnet',
  }
};

export const getNetwork = (crypto: string): string => {
  const env = process.env.NODE_ENV || 'development';
  const networks = NETWORKS[env as keyof typeof NETWORKS] || NETWORKS.development;
  return networks[crypto as keyof typeof networks] || networks.USDC;
};

export const isMainnet = () => process.env.NODE_ENV === 'production';
