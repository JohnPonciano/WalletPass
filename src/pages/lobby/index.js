import PasswordForm from '@/components/PasswordForm';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Lobby() {
  const handleCreate = (data) => {
    // Trate a senha gerada, por exemplo, exibindo-a ou fazendo algo com ela
    console.log("Senha gerada:", data);
  };
  return (
   <div>
    <h1 className='text-center'>Add new password!</h1>
    <PasswordForm onCreate={handleCreate} />
   </div>
  )
}
