"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useDebounce } from "@/hooks/search/useDebounce";
import { getUsersByTermAction } from "@/actions/users/getUsersByTerm";
import { toast } from "sonner";
import { User } from "@/interfaces/common/user-interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { FieldSeparator } from "../ui/field";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/local-storage/useLocalStorage";
import { HistoryRecord } from "@/interfaces/history/history.interface";
import HistoryList from "./historyList";

const SearchBar = () => {
  const [term, setTerm] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [usersResponse, setUsersResponse] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searchTerm = useDebounce<string>(term, 1000);

  const [history, setHistory] = useLocalStorage<HistoryRecord[]>('wa-history', []);

  const handleChange = (term: string) => {
    setLoading(true);
    setTerm(term);
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      if (searchTerm === "" || !searchTerm) {
        setUsersResponse([]);
        setLoading(false);
        return;
      }

      const { data, success, error } = await getUsersByTermAction(searchTerm);
      if (!success && error) {
        toast.error(error, {
          duration: 3000,
          position: "top-right",
        });
        return;
      }

      if (!data) return;

      setUsersResponse(data);
      setLoading(false);
    };

    getUsers();
  }, [searchTerm]);

  useEffect(() => {
    const element = containerRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (!element) {
        return;
      }

      if (!element.contains(event.target as Node)) {
        setFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newHistory = {id: history.length + 1, term};
    setHistory([...history, newHistory]);
    router.replace(`/wa/explore?term=${term}`);
  };


  return (
    <div className="w-full py-2">
      <div
        className="flex justify-center gap-2 items-center"
        ref={containerRef}
      >
        {focus && (
          <Button
            variant={"outline"}
            onClick={() => {
              setFocus(false);
              setTerm("");
            }}
          >
            <X />
          </Button>
        )}
        <form className="max-w-115 w-full relative" onSubmit={onSubmit}>
          <Input
            className="w-full py-5 rounded-lg "
            placeholder="Search"
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setFocus(true)}
            value={term}
          />

          {focus && (
            <div className="absolute bg-stone-950 w-full z-30 py-2 px-3 rounded-lg max-h-90 mt-2 overflow-y-scroll">
              {term.trim() !== "" ? (
                <>
                  {loading ? (
                    <div className="w-full min-h-16 flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 py-2">
                      <FieldSeparator>Search</FieldSeparator>
                      <div className="py-1">
                        <div 
                          className="hover:bg-primary/10 rounded-lg p-2 flex gap-2"
                          onClick={() => {
                            router.replace(`/wa/explore?term=${term}`);
                            setFocus(false);
                          }}
                        >
                          <span>Search opinions with {`"${searchTerm}"`}</span>
                        </div>
                      </div>

                      <FieldSeparator>Users</FieldSeparator>

                      <div>
                        {usersResponse.length > 0 ? (
                          <div>
                            <span className="text-sm text-gray-300 block mb-3">
                              Users with {searchTerm}:{" "}
                            </span>

                            {usersResponse.map((user) => (
                              <div
                                key={user.id}
                                className="flex py-2 gap-4 hover:bg-primary/10 rounded-lg"
                                onClick={() => {
                                  router.push(`/wa/profile/${user.id}`);
                                }}
                              >
                                <div>
                                  <Avatar>
                                    <AvatarImage
                                      src={user.avatarUrl ?? ""}
                                      alt={user.username}
                                    />
                                    <AvatarFallback>{user.username.split("")[0].toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold">
                                    {user.username}
                                  </span>

                                  <span className="text-sm">{user.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="hover:bg-primary/10 rounded-lg p-2 flex gap-2">
                            <span>
                              {" "}
                              Users not found with {`"${searchTerm}" `}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-3 py-2">
                  <FieldSeparator>History</FieldSeparator>
                  <HistoryList list={history} setTerm={setTerm} setHistory={setHistory} setFocus={setFocus}/>
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      <div className="bg-gray-600 h-px mt-4"></div>
      <div className="w-full mb-4 flex">
        <div 
          className="p-3 flex border-b-2 hover:border-b-violet-600 transition-all"
          onClick={() => {router.push('/wa/explore')}}
        >
          <Link href={"/wa/explore"}>Explore</Link>
        </div>
      </div>
      {/* <div className="bg-gray-600 h-px"></div> */}
    </div>
  );
};

export default SearchBar;
