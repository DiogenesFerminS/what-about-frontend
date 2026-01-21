import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Opinion } from '@/interfaces/opinions/opinionData.interface'
import { Pencil, Settings, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  opinion: Opinion
  isMyOpinion: boolean
  setDeleteModal: Dispatch<SetStateAction<boolean>>,
  deleteModal: boolean,
  onDeleteOpinion: (id: string) => void,
}

const CustomHeader = ({ opinion, isMyOpinion, onDeleteOpinion }: Props) => {
  const { avatarUrl, username, id, name } = opinion.user;

  const router = useRouter();


  return (
    <>
      {/* <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} handleDeleteOpinion={handleDeleteOpinion} /> */}
      <div className="flex justify-between items-start w-full select-none">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>
              {username.split("")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span
              className="font-semibold text-lg hover:underline capitalize"
              onClick={() => { router.push(`/wa/profile/${id}`) }
              }
            >
              {username}
            </span>
            <span className="text-sm text-gray-500">{name ?? "--"}</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {opinion.isEdited ? (
            <span className="text-sm text-orange-400 uppercase">
              Edited
            </span>
          ) : (
            <></>
          )}
          {isMyOpinion ? (
            <div className="hover:bg-gray-300/10 rounded-full">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="p-1">
                  <Settings />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="m-2">
                  <DropdownMenuItem
                    onClick={() => onDeleteOpinion(opinion.id)}
                  >
                    <div
                      className="flex items-center"
                    >
                      <Trash className="text-red-500" />
                      <div className="ml-2">
                        <span>Delete</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/wa/opinions/update/${opinion.id}`)
                    }}
                  >
                    <div className="flex items-center">
                      <Pencil />
                      <div className="ml-2">
                        <span>Edit</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default CustomHeader