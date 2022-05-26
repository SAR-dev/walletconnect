import React, { useContext } from "react";
import { Button, Dialog } from "evergreen-ui";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import SiteHeader from "./components/SiteHeader";
import { setIsModalOpen } from "./features/applicationSlice";
import SiteBody from "./components/SiteBody";
import algowallet from "./assets/algorandwallet.svg";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ConnectContext } from "./store/connector";

const Wallet: React.FC = () => {
  const { isModalOpen } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();
  const connector = useContext(ConnectContext);

  const connect = async () => {
    if (connector.connected) return;
    if (connector.pending) return QRCodeModal.open(connector.uri, null);
    await connector.createSession();
  };

  return (
    <div>
      <div className="site-layout">
        <SiteHeader />
        <SiteBody />
        <Dialog
          isShown={isModalOpen}
          title="Connect to a wallet"
          hasFooter={false}
          onCloseComplete={() => dispatch(setIsModalOpen(false))}
        >
          <Button className="wallet-button" onClick={connect}>
            <img className="wallet-icon" src={algowallet} alt="Algorand wallet" />
            <span>Algorand Wallet</span>
          </Button>
        </Dialog>
      </div>
    </div>
  );
};

export default Wallet;
