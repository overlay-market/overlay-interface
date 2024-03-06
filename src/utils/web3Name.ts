import {createWeb3Name} from '@web3-name-sdk/core'

const web3Name = createWeb3Name()

export const getWeb3Username = (address: string) =>
  web3Name.getDomainName({
    address: address,
    queryChainIdList: [1, 42161, 421614],
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  })

export const getWeb3Avatar = (name: string) =>
  web3Name.getDomainAvatar({
    name: name,
    key: 'avatar',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  })
