import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Homepage = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedInUser = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedInUser.$id,
  });

  if (!accounts) return;

  const { data: accountsData, totalBanks, totalCurrentBalance } = accounts;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const { transactions } = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedInUser?.firstName || "Guest"}
            subtext="Access and manage your account efficiently"
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={totalBanks}
            totalCurrentBalance={totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          transactions={transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar
        user={loggedInUser}
        transactions={transactions}
        banks={accountsData.slice(0, 2)}
      />
    </section>
  );
};

export default Homepage;
