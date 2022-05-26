import React, { useEffect } from "react";
import { Button, ChevronDownIcon, HomeIcon, IconButton, SelectMenu } from "evergreen-ui";
import { getAccountAssets, switchChain } from "../../features/walletConnectSlice";
import { ChainType } from "../../helpers/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

const options = [
  {label: "Testnet", value: ChainType.TestNet},
  {label: "Mainnet", value: ChainType.MainNet},
]

const SiteHeader: React.FC = () => {
  let navigate = useNavigate();
  const { fetching: loading, address, chain } = useAppSelector((state) => state.walletConnect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Retrieve assets info
    if (address?.length > 0) {
      dispatch(getAccountAssets({ chain, address }));
    }
  }, [dispatch, address, chain]);

  return (
    <div className="site-layout-background site-header">
      <div className="site-header-inner">
        <IconButton icon={<HomeIcon />} onClick={async () => {
          navigate("/tweets");
        }} />
        <div>
          <SelectMenu
            selected={chain}
            options={options}
            hasFilter={false}
            hasTitle={false}
            onSelect={(event) => {dispatch(switchChain(event.value as ChainType))}}
            height={70}
            closeOnSelect={true}
          >
            <Button width={180} iconAfter={<ChevronDownIcon />} justifyContent="space-between">
              {chain ? `Connected to ${options?.find(e => e.value === chain)?.label}` : "Connect to...."}
            </Button>
          </SelectMenu>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
