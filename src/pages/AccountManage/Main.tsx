import BasicTableWidget from "../../components/Table/Table";
import { getColumns as getOrderColumns } from "../../components/Table/Column";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { REQUEST_TYPE } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GlobalModal from "../../components/ui/Modal";

const Main = () => {
  const listUser = useSelector((state: RootState) => state.user.listUser);

  const dataTest = listUser && listUser.length > 0 && listUser.map((item) => item._source);

  const { isLoading, sendRequest } = useFetch();

  useEffect(() => {
    if (isLoading) return;
    sendRequest({ type: REQUEST_TYPE.USER });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 3xl:gap-8 shadow-2xl">
        {dataTest ? (
          <BasicTableWidget
            variant="classic"
            title="Classic Table"
            className="opacity-90 shadow-2xl"
            data={dataTest}
            enableSearch
            enablePagination
            getColumns={getOrderColumns}
          />
        ) : (
          <div>Loading ...</div>
        )}
      </div>
      <GlobalModal />
    </>
  );
};

export default Main;
