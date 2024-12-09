import { type Metadata } from "next";
import Header from "@/components/header";
import AdminTitle from "@/components/header/admin-title";
import Breadcrumbs from "@/components/header/breadcrumb";
import OptimisticProvider from "@/providers/optimistic";
import ItemModal from "./components/modal";
import ItemDataTable from "./components/list";
import { getTransactionList } from "@/actions/transaction";
import { ClientColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function Page() {
  const transactions = await getTransactionList();
  let dataColumn: ClientColumn[] = [];

  if (transactions?.length) {
    dataColumn = transactions.map((item) => ({
      id: item.id,
      description: item.description,
      date: format(item.date, "PPP", { locale: id }),
      amount: formatter.format(item.amount),
      isPaid: item.isPaid ?? false,
      type: item.type,
    }));
  }

  return (
    <OptimisticProvider initialItems={dataColumn ?? []}>
      <div className="flex min-h-screen w-full flex-col">
        <Header>
          <Breadcrumbs title="Products" currentPath="Transactions" />
          <AdminTitle
            title="Transactions"
            description="Manage your transactions"
            dialog={<ItemModal />}
          />
        </Header>
        <ItemDataTable />
      </div>
    </OptimisticProvider>
  );
}
