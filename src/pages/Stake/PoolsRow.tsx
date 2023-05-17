import {StyledTableCellThin, StyledTableRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'

type PoolsRowProps = {
  index: number
  poolName: string
  tvl: number
  volume24h: number
  volume7d: number
  balance: number
  rewards: number
}

const PoolsRow = ({index, poolName, tvl, volume24h, volume7d, balance, rewards}: PoolsRowProps) => {
  return (
    <StyledTableRow hover={true}>
      {/* Index */}
      <StyledTableCellThin id="marketIndex">{index}</StyledTableCellThin>

      {/* Pool */}
      <StyledTableCellThin id="pool">
        <FlexRow>
          <TEXT.BoldSmallBody>{poolName}</TEXT.BoldSmallBody>
        </FlexRow>
      </StyledTableCellThin>

      {/* TVL */}
      <StyledTableCellThin id="tvl" align="right">
        <TEXT.Number>${tvl}</TEXT.Number>
      </StyledTableCellThin>

      {/* 24h Volume */}
      <StyledTableCellThin id="volume24h" align="right">
        <TEXT.Number>${volume24h}</TEXT.Number>
      </StyledTableCellThin>

      {/* 7D Volume */}
      <StyledTableCellThin id="volume7d" align="right">
        <TEXT.Number>${volume7d}</TEXT.Number>
      </StyledTableCellThin>

      {/* Balance */}
      <StyledTableCellThin id="balance" align="right">
        <TEXT.BoldNumber>{balance}</TEXT.BoldNumber>
      </StyledTableCellThin>

      {/* Rewards */}
      <StyledTableCellThin id="rewards" align="right">
        <TEXT.BoldNumber>{rewards} OVL</TEXT.BoldNumber>
      </StyledTableCellThin>
    </StyledTableRow>
  )
}

export default PoolsRow
