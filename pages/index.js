import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Dropdown, Grid, Header, Menu, Input, Form } from 'semantic-ui-react'
import { ethers } from "ethers";
import React, { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractEvent } from "wagmi";
import { createWalletClient, custom, parseEther } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [amount, setAmount] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const { address, isDisconnected, isConnected } = useAccount();

  const addTargetAddress = (e) => {
    setTargetAddress(e.target.value);
    setAddressError(false)
  }

  const addAmount = (e) => {
    setAmount(e.target.value);
    setAmountError(false)
  }

  const sendEther = async (e) => {

    e.preventDefault();

    if(isDisconnected){
      alert("Please connect your wallet!");
      return;
    }else if(targetAddress === ""){
      setAddressError({ content: 'Please enter an address' })
      return
    } else if(amount === ""){
      setAmountError({ content: 'Please enter an amount' })
      return
    }

    setLoading(value => !value);

    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const client = createWalletClient({
      chain: sepolia,
      account,
      transport: custom(window.ethereum)
    })

    const transactionReceipt = await client.sendTransaction({ 
      to: targetAddress.toString(),
      value: parseEther(amount)
     });
     console.log(transactionReceipt);

     setLoading(value => !value);
     setTargetAddress("");
     setAmount("");

     alert("Transaction successful!")
  }

  return (
    <>
      <Menu size='large'>
        <Menu.Item
          name='home'
        />

        <Menu.Menu position='right'>
          <Menu.Item>
            <ConnectButton/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Grid container>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as='h2'>Connected Account Address: </Header>
            <Header as='h4'>{isConnected ? address : "Not Connected!"}</Header>
          </Grid.Column>
          <Grid.Column >
            <Header as='h2'>Send Ether</Header>
            <Form onSubmit={sendEther}>
              <Form.Input
                error={addressError}
                fluid
                label='Address'
                placeholder='Enter Address (0x..)'
                onChange={addTargetAddress} style={{marginBottom: '10px'}} value={targetAddress}
              />
              <Form.Input
                error={amountError}
                fluid
                type='number'
                label='Amount'
                placeholder='Enter Amount'
                onChange={addAmount} style={{marginBottom: '10px'}} value={amount}
              />
              <Button loading={loading} primary type='submit'>Transfer</Button>
          </Form>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
