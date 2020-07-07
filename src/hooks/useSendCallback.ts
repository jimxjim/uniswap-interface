import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { TokenAmount, JSBI, CurrencyAmount, ETHER } from '@uniswap/sdk'
import { useMemo } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'

import { calculateGasMargin, getSigner, isAddress } from '../utils'
import { useTokenContract } from './useContract'
import { useActiveWeb3React } from './index'
import useENSName from './useENSName'

// returns a callback for sending a currency amount
// returns null with invalid arguments
export function useSendCallback(amount?: CurrencyAmount, recipient?: string): null | (() => Promise<string>) {
  const { library, account, chainId } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const ensName = useENSName(recipient)
  const tokenContract = useTokenContract(amount instanceof TokenAmount ? amount?.token?.address : undefined)
  const balance = useCurrencyBalance(account ?? undefined, amount?.currency)

  return useMemo(() => {
    if (!amount) return null
    if (!amount.greaterThan(JSBI.BigInt(0))) return null
    if (!isAddress(recipient)) return null
    if (!balance) return null
    if (balance.lessThan(amount)) return null

    return async function onSend(): Promise<string> {
      if (!chainId || !library || !account || !tokenContract) {
        throw new Error('missing dependencies in onSend callback')
      }
      if (amount.currency === ETHER) {
        return getSigner(library, account)
          .sendTransaction({ to: recipient, value: BigNumber.from(amount.raw.toString()) })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary:
                'Send ' + amount.toSignificant(3) + ' ' + amount.currency.symbol + ' to ' + (ensName ?? recipient)
            })
            return response.hash
          })
          .catch((error: Error) => {
            console.error('Failed to transfer ETH', error)
            throw error
          })
      } else {
        return tokenContract.estimateGas
          .transfer(recipient, amount.raw.toString())
          .then(estimatedGasLimit =>
            tokenContract
              .transfer(recipient, amount.raw.toString(), {
                gasLimit: calculateGasMargin(estimatedGasLimit)
              })
              .then((response: TransactionResponse) => {
                addTransaction(response, {
                  summary:
                    'Send ' + amount.toSignificant(3) + ' ' + amount.currency.symbol + ' to ' + (ensName ?? recipient)
                })
                return response.hash
              })
          )
          .catch(error => {
            console.error('Failed token transfer', error)
            throw error
          })
      }
    }
  }, [addTransaction, library, account, chainId, amount, ensName, recipient, tokenContract, balance])
}
