import React, { useState } from 'react';
import { ChatBubble } from './ChatBubble';

export const ChatMessageSection = () => {
    const [isSender, setIsSender] = useState<boolean>(false)
    return (
        <div className="flex flex-col h-[580px]">
            <div className="p-3 w-full flex items-center h-[12%] border border-gray-200">
                <img
                    src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    className="h-12 w-12 rounded-full"
                    alt="Profile"
                />
                <div>
                    <p className="font-semibold ml-5">John Doe</p>
                    <p className="text-gray-500 text-sm ml-5">Hey, how are you?</p>
                </div>
            </div>

          
           <ChatBubble isSender={isSender} messages={'hai hello how are you'}/>

    
            <div className="flex items-center h-[10%] py-2 pr-2 pl-4 w-full bg-white border border-solid border-zinc-200">
                <input
                    type="text"
                    className="flex-grow text-base leading-relaxed text-slate-500 p-2 border border-gray-300 rounded-md"
                    placeholder="Type something..."
                />
                <div className="flex items-center ml-2 gap-4">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cf40379d5e771f7f73a5a7484db17f830984e396f14694301e83de5e7554072?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
                        className="object-contain w-6 aspect-square cursor-pointer"
                        alt="Emoji"
                    />
                    <div className="bg-teal-600 p-2.5 rounded-md cursor-pointer">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/feeedab8ab3cf0e6872f9e4e5cd9088265cf61ab8a53fdeb6ae255f145f0c562?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
                            className="object-contain w-5 aspect-square"
                            alt="Send"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
