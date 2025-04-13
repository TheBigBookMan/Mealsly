import { useState } from 'react';
import Me from '../../../assets/Me.jpg';

interface MessageListInterface {
    messages: Message[];
    bottomRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList = ({messages, bottomRef}: MessageListInterface) => {
    return (
        <div className="flex flex-col gap-3 p-2 flex-1">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderType === "EATER" ? "justify-end" : "justify-start"}`}>
                    <div
                        className={`max-w-[70%] px-3 py-2 rounded-xl text-sm shadow ${
                        msg.senderType === "EATER"
                            ? "bg-sky-600 text-white rounded-br-none"
                            : "bg-slate-100 text-slate-800 rounded-bl-none"
                        }`}
                    >
                        <p>{msg.content}</p>

                        <div className="text-[10px] text-right text-slate-400 mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            {msg.senderType === "EATER" && msg.seen && " ✓"}
                        </div>
                    </div>
                </div>
            ))}

            <div ref={bottomRef} />
        </div>
    )
}

export default MessageList