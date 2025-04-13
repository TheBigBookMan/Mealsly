import { useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface InputMessageInterface {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const InputMessage = ({ setMessages }: InputMessageInterface) => {
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderType: "EATER",
            content: input,
            createdAt: new Date().toISOString(),
            seen: false,
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
    };

    return (
        <div className="px-3 py-1 flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Type a message..."
            />

            <button
                onClick={sendMessage}
                className="bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700"
            >
                <ArrowUpIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default InputMessage;