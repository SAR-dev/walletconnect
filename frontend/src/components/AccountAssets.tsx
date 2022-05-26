import { IAssetData } from "../helpers/types";
import { Table } from "evergreen-ui";
import Icon from "./Icon";
import ASAIcon from "./ASAIcon";
import algo from "../assets/algo.svg";
import { formatBigNumWithDecimals } from "../helpers/utilities";

const AccountAssets = ({ assets }: { assets: IAssetData[] }) => {
  const nativeCurrency = assets.find((asset) => asset.id === 0)!;
  const tokens = assets.filter((asset) => asset.id !== 0);
  return (
    <div className="mt-2">
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Account</Table.TextHeaderCell>
          <Table.TextHeaderCell  textAlign="right">Balance</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {[nativeCurrency, ...tokens].map((item, i) => (
            <Table.Row
              key={i}
            >
              <Table.TextCell>
                <div className="asset-wrapper">
                  {item.id === 0 ? <Icon src={algo} /> : <ASAIcon assetID={item.id} />}
                  {item.name}
                </div>
              </Table.TextCell>
              <Table.TextCell lineHeight={25}>
                <div className="asset-wrapper text-right h-25">
                  {`${formatBigNumWithDecimals(item.amount as bigint, item.decimals)} ${item.unitName || "units"
                    }`}
                </div>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AccountAssets;
