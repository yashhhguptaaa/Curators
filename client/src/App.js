import React, { useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  useEffect(() => {
    const initializeApplication = async () => {
      setLoginLoading(true);
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
      } catch (e) {
        console.log(e);
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    initializeApplication();
  }, []);
  return (
    <div>
      <h1>{account}</h1>
    </div>
  );
}

export default App;
