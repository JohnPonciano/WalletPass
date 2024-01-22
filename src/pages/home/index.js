import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../app/globals.css'

export default function HomePage() {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 ">
            <div className="text-center">
                <h1>Wallet Pass - Alpha</h1>
                <p>Não tão seguro ainda, mas estamos trabalhando pra isso.</p>
                <div>
                    <Link href="/login" className="btn btn-primary m-2">
                        Login
                    </Link>
                    <Link href="/register" className="btn btn-secondary m-2">
                        Cadastro
                    </Link>
                </div>
            </div>
        </div>
    );
}
