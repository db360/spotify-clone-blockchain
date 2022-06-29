import {useEffect, useState} from 'react';

import {getProgramInstance} from '../utils/utils';
import { SOLANA_HOST } from '../utils/const';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

import HomePage from '../pages/homepage';

const anchor = require('@project-serum/anchor');

const { web3 } = anchor;
const { SystemProgram } = web3;
const utf8 = anchor.utils.bytes.utf8;

const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
}

const styles = {
  main: `w-screen h-screen bg-white text-black flex flex-col justify-center items-center`,
  button: `bg-[#22C55E] m-3 text-white font-bold py-4 px-7 rounded-full hover:opacity-70 transition`,
  text: `text-4xl mb-10`,
  buttons: `flex item-center`
}

const Payment = () => {

    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);

    const [payers, setPayers] = useState([]);
    const [isPaid, setPaid] = useState(false);

    useEffect(() => {
      if(wallet.connected) getAllWallets()
    }, [wallet.connected, isPaid]);

    const getAllWallets = async () => {
      const payerList = await program.account.payerAccount.all();
      setPayers(payerList);
      console.log("GET ALL WALLETS RUNNING")
      payerList.forEach(payer => {
        if(payer.account.wallet.toBase58() == wallet.publicKey.toBase58())
        setPaid(true);
      })
    }

    // console.log(isPaid)

    const payClicked = async() =>{
      let [payerSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode('payer'), wallet.publicKey.toBuffer()],
        program.programId
      )

      let payerInfo;
      // console.log(payerInfo)

      try {
        payerInfo = await program.account.payerAccount.fetch(payerSigner)
      } catch (e) {
        // alert("Promise failed")
        try {
          await program.rpc.acceptPayment({
            accounts: {
              payerWallet: payerSigner,
              receiver: new PublicKey(
                "4C2WwPYxTBAhjZ2XN8yqmF64AcPCzrQdZ9NsDA7M5K4R"
              ),
              authority: wallet.publicKey,
              ...defaultAccounts,
            },
          })
          alert('Transaction Successful!')
        } catch(e) {
          alert(e.message)
        }
      }
    }

    if(isPaid) return <HomePage />


  return (
    <div className={styles.main}>
      <p className={styles.text}>Make Payment</p>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={payClicked}
        >
          Pay 0.1 Sol
        </button>
        <button className={styles.button} onClick={getAllWallets}>
          Verify Payment
        </button>
      </div>
    </div>
  )
}

export default Payment