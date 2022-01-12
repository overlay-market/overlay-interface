import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { utils } from "ethers";
import { Label, Input } from "@rebass/forms";
import { Sliders, X } from "react-feather";
import { MarketCard } from "../../components/Card/MarketCard";
import { SelectActionButton, TriggerActionButton, TransparentUnderlineButton, TransactionSettingsButton, ApproveTransactionButton } from "../../components/Button/Button";
import { TEXT } from "../../theme/theme";
import { OVL } from "../../constants/tokens";
import { Icon } from "../../components/Icon/Icon";
import { useActiveWeb3React } from "../../hooks/web3";
import { useOvlBalance } from "../../state/wallet/hooks";
import { InfoTip } from "../../components/InfoTip/InfoTip";
import { usePositionState } from "../../state/positions/hooks";
import { useDerivedBuildInfo } from "../../state/positions/hooks";
import { DefaultTxnSettings } from "../../state/positions/actions";
import { usePositionActionHandlers } from "../../state/positions/hooks";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";
import { formatWeiToParsedString, formatWeiToParsedNumber } from "../../utils/formatWei";
import { ApprovalState, useApproveCallback } from "../../hooks/useApproveCallback";
import { LeverageSlider } from "../../components/LeverageSlider/LeverageSlider";
import { PopupType } from "../../components/SnackbarAlert/SnackbarAlert";
import { TransactionSettingsModal } from "./TransactionSettingsModal";
import { formatDecimalToPercentage } from "../../utils/formatDecimal";
import { useMarketImpactFee } from "../../hooks/useMarketImpactFee";
import { useIsTxnSettingsAuto } from "../../state/positions/hooks";
import { useEstimatedBuild } from "../../hooks/useEstimatedBuild";
import { useBuildCallback } from "../../hooks/useBuildCallback";
import { useAllMarkets } from "../../state/markets/hooks";
import { shortenAddress } from "../../utils/web3";
import { useBuildFee } from "../../hooks/useBuildFee";
import { AdditionalDetails } from "./AdditionalBuildDetails";
import { useFundingRate } from "../../hooks/useFundingRate";
import { useLiquidationPrice } from "../../hooks/useLiquidationPrice";
import TransactionPending from "../../components/Popup/TransactionPending";
import ConfirmTxnModal from "../../components/ConfirmTxnModal/ConfirmTxnModal";

const SelectLongPositionButton = styled(SelectActionButton)`
  color: ${({ active }) => ( active ? '#0B0F1C' : '#10DCB1' )};
  background: ${({ active }) => ( active ? '#10DCB1' : 'transparent' )};
  margin: 4px 0;
`;

const SelectShortPositionButton = styled(SelectActionButton)`
  color: ${({ active }) => (active ? '#0B0F1C' : '#FF648A')};
  background: ${({ active }) => (active ? '#FF648A' : 'transparent')};
  margin: 4px 0;
`;

const TriggerBuildButton = styled(TriggerActionButton)`
`;

const ControlInterfaceContainer = styled(FlexColumnContainer)`
  padding: 16px;
`;

const ControlInterfaceHeadContainer = styled(FlexColumnContainer)`
  padding: 16px 0 24px; 
`;

export const NumericalInputContainer = styled(FlexRowContainer)`
  border: 1px solid ${({ theme }) => theme.white};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
`;

export const NumericalInputDescriptor = styled.div`
  background: transparent;
  font-size: 16px;
  color: #f2f2f2;
  padding: 8px;
`;

const NumericalInputLabel = styled(Label)`
  margin-top: 24px !important;
`;

const NumericalInputTitle = styled(TEXT.StandardBody)`
  margin-bottom: 4px !important;
`;

export const BuildInterface = ({
  marketId,
  marketPrice,
}:{
  marketId: string;
  marketPrice: string | number;
}) => {
  const [isTxnSettingsOpen, setTxnSettingsOpen] = useState<boolean>(false);
  const [{ showConfirm, attemptingTransaction, transactionErrorMessage, transactionHash }, setBuildState] = useState<{
    showConfirm: boolean;
    attemptingTransaction: boolean;
    transactionErrorMessage: string | undefined;
    transactionHash: string | undefined;
  }>({
    showConfirm: false,
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  });

  const { markets } = useAllMarkets();
  const { buildData } = useDerivedBuildInfo();
  const { account, chainId } = useActiveWeb3React();
  const { ovlBalance: userOvlBalance } = useOvlBalance(account);
  const { callback: buildCallback } = useBuildCallback(buildData);
  const isTxnSettingsAuto = useIsTxnSettingsAuto();
  const buildFee = useBuildFee();
  const ovl = chainId ? OVL[chainId] : undefined;
  const parsedUserOvlBalance = userOvlBalance ? formatWeiToParsedString(userOvlBalance, 2) : null;

  const filteredMarketById = markets?.filter((market, key) => market.id === marketId);
  const market = filteredMarketById ? filteredMarketById[0] : null;
  
  const {
    selectedLeverage,
    isLong,
    typedValue,
    setSlippageValue,
    txnDeadline,
  } = usePositionState();
  const {
    onAmountInput,
    onSelectLeverage,
    onSelectPositionSide,
    onSetSlippage,
    onSetTxnDeadline,
    onResetBuildState,
  } = usePositionActionHandlers();
  
  const handleResetTxnSettings = useCallback((e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE);
      onSetTxnDeadline(DefaultTxnSettings.DEFAULT_DEADLINE);
    }, [onSetSlippage, onSetTxnDeadline]);

  const handleLeverageInput = useCallback((e: any) => {
      onSelectLeverage(e.target.value)}, [onSelectLeverage]);

  const handleSelectPositionSide = useCallback((isLong: boolean) => {
      onSelectPositionSide(isLong)}, [onSelectPositionSide]);
    
  const handleUserInput = useCallback((input: string) => {
      onAmountInput(input)}, [onAmountInput]);
          
  const handleQuickInput = (percentage: number, totalSupply: string | null) => {
    if (totalSupply == '0' || totalSupply === null) return;

    let calculatedAmountByPercentage;
    if (percentage < 100) {
      calculatedAmountByPercentage = (
        Number(totalSupply) *
        (percentage / 100)
        ).toFixed(0);
    } else {
      calculatedAmountByPercentage = (
        Number(totalSupply) *
        (percentage / 100)
        ).toFixed(10);
    }
    return handleUserInput(calculatedAmountByPercentage);
  };
              
  const handleDismiss = useCallback(() => {
    setBuildState({
      showConfirm: false, 
      attemptingTransaction, 
      transactionErrorMessage, 
      transactionHash
    });
  }, [attemptingTransaction, transactionErrorMessage, transactionHash]);
  
  const disableBuildButton: boolean = useMemo(() => {
    return !typedValue || isLong === undefined ? true : false;
  }, [typedValue, isLong]);
  
  const handleBuild = useCallback(() => {
    if (!typedValue) throw new Error("missing position input size");  
    if (isLong === undefined) throw new Error("please choose a long/short position");
    if (!buildCallback) return;
    setBuildState({
      showConfirm: true,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    });
    buildCallback()
      .then((hash) => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        });
        onResetBuildState();
      })
      .catch((error) => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        });
      });
  }, [buildCallback, onResetBuildState, isLong, typedValue]);
  
  const [approval, approveCallback] = useApproveCallback(
    utils.parseUnits(typedValue ? typedValue : "0"),
    ovl,
    account ?? undefined
  );

  const showApprovalFlow = useMemo(() => {
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval]);
  
  const handleApprove = useCallback(async () => {
    if (!typedValue) throw new Error("missing position input size");
    setBuildState({
      showConfirm: false,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    });
    approveCallback()
      .then((hash) => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: undefined,
        });
      })
      .catch((error) => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        });
      });
  }, [approveCallback, typedValue]);
  
  const fundingRate = useFundingRate(market?.id);
  
  const averagePrice = useMemo(() => {
    return market ? (
          ( 
            Number(utils.formatUnits(market?.currentPrice.bid, 18)) +
            Number(utils.formatUnits(market?.currentPrice.ask, 18))
          ) / 2
        ).toFixed(7)
        : "loading...";
    }, [market]);
    
  const { impactFee } = useMarketImpactFee(
    market ? market.id : undefined,
    isLong,
    isLong !== undefined ? isLong ? market?.oiLong : market?.oiShort : undefined,
    market?.oiCap
  );
    
  const {
    preAdjustedOi,
    calculatedBuildFee,
    calculatedImpactFee,
    adjustedCollateral,
    adjustedOi,
    adjustedDebt
  } = useEstimatedBuild(
    selectedLeverage,
    Number(typedValue),
    buildFee ? formatWeiToParsedNumber(buildFee, 18, 10) : undefined,
    impactFee
  );
        
  const estimatedLiquidationPrice = useLiquidationPrice(
    market?.id,
    isLong,
    formatWeiToParsedNumber(market?.currentPrice.bid, 18, 5),
    formatWeiToParsedNumber(market?.currentPrice.ask, 18, 5),
    adjustedDebt,
    adjustedOi,
    adjustedOi
  );

  return (
    <MarketCard align={"left"} padding={"0px"}>
      <ControlInterfaceContainer
        onSubmit={(e: any) => e.preventDefault()}
        as={"form"}
        >
        <ControlInterfaceHeadContainer>
          <TEXT.BoldHeader1>
            {market ? shortenAddress(market?.id) : "loading..."}
          </TEXT.BoldHeader1>
          <TEXT.StandardHeader1>
            {isLong === undefined && averagePrice}
            {isLong !== undefined && market
              ? isLong
                ? formatWeiToParsedNumber(market?.currentPrice.bid, 18, 7)
                : formatWeiToParsedNumber(market?.currentPrice.ask, 18, 7)
              : null}
          </TEXT.StandardHeader1>
          <Icon
            onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
            size={24}
            top={"18px"}
            right={"0px"}
            clickable={true}
            position={"absolute"}
            margin={"0 0 auto auto"}
            transform={"rotate(90deg)"}
            >
            {isTxnSettingsOpen ? <X color={"#12B4FF"} /> : <Sliders color={"#B9BABD"} />}
          </Icon>
        </ControlInterfaceHeadContainer>
        <TransactionSettingsModal 
          isTxnSettingsOpen={isTxnSettingsOpen}
          setSlippageValue={setSlippageValue}
          isTxnSettingsAuto={isTxnSettingsAuto}
          txnDeadline={txnDeadline}
          onSetSlippage={onSetSlippage}
          handleResetTxnSettings={handleResetTxnSettings}
          onSetTxnDeadline={onSetTxnDeadline}
        />
        <SelectLongPositionButton
          onClick={() => handleSelectPositionSide(true)}
          active={isLong}
          >
          Long
        </SelectLongPositionButton>
        <SelectShortPositionButton
          onClick={() => handleSelectPositionSide(false)}
          active={!isLong && isLong !== undefined}
          >
          Short
        </SelectShortPositionButton>
        <LeverageSlider
          name={"Build Position Leverage"}
          min={1}
          max={5}
          step={1}
          margin={"24px 0 0 0"}
          value={selectedLeverage}
          onChange={handleLeverageInput}
        />
        <NumericalInputLabel htmlFor="Build Amount Input">
          <NumericalInputTitle> Amount </NumericalInputTitle>
          <FlexRowContainer ml={"auto"} mb={"4px"} width={"auto"}>
            <TransparentUnderlineButton onClick={() => handleQuickInput(25, parsedUserOvlBalance ?? null)}>
              25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(50, parsedUserOvlBalance ?? null)}>
              50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(75, parsedUserOvlBalance ?? null)}>
              75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(100, parsedUserOvlBalance ?? null)}>
              Max
            </TransparentUnderlineButton>
          </FlexRowContainer>
        </NumericalInputLabel>
        <NumericalInputContainer>
          <NumericalInputDescriptor> OVL </NumericalInputDescriptor>
          <NumericalInput
            align={"right"}
            onUserInput={handleUserInput}
            value={typedValue?.toString()}
          />
        </NumericalInputContainer>

        {showApprovalFlow ? (
          <ApproveTransactionButton 
            attemptingTransaction={attemptingTransaction}
            onClick={handleApprove}
          />
        ) : (
          <TriggerBuildButton
            onClick={() => {
              setBuildState({
                showConfirm: true,
                attemptingTransaction: false,
                transactionErrorMessage: undefined,
                transactionHash: undefined,
              });
            }}
            isDisabled={disableBuildButton}
            disabled={disableBuildButton}
            >
            Build
          </TriggerBuildButton>
        )}
        
      </ControlInterfaceContainer>
      <AdditionalDetails
        bidPrice={market ? formatWeiToParsedString(market.currentPrice.bid, 10) : "..."}
        askPrice={market ? formatWeiToParsedString(market.currentPrice.ask, 10) : "..."}
        fee={buildFee ? formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5)) : "..."}
        oiCap={formatWeiToParsedNumber(market?.oiCap, 18, 0)}
        oiLong={formatWeiToParsedNumber(market?.oiLong, 18, 0)}
        oiShort={formatWeiToParsedNumber(market?.oiShort, 18, 0)}
        slippage={setSlippageValue}
        fundingRate={fundingRate}
        expectedOi={adjustedOi ? adjustedOi.toFixed(2) : "..."}
        estLiquidationPrice={estimatedLiquidationPrice ? estimatedLiquidationPrice : '...'}
      />
      <ConfirmTxnModal
        isOpen={showConfirm}
        attemptingTransaction={attemptingTransaction}
        isLong={isLong}
        buildFee={buildFee && formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5))}
        onConfirm={() => handleBuild()}
        onDismiss={handleDismiss}
        adjustedOi={adjustedOi}
        marketPrice={market ? isLong ? formatWeiToParsedString(market.currentPrice.bid, 10) : formatWeiToParsedString(market.currentPrice.ask, 10) : "n/a"}
        setSlippageValue={setSlippageValue}
        selectedLeverage={selectedLeverage}
        adjustedCollateral={adjustedCollateral}
        estimatedLiquidationPrice={estimatedLiquidationPrice}
      />
      <TransactionPending
        attemptingTransaction={attemptingTransaction}
        severity={PopupType.WARNING}
      />
    </MarketCard>
  );
};
