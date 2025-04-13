import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import ME from '../assets/Me.jpg';
import MessageList from "../components/features/MessagePage/MessageList";
import InputMessage from "../components/features/MessagePage/InputMessage";

const MessagePage = () => {
    const navigate = useNavigate();

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            senderType: "CHEF",
            content: "Hey! Food is ready.",
            createdAt: new Date().toISOString(),
            seen: true,
        }
    ]);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="relative h-screen w-full flex flex-col pb-[60px]">
            <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b flex justify-between items-center h-[80px]">
                <button
                    onClick={() => navigate("/messages")}
                    className="flex items-center gap-1 text-sky-700 hover:underline"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center">
                    <img src={ME} className="w-8 rounded-full" />
                    <p className="text-sm">Ben Smerd</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4">
                <MessageList messages={messages} bottomRef={bottomRef} />
            </div>

            <div className="sticky bottom-0 z-10 bg-white px-4 py-1 border-t">
                <InputMessage setMessages={setMessages} />
            </div>
        </div>
    );
};

export default MessagePage;