"use client"
import { FeedContext } from './feed-context'
import { Opinion } from '@/interfaces/opinions/opinionData.interface';
import { useFeed } from '@/hooks/feed/useFeed';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteOpinionAction } from '@/actions/opinions';
import { useAuthContext } from '../auth/auth-context';

interface Props {
  children: React.ReactNode;
  initialData: Opinion[];
  fetchMoreData: (page: number) => Promise<Opinion[]>;
}

const FeedProvider = ({children, fetchMoreData,initialData}: Props) => {
  const {error, hasMore, opinions,ref, setOpinions} = useFeed({initialData, fetchMoreData});

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<string>('');
  const [repostState, setRepostState] = useState<Record<string, boolean>>({});

  const { user } = useAuthContext();
  
    const onDeleteOpinion = (id: string) => {
    setCurrentDeleteId(id);
    setDeleteModal(true);
  }

  const handleDeleteOpinion = async () => {
    const resp = await deleteOpinionAction(currentDeleteId);
    const { success, error } = resp;
    if (!success && error) {
      toast.error(error, {
        position: 'top-right',
        duration: 3000,
      });
      return
    }

    setOpinions((prev) => prev.filter((op) => op.id !== currentDeleteId));
    toast.success('Opinion successfully removed', {
      position: 'top-right',
      duration: 3000,
    });
  }

  const onRepostStateChange = (id:string, state:boolean) => {

    setRepostState((prev) => (
        {
            ...prev,
            [id]: state
        }
    ));
  }

const deleteChilds = (fatherId: string) => {
    if (!user) return;

    setOpinions((prev) => prev.filter((op) => {
        const isTargetRepost = op.originalOpinion?.id === fatherId;
        const isMyPost = op.user.id === user.id;

        if (isTargetRepost && isMyPost) {
            return false; 
        }
        return true;
    }));
}

  return (
    <FeedContext.Provider value={{
        opinions, 
        error, 
        hasMore, 
        ref, 
        onDeleteOpinion, 
        handleDeleteOpinion, 
        deleteModal,
        setDeleteModal,
        onRepostStateChange,
        repostState,
        deleteChilds,
        }}>
        {children}
    </FeedContext.Provider>
  )
}

export default FeedProvider