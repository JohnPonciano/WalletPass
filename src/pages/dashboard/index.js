
import PasswordList from "@/components/PasswordList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import Router from "next/router";
import '../../app/globals.css'
export default function Dashboard() {
  useEffect(() => {
    // Verifique se userId e masterKey estão ausentes no localStorage
    const userId = localStorage.getItem("userId");
    const masterKey = localStorage.getItem("masterkey");

    if (!userId || !masterKey) {
      // Redirecione para a página inicial ("/") se userId ou masterKey estiverem ausentes
      Router.push("/");
    }
  }, []);
  
  return (
    <div>
      <PasswordList/>
    </div>
  );
}
