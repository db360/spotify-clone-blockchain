import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react'; //provides the instance to the connected wallet
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Payment from './Payment';

const styles = {
    loginPage: `w-screen h-screen bg-white flex flex-col justify-center items-center`,
    text:`text-4xl text-black mb-10`,
}

const Login = () => {

    const wallet = useWallet(); // inicializar la var wallet

    if(wallet.connected) return <Payment />

  return (
    <div className={styles.loginPage}>
        <p className={styles.text}>Login to Access the App</p>
        <WalletMultiButton />
    </div>
  )
}

export default Login