import React from 'react'

export interface chatBubbleProps {
    isSender: boolean;
    messages: string | number
}

export const ChatBubble: React.FC<chatBubbleProps> = ({ isSender, messages }) => {
    return (
        <div className="flex-grow p-4 overflow-y-auto h-[78%] bg-gray-100">
            <div
                className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}
            >
                <div
                    className={`p-3 rounded-lg shadow-md max-w-xs ${isSender ? ' text-black bg-white' : ' text-black bg-white'
                        }`}
                >
                    <p className="text-sm">{messages}</p>
                </div>
            </div>


        </div>
    )
}

