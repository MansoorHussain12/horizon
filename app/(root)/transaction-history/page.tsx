import HeaderBox from "@/components/HeaderBox";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const TransactionHistoryPage = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedInUser = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedInUser.$id,
  });

  if (!accounts) return;

  const { data: accountsData, totalBanks, totalCurrentBalance } = accounts;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const { transactions, data: accountInfo } = await getAccount({
    appwriteItemId,
  });
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions"
        />
        <div className="space-y-6">
          <div className="transactions-account">
            <div className="flex flex-col gap-2">
              <h2 className="text-18 font-bold text-white">
                {accountInfo.name}
              </h2>
              <p>{accountInfo.officialName}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionHistoryPage;
