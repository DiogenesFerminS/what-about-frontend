"use client"
import { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '../ui/alert';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  token : string | string[] | undefined;
}

const AccountValidator = ({token}: Props) => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(true);

  if(!token || typeof token !== 'string') {
    setError(true);
    setMessage('Invalid or non-existent token')
  }

  useEffect(() => {
    const getVerify = async () => {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-account/${token}`);
      const res = await resp.json();

      if (!res.ok){
        setError(true);
        setMessage(res.error);
        return
      };

      setError(false);
      setMessage('Account successfully verified');
    };

    getVerify();
  }, [token]);

  return (
    <div
      className='flex flex-col justify-center items-center gap-4'
    >
        <Alert variant={error ? 'destructive': 'default'}>
            {
                error  
                ? <AlertCircleIcon />
                : <CheckCircle2Icon  />
            }
            
            <AlertTitle className={error ? 'text-red-600' : 'text-green-600'}>{message}</AlertTitle>
        </Alert>
        <div>
            {
                error
                ? <></>
                : <Link 
                    href={'/auth/login'}
                    className='hover:underline' 
                >Congratulations, your account has been verified. Log in here.</Link>
            }
        </div>
    </div>
  )
}

export default AccountValidator