import {BigNumberish} from 'ethers'
import {ChainId} from '@sushiswap/sdk'
import {createAction} from '@reduxjs/toolkit'

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export enum TransactionType {
  APPROVAL = 0,
  BUILD_OVL_POSITION = 1,
  UNWIND_OVL_POSITION = 2,
  LIQUIDATE_OVL_POSITION = 3,
  BRIDGE_OVL = 4,
  CLAIM_OVL = 5,
  STAKE_OVL = 6,
  WITHDRAW_OVL = 7,
  CLAIM_REWARDS = 8,
  EMERGENCYWITHDRAW_OVL_POSITION = 9,
  REFERRAL_CODE = 10,
  REFERRAL_CREATE_AFFILIATE = 11,
  REFERRAL_CLAIM = 12,
}

export interface BaseTransactionInfo {
  type: TransactionType
}

export interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL
  tokenAddress: string
  spender: string
}

export interface BuildOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.BUILD_OVL_POSITION
  market: string
  collateral: string
  leverage: string
  isLong: boolean
}

export interface UnwindOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.UNWIND_OVL_POSITION
  positionId: string
  shares: string
}

export interface LiquidateOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.LIQUIDATE_OVL_POSITION
  positionId: string
}

export interface BridgeOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.BRIDGE_OVL
  // fromChainId: string | number
  // toChainId: string | number
  amount: string
}

export interface ClaimOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.CLAIM_OVL
  recipient: string
  amount: BigNumberish
}

export interface StakeOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.STAKE_OVL
  poolAddress: string
  amount: string
}

export interface WithdrawOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.WITHDRAW_OVL
  poolAddress: string
  amount: string
}

export interface ClaimRewardsTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.CLAIM_REWARDS
  poolAddress: string
}

export interface EmergencyWithdrawOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.EMERGENCYWITHDRAW_OVL_POSITION
  positionId: string
}

export interface ReferralCodeTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.REFERRAL_CODE
  referralCode: string
}

export interface ReferralCreateAffiliateTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.REFERRAL_CREATE_AFFILIATE
  referralCreateAffiliate: string
}

export interface ReferralClaimTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.REFERRAL_CLAIM
  amount: string
  account: string
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | BuildOVLTransactionInfo
  | UnwindOVLTransactionInfo
  | LiquidateOVLTransactionInfo
  | BridgeOVLTransactionInfo
  | ClaimOVLTransactionInfo
  | StakeOVLTransactionInfo
  | WithdrawOVLTransactionInfo
  | ClaimRewardsTransactionInfo
  | EmergencyWithdrawOVLTransactionInfo
  | ReferralCodeTransactionInfo
  | ReferralCreateAffiliateTransactionInfo
  | ReferralClaimTransactionInfo

export const addTransaction = createAction<{
  chainId: ChainId
  hash: string
  from: string
  info: TransactionInfo
}>('transactions/addTransaction')

export const clearAllTransactions = createAction<{
  chainId: ChainId
}>('transactions/clearAllTransactions')

export const finalizeTransaction = createAction<{
  chainId: ChainId
  hash: string
  receipt: SerializableTransactionReceipt
}>('transactions/finalizeTransaction')

export const checkedTransaction = createAction<{
  chainId: ChainId
  hash: string
  blockNumber: number
}>('transactions/checkedTransaction')
