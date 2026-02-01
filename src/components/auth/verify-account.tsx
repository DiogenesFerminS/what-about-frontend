"use client"
import { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '../ui/alert';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import Link from 'next/link';
import { verifyAccountAction } from '@/actions/auth/verifyAccountAction';

interface Props {
  token : string | string[] | undefined;
}

const AccountValidator = ({token}: Props) => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(false);

  useEffect(() => {
    const getVerify = async () => {

      if(!token || typeof token !== 'string') {
        setError(true);
        setMessage('Invalid or non-existent token');
        return;
      };

      try {
        const { success, error } = await verifyAccountAction(token);

        if (!success){
          setError(true);
          setMessage(error || 'Verification failed');
          return
        };

        setError(false);
        setIsVerify(true)
        setMessage('Account successfully verified');
      } catch{
        setError(true);
        setMessage('Connection failed')
      }
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
                isVerify
                ? <Link 
                    href={'/auth/login'}
                    className='hover:underline' 
                  >Congratulations, your account has been verified. Log in here.</Link>
                : <></>
            }
        </div>
    </div>
  )
}

export default AccountValidator