import React, { useEffect, useState } from "react";
import Yamde from "yamde";
import { create as ipfsHttpClient } from "ipfs-http-client";
import getWeb3 from "../getWeb3";
import TipCuratorsContract from "../contracts/Donation.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function CreatePost() {
  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });
  const [web3State, setWeb3State] = useState(null);
  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleEditor = e => {
    setFormState({ ...formState, body: e });
  };
  const handleSubmit = async e => {
    try {
      const accounts = await web3State.eth.getAccounts();
      const networkId = await web3State.eth.net.getId();
      const networkData = TipCuratorsContract.networks[networkId];
      // console.log(networkData.address);
      const tipCurators = new web3State.eth.Contract(
        TipCuratorsContract.abi,
        networkData.address
      );
      const data = JSON.stringify({
        title: formState.title,
        body: formState.body,
      });
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      const transaction = await tipCurators.methods
        .createPost(url)
        .send({ from: accounts[0] });

      console.log(transaction);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const setWeb3 = async () => {
      const web3 = await getWeb3();
      setWeb3State(web3);
    };
    setWeb3();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", marginBottom:'40px',marginTop: "90px", width:"60vw", marginLeft:"310px" }}>
        <input
          onChange={handleChange}
          value={formState.title}
          placeholder="Article Title"
          name="title"
          id="input"
          style={{ padding: "30px" }}
        />
        <Yamde
          name="body"
          value={formState.body}
          handler={handleEditor}
          theme="light"
        />
        <button style={{ padding: "30px", backgroundColor:"rgb(213, 160, 91)" , color:"white"}} onClick={handleSubmit}>
          Post Article
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
