import { HistoryRecord } from "@/interfaces/history/history.interface";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  list: HistoryRecord[];
  setHistory: (value: HistoryRecord[]) => void;
  setTerm: Dispatch<SetStateAction<string>>;
  setFocus: Dispatch<SetStateAction<boolean>>;
}

const HistoryList = ({ list, setHistory, setTerm, setFocus }: Props) => {
  const router = useRouter();

  const lastFiveHistory = list.sort((a, b) => b.id - a.id).slice(0, 5);

  const handleDeleteRecord = (id: number) => {
    const newList = list.filter((prev) => prev.id !== id);
    setHistory(newList);
  };

  return (
    <div className="relative">
      {lastFiveHistory.length > 0 ? (
        <>
          <div className="w-full flex justify-end py-1">
            <span
              className="text-sm text-violet-500 hover:underline"
              onClick={() => {
                setHistory([]);
              }}
            >
              Clear history
            </span>
          </div>
          {lastFiveHistory.map((item) => (
            <div
              key={item.id}
              className="p-2 hover:bg-primary/10 rounded-lg flex"
            >
              <div
                onClick={() => {
                  router.replace(`/wa/explore?term=${item.term}`);
                  setTerm(item.term);
                  setFocus(false);
                }}
                className="flex-1"
              >
                <span>{item.term}</span>
              </div>
              <div
                className="w-10 flex justify-center items-center"
                onClick={() => handleDeleteRecord(item.id)}
              >
                <X className="size-5 text-violet-500" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-3">
           <span className="text-sm text-gray-300">It seems you haven&apos;t searched for anything, try searching for something :(</span> 
        </div>
      )}
    </div>
  );
};

export default HistoryList;
