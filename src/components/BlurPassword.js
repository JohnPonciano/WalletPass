import { useState } from 'react';

function PasswordField({ initialPassword }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const password = isPasswordVisible ? initialPassword : '••••••••';

  const handlePasswordClick = () => {
    if (!isPasswordVisible) {
      navigator.clipboard.writeText(initialPassword);
      alert('Senha copiada: ' + initialPassword);
    }
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <td onClick={handlePasswordClick} style={{ cursor: 'pointer' }}>
      {password}
    </td>
  );
}

export default PasswordField;
