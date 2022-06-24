import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui/lib/types/alletModalProvider';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import { SOLANA_HOST } from '../utils/const';

const WalletConnectionProvider = ({ children }) => {

    const endpoint = useMemo(() => SOLANA_HOST, []) // guardamos el endpoint en una variable usada en el provider

    const wallets = useMemo(() => [new PhantomWalletAdapter()], []) // new instance on useMemo

  return (
    <ConnectionProvider endpoint={endpoint}>
        {/* Pasar las instancias del wallet al provider*/}
        <WalletProvider
            wallets={wallets}
            autoConnect
        >
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletConnectionProvider