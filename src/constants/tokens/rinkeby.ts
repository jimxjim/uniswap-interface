import { Token, ChainId } from '@uniswap/sdk'

export default [
  // new Token(ChainId.RINKEBY, '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735', 18, 'DAI', 'Dai Stablecoin'),
  // new Token(ChainId.RINKEBY, '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85', 18, 'MKR', 'Maker'),
  new Token(ChainId.RINKEBY, '0x30eE63b46C73817ef883eA4aB6BAbB954B54588d', 6, 'TT1', 'TestUniswapV2Token1'),
  new Token(ChainId.RINKEBY, '0x4cA466252cc976c4C729E58bAE309032a868E7BF', 6, 'TT2', 'TestUniswapV2Token2')
]
