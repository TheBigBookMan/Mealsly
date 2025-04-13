import { Link } from 'react-router-dom';
import Me from '../assets/Me.jpg';

const TESTMESSAGE = [
    {
        id: '12334',
        name: 'Sarah',
        date: 'Wednesday',
        message: 'Hey ben it was really good to see you ther eother dayt, i hope you are doing well'
    },
    {
        id: '132',
        name: 'Sarah',
        date: 'Wednesday',
        message: 'Hey ben it was really good to see you ther eother dayt, i hope you are doing well'
    },
    {
        id: '5454',
        name: 'Sarah',
        date: 'Wednesday',
        message: 'Hey ben it was really good to see you ther eother dayt, i hope you are doing well'
    },
]

const MessagesPage = () => {
    return (
        <div className='flex flex-col h-full w-full p-4'>
            <p className='font-bold text-2xl'>Messages</p>

            <ul className='flex flex-col gap-4 w-full h-full overflow-y-auto'>
                {TESTMESSAGE.map(message => (
                    <Link to={`/messages/${message.id}`} className="flex  p-2 py-4 min-h-[80px] gap-2 text-sm items-center hover:bg-slate-200 rounded-xl transition border border-white">
                        <img src={Me} className="w-16 h-16 rounded-full object-cover" />
                    
                        <div className="flex flex-col w-full min-w-0">
                            <div className="flex justify-between">
                                <p className="font-medium">{message.name}</p>
                                <p className="text-xs text-slate-400">{message.date}</p>
                            </div>
                    
                            <p className="truncate overflow-hidden whitespace-nowrap text-slate-600">
                                {message.message}
                            </p>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default MessagesPage;