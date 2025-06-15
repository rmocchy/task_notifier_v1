import React, { useState } from "react";
import { useApi } from "../providers/api_provider";
import { useQuery } from "@tanstack/react-query";


const Home: React.FC = () => {
  const healthApi = useApi().healthApi;
  const [serverStatus, setServerStatus] = useState<string>("");

  const {isLoading, refetch} = useQuery({
    queryKey: ["healthCheck"],
    queryFn: async () => {
      const res = await healthApi.healthCheck();
      setServerStatus(res.data.status);
    },
  });

  return (
    <div>
      <p>サインインしてください</p>
      <button
        onClick={() => {
          window.location.href = "/auth/start";
        }}
        style={{
          padding: "10px 15px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Googleでサインイン
      </button>
      <>
        サーバー状態:
        {isLoading ? "読み込み中..." : serverStatus}
        <button
          onClick={()=>refetch()}
          style={{
            padding: "5px 10px",
            backgroundColor: "#34A853",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
          >
          サーバー状態を確認
          </button>
      </>

    </div>
  );
};

export default Home;
