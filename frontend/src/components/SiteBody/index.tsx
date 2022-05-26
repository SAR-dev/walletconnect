import React, { useContext, useEffect, useState } from "react";
import { Button, Pane, Pulsar } from "evergreen-ui";
import { ellipseAddress } from "../../helpers/utilities";
import { IAssetData } from "../../helpers/types";
import {
  reset,
  onSessionUpdate,
  getAccountAssets,
  selectAssets,
} from "../../features/walletConnectSlice";
import { setIsModalOpen } from "../../features/applicationSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ConnectContext } from "../../store/connector";
import AccountAssets from "../AccountAssets";
import LoadingIcon from "../LoadingIcon";

const SiteBody: React.FC = () => {
  const isLoading = useAppSelector((state) => state.walletConnect.fetching);
  const ownAssets = useAppSelector(selectAssets);
  const { fetching: loading, address, chain } = useAppSelector((state) => state.walletConnect);
  const [isSelected, setIsSelected] = useState(false);

  const assets = useAppSelector(selectAssets);
  const dispatch = useAppDispatch();
  const connector = useContext(ConnectContext);

  useEffect(() => {
    // Check if connection is already established
    if (connector.connected) {
      const { accounts } = connector;
      dispatch(onSessionUpdate(accounts));
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      dispatch(onSessionUpdate(accounts));
      dispatch(setIsModalOpen(false));
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      dispatch(onSessionUpdate(accounts));
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      dispatch(reset());
    });

    return () => {
      connector.off("connect");
      connector.off("session_update");
      connector.off("disconnect");
    };
  }, [dispatch, connector]);

  useEffect(() => {
    // Retrieve assets info
    if (address?.length > 0) {
      dispatch(getAccountAssets({ chain, address }));
    }
  }, [dispatch, address, chain]);

  const nativeCurrency = assets.find((asset: IAssetData) => asset.id === 0)!;

  return (
    <div className="site-body">
      <div className="site-body-inner">
        {!address ? (
          <div className="w-full">
            <Pane position="relative" display="inline-block" marginX="auto">
              <Button
                height={40}
                width={200}
                onClick={() => dispatch(setIsModalOpen(true))}
                appearance="primary"
                style={{ fontWeight: 600 }}
              >
                Connect Wallet
              </Button>
              <Pulsar />
            </Pane>
          </div>
        ) : (
          <div className="header-address-info">
            <div className="w-full">
              <Pane position="relative" display="inline-block" marginX="auto">
                {!loading && (
                  <Button height={40} intent="none" style={{ fontWeight: 600 }}>2000145.23 Algo</Button>
                )}
                <Button
                  height={40}
                  appearance="primary"
                  intent="danger"
                  style={{ fontWeight: 600 }}
                  marginX={5}
                  onClick={() => connector.killSession().catch((err) => console.error(err.message))}
                >
                  Disconnect
                </Button>
                <Button height={40} intent="none" style={{ fontWeight: 600 }}>
                  {ellipseAddress("154555155XAASD44.FYTFGYGYHB4545")}
                </Button>
              </Pane>
            </div>
          </div>
        )}
        {isLoading ? <LoadingIcon /> : <AccountAssets assets={ownAssets} />}
      </div>
    </div>
  );
};

export default SiteBody;
