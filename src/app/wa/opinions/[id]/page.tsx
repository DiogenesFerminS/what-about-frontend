import { OpinionsService } from '@/services/opinions.service';
import React from 'react'

interface Props {
  params: Promise<{id: string}>
}

const OpinionPage = async ({ params }: Props) => {
  const {id} = await params;
  const opinion = await OpinionsService.findOneById(id);
  console.log(opinion);
  return (
    <div className='w-full h-full'>

    </div>
  )
}

export default OpinionPage;